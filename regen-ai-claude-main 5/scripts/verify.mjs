#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();

function requireFile(rel) {
  const p = path.join(repoRoot, rel);
  if (!fs.existsSync(p)) {
    console.error(`Missing required file: ${rel}`);
    process.exit(2);
  }
}

requireFile("README.md");
requireFile(".mcp.json.template");
requireFile("docs/MCP_SETUP_STANDARD.md");
requireFile("docs/MCP_ADAPTER_INTERFACE.md");
requireFile("docs/STUB_MODE.md");
requireFile("docs/SECURITY_PROMPTING.md");
requireFile("stubs/koi.sample.json");
requireFile("stubs/ledger.sample.json");
requireFile(".github/PULL_REQUEST_TEMPLATE.md");

console.log("regen-ai-claude verify: PASS");
