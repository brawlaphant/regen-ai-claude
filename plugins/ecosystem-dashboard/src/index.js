#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

const LCD_URL = process.env.REGEN_LCD_URL || "https://lcd-regen.keplr.app";

// --- Regen Ledger API helpers ---

async function fetchJSON(path) {
  const res = await fetch(`${LCD_URL}${path}`);
  if (!res.ok) throw new Error(`Regen API ${res.status}: ${path}`);
  return res.json();
}

async function fetchAllPages(path, key) {
  let items = [];
  let nextKey = null;
  do {
    const sep = path.includes("?") ? "&" : "?";
    const url = nextKey
      ? `${path}${sep}pagination.key=${encodeURIComponent(nextKey)}&pagination.limit=100`
      : `${path}${sep}pagination.limit=100`;
    const data = await fetchJSON(url);
    items = items.concat(data[key] || []);
    nextKey = data.pagination?.next_key || null;
  } while (nextKey);
  return items;
}

async function getClasses() {
  return fetchAllPages("/regen/ecocredit/v1/classes", "classes");
}

async function getProjects() {
  return fetchAllPages("/regen/ecocredit/v1/projects", "projects");
}

async function getBatches() {
  return fetchAllPages("/regen/ecocredit/v1/batches", "batches");
}

async function getBatchSupply(batchDenom) {
  const data = await fetchJSON(
    `/regen/ecocredit/v1/batches/${batchDenom}/supply`
  );
  return data;
}

// --- Credit type name mapping ---

const CREDIT_TYPE_NAMES = {
  C: "Carbon",
  BT: "Biodiversity (Terrasos)",
  KSH: "Kilo-Sheep-Hour",
  MBS: "Marine Biodiversity Stewardship",
  USS: "Umbrella Species Stewardship",
};

// --- Tool implementations ---

async function getEcosystemSummary() {
  const [classes, projects, batches] = await Promise.all([
    getClasses(),
    getProjects(),
    getBatches(),
  ]);

  const jurisdictions = new Set();
  for (const p of projects) {
    if (p.jurisdiction) {
      const country = p.jurisdiction.split("-")[0];
      jurisdictions.add(country);
    }
  }

  // Get supply for all batches (sample first 20 for speed)
  const supplyBatches = batches.slice(0, 20);
  const supplies = await Promise.all(
    supplyBatches.map((b) =>
      getBatchSupply(b.denom).catch(() => ({
        tradable_amount: "0",
        retired_amount: "0",
      }))
    )
  );

  let totalTradable = 0;
  let totalRetired = 0;
  for (const s of supplies) {
    totalTradable += parseFloat(s.tradable_amount || "0");
    totalRetired += parseFloat(s.retired_amount || "0");
  }

  return {
    credit_classes: classes.length,
    total_projects: projects.length,
    total_batches: batches.length,
    jurisdictions: jurisdictions.size,
    jurisdiction_list: Array.from(jurisdictions).sort(),
    credits_tradable_sampled: Math.round(totalTradable),
    credits_retired_sampled: Math.round(totalRetired),
    note: `Supply numbers are sampled from the first ${supplyBatches.length} of ${batches.length} batches for speed. Use get_credit_classes for full class details.`,
  };
}

async function getCreditClasses() {
  const [classes, projects] = await Promise.all([
    getClasses(),
    getProjects(),
  ]);

  // Count projects per class
  const projectCounts = {};
  for (const p of projects) {
    const classId = p.class_id || p.id?.split("-")?.[0];
    if (classId) {
      projectCounts[classId] = (projectCounts[classId] || 0) + 1;
    }
  }

  return classes.map((c) => ({
    id: c.id,
    credit_type: c.credit_type_abbrev,
    credit_type_name:
      CREDIT_TYPE_NAMES[c.credit_type_abbrev] || c.credit_type_abbrev,
    admin: c.admin,
    metadata: c.metadata || "",
    project_count: projectCounts[c.id] || 0,
  }));
}

async function getProjectCountByJurisdiction() {
  const projects = await getProjects();

  const byCountry = {};
  const bySubdivision = {};

  for (const p of projects) {
    const j = p.jurisdiction || "unknown";
    const parts = j.split("-");
    const country = parts[0];
    byCountry[country] = (byCountry[country] || 0) + 1;
    bySubdivision[j] = (bySubdivision[j] || 0) + 1;
  }

  // Sort by count descending
  const sortDesc = (obj) =>
    Object.entries(obj)
      .sort((a, b) => b[1] - a[1])
      .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});

  return {
    total_projects: projects.length,
    by_country: sortDesc(byCountry),
    by_jurisdiction: sortDesc(bySubdivision),
  };
}

async function getImpactMetrics() {
  const [classes, projects, batches] = await Promise.all([
    getClasses(),
    getProjects(),
    getBatches(),
  ]);

  const jurisdictions = new Set();
  for (const p of projects) {
    if (p.jurisdiction) {
      jurisdictions.add(p.jurisdiction.split("-")[0]);
    }
  }

  const creditTypes = new Set();
  for (const c of classes) {
    creditTypes.add(c.credit_type_abbrev);
  }

  return {
    headline: `Regen Network: ${projects.length} projects across ${jurisdictions.size} countries, ${classes.length} credit classes, ${batches.length} credit batches issued`,
    metrics: [
      { label: "Active Projects", value: projects.length },
      { label: "Credit Classes", value: classes.length },
      { label: "Credit Batches Issued", value: batches.length },
      { label: "Countries / Regions", value: jurisdictions.size },
      {
        label: "Credit Types",
        value: Array.from(creditTypes)
          .map((t) => CREDIT_TYPE_NAMES[t] || t)
          .join(", "),
      },
    ],
    links: {
      registry: "https://registry.regen.network",
      explorer: "https://www.mintscan.io/regen",
      marketplace:
        "https://app.regen.network/projects/1?buying_options_filters=credit_card",
    },
  };
}

// --- MCP Server setup ---

const server = new Server(
  { name: "regen-ecosystem-dashboard", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

const TOOLS = [
  {
    name: "get_ecosystem_summary",
    description:
      "Get a summary of the Regen Network ecosystem: total credit classes, projects, batches, jurisdictions, and sampled credit supply. Returns live on-chain data.",
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "get_credit_classes",
    description:
      "List all ecocredit classes on Regen Network with their type (Carbon, Biodiversity, etc.), admin address, metadata, and number of registered projects.",
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "get_project_count_by_jurisdiction",
    description:
      "Get a breakdown of Regen Network projects by country and jurisdiction. Returns counts sorted by most projects first.",
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "get_impact_metrics",
    description:
      "Get headline impact metrics from Regen Network formatted for display: project count, credit classes, batches issued, countries covered, and credit types. Includes links to the registry, explorer, and marketplace.",
    inputSchema: { type: "object", properties: {} },
  },
];

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: TOOLS,
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name } = request.params;
  try {
    let result;
    switch (name) {
      case "get_ecosystem_summary":
        result = await getEcosystemSummary();
        break;
      case "get_credit_classes":
        result = await getCreditClasses();
        break;
      case "get_project_count_by_jurisdiction":
        result = await getProjectCountByJurisdiction();
        break;
      case "get_impact_metrics":
        result = await getImpactMetrics();
        break;
      default:
        return {
          content: [{ type: "text", text: `Unknown tool: ${name}` }],
          isError: true,
        };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
    };
  } catch (error) {
    return {
      content: [
        { type: "text", text: `Error: ${error.message}` },
      ],
      isError: true,
    };
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
