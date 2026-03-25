# Regen Compute Plugin

Estimate the ecological footprint of your AI sessions and retire verified ecocredits on-chain via Regen Network.

## Features

- Estimate AI session carbon footprint
- Browse available carbon and biodiversity credits
- Retire credits on-chain via credit card (no wallet needed)
- Verify retirement certificates
- Cross-chain payment via ecoBridge (USDC, ETH, etc.)
- Track cumulative ecological impact

## Prerequisites

- Node.js 18+

## Installation

Add to your `.mcp.json`:

```json
{
  "regen-compute": {
    "command": "npx",
    "args": ["-y", "regen-compute@latest"],
    "description": "Regen Compute MCP Server - Ecological footprint estimation and credit retirement"
  }
}
```

No setup required - the MCP server runs directly from npm via `npx`.

## Package

[npmjs.com/package/regen-compute](https://www.npmjs.com/package/regen-compute)

## Source

[github.com/regen-network/regen-compute](https://github.com/regen-network/regen-compute)
