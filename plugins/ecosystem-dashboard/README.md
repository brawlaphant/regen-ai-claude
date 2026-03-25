# Regen Ecosystem Dashboard Plugin

Live impact metrics and ecological data from Regen Network's on-chain ecocredit system.

## Features

- Ecosystem summary with headline impact numbers
- Credit class listing with types and project counts
- Project count by country/jurisdiction
- Formatted impact metrics for display and reporting

## Prerequisites

- Node.js 18+

## Installation

Add to your `.mcp.json`:

```json
{
  "ecosystem-dashboard": {
    "command": "npx",
    "args": ["-y", "regen-ecosystem-dashboard-mcp@latest"],
    "env": {
      "REGEN_LCD_URL": "https://lcd-regen.keplr.app"
    },
    "description": "Regen Ecosystem Dashboard MCP Server - Live impact metrics from Regen Network"
  }
}
```

Or via CLI:

```bash
claude mcp add --transport stdio --scope user \
  --env REGEN_LCD_URL=https://lcd-regen.keplr.app \
  ecosystem-dashboard -- npx -y regen-ecosystem-dashboard-mcp@latest
```

No setup required - the MCP server runs directly from npm via `npx`.

## Tools

| Tool | Description |
|------|-------------|
| `get_ecosystem_summary` | Total projects, credit classes, jurisdictions, and credit supply |
| `get_credit_classes` | All credit classes with type, admin, and project count |
| `get_project_count_by_jurisdiction` | Project breakdown by country/region |
| `get_impact_metrics` | Headline numbers formatted for display |

## Data Source

All data is queried live from the Regen Ledger via the Cosmos LCD REST API.

## Package

> **Note:** This package needs to be published to npm as `regen-ecosystem-dashboard-mcp` before it can be installed via `npx`.

## Source

[github.com/regen-network/regen-ai-claude/tree/main/plugins/ecosystem-dashboard](https://github.com/regen-network/regen-ai-claude/tree/main/plugins/ecosystem-dashboard)
