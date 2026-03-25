# regen-ecosystem-dashboard-mcp

MCP server for live Regen Network ecosystem impact metrics — credit classes, projects, jurisdictions, and supply data queried directly from the Regen Ledger.

## Installation

```bash
npx -y regen-ecosystem-dashboard-mcp@latest
```

Or add to Claude Code:

```bash
claude mcp add --transport stdio --scope user \
  --env REGEN_LCD_URL=https://lcd-regen.keplr.app \
  ecosystem-dashboard -- npx -y regen-ecosystem-dashboard-mcp@latest
```

## Tools

### get_ecosystem_summary

Returns total credit classes, projects, batches, jurisdictions, and sampled credit supply from the Regen Ledger.

### get_credit_classes

Lists all ecocredit classes with type (Carbon, Biodiversity, etc.), admin address, metadata IRI, and project count.

### get_project_count_by_jurisdiction

Breakdown of projects by country and full jurisdiction code, sorted by count.

### get_impact_metrics

Headline numbers formatted for display: project count, credit classes, batches issued, countries, credit types. Includes links to registry, explorer, and marketplace.

## Configuration

| Environment Variable | Default | Description |
|---------------------|---------|-------------|
| `REGEN_LCD_URL` | `https://lcd-regen.keplr.app` | Cosmos LCD REST API endpoint for Regen Ledger |

## Data Source

All data is queried live from the Regen Ledger via the Cosmos LCD REST API. No caching — every call returns current on-chain state.

## License

Apache-2.0
