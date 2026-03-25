# Regen AI - Claude Code Plugin Marketplace

[![Validate Marketplace](https://github.com/gaiaaiagent/regen-ai-claude/actions/workflows/validate.yml/badge.svg)](https://github.com/gaiaaiagent/regen-ai-claude/actions/workflows/validate.yml)

Zero-config access to the Regen Network ecosystem through four MCP server plugins.

## Plugins

| Plugin | Package | Description |
|--------|---------|-------------|
| **koi** | [regen-koi-mcp](https://www.npmjs.com/package/regen-koi-mcp) | Knowledge Organizational Infrastructure - Regen Commons - Knowledge Graphs - Embeddings |
| **ledger** | [regen-python-mcp](https://pypi.org/project/regen-python-mcp/) | Regen Ledger, Ecocredits, Sales, Governance, Portfolios, Regen Accounts |
| **registry-review** | [registry-review-mcp](https://pypi.org/project/registry-review-mcp/) | Regen Project Registration Assistance - Methodology Verification - Automation |
| **regen-compute** | [regen-compute](https://www.npmjs.com/package/regen-compute) | Regenerative AI Compute - Ecological footprint estimation, credit browsing, on-chain retirement |

## Prerequisites

* **[Node.js 18+](https://nodejs.org/en) for koi and regen-compute**
* **Python with [uv](https://github.com/astral-sh/uv) for ledger and registry-review:**
```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

* **[Claude Code](https://code.claude.com/docs/en/setup):**
```bash
curl -fsSL https://claude.ai/install.sh | bash
```

## Quick Start

### Option A: `claude mcp add` (recommended)

Run these commands in your terminal to add all four MCP servers. Use `--scope user` to make them available across all projects, or `--scope project` to scope them to the current directory.

```bash
# KOI — knowledge graph and ecological data (npm)
claude mcp add --transport stdio --scope user \
  --env KOI_API_ENDPOINT=https://regen.gaiaai.xyz/api/koi \
  --env JENA_ENDPOINT=https://regen.gaiaai.xyz/api/koi/fuseki/koi/sparql \
  regen-koi -- npx -y regen-koi-mcp@latest

# Ledger — ecocredits, governance, blockchain data (PyPI)
claude mcp add --transport stdio --scope user \
  --env REGEN_MCP_LOG_LEVEL=INFO \
  regen-network -- uvx regen-python-mcp

# Registry Review — document analysis and compliance (PyPI)
claude mcp add --transport stdio --scope user \
  --env REGISTRY_REVIEW_LLM_EXTRACTION_ENABLED=true \
  registry-review -- uvx registry-review-mcp

# Regen Compute — ecological footprint and credit retirement (npm)
claude mcp add --transport stdio --scope user \
  regen-compute -- npx -y regen-compute@latest
```

Then start Claude Code and verify:

```bash
claude
> /mcp
```

All four servers should appear as connected. That's it — no config files to edit, no repos to clone.

### Option B: Edit `.mcp.json` manually

If you prefer to manage config files directly, create `.mcp.json` in your project root (project-scoped) or `~/.claude/.mcp.json` (global):

```json
{
  "mcpServers": {
    "regen-koi": {
      "command": "npx",
      "args": ["-y", "regen-koi-mcp@latest"],
      "env": {
        "KOI_API_ENDPOINT": "https://regen.gaiaai.xyz/api/koi",
        "JENA_ENDPOINT": "https://regen.gaiaai.xyz/api/koi/fuseki/koi/sparql"
      },
      "description": "Regen KOI MCP Server - Knowledge graph queries and ecological data"
    },
    "regen-network": {
      "command": "uvx",
      "args": ["regen-python-mcp"],
      "env": {
        "REGEN_MCP_LOG_LEVEL": "INFO"
      },
      "description": "Regen Python MCP Server - Ecocredit queries and blockchain data"
    },
    "registry-review": {
      "command": "uvx",
      "args": ["registry-review-mcp"],
      "env": {
        "REGISTRY_REVIEW_LLM_EXTRACTION_ENABLED": "true"
      },
      "description": "Registry Review MCP Server - Automated document review for carbon credit projects"
    },
    "regen-compute": {
      "command": "npx",
      "args": ["-y", "regen-compute@latest"],
      "description": "Regen Compute MCP Server - Ecological footprint estimation and credit retirement"
    }
  }
}
```

Then enable MCP servers in `.claude/settings.json`:

```json
{
  "enableAllProjectMcpServers": true
}
```

### Option C: Plugin marketplace (coming soon)

> **Note:** The `/plugin` commands below are not yet available in Claude Code.
> They describe the planned marketplace workflow for when plugin support ships.

```
/plugin marketplace add https://github.com/gaiaaiagent/regen-ai-claude
/plugin install koi@regen-ai
/plugin install ledger@regen-ai
/plugin install registry-review@regen-ai
/plugin install regen-compute@regen-ai
```

## Verify Installation

Run the health check script to confirm all packages are available on their registries:

```bash
./scripts/verify.sh
```

Or from Claude Code, run `/mcp` to see connected servers.

## Example Usage

Once installed, use natural language:

> "What credit classes exist on Regen Network?"

> "Query the knowledge graph for soil carbon projects"

> "Analyze my portfolio's ecological impact"

> "Review this project design document for compliance"

> "Estimate the ecological footprint of this AI session"

## Resources

- [Regen Network](https://www.regen.network/)
- [Regen Registry](https://registry.regen.network/)
- [Block Explorer](https://www.mintscan.io/regen)
- [Regen Ledger Docs](https://docs.regen.network/)

## License

Apache-2.0
