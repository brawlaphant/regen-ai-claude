# Regen Compute Plugin

AI compute footprint estimation and verified ecocredit retirement on Regen Network.

## Features

- Estimate your AI session's ecological footprint (energy, CO2)
- Browse live carbon, biodiversity, and marine credits on Regen Marketplace
- Retire credits on-chain or via credit card link
- Retrieve verifiable on-chain retirement certificates
- View Regen Network aggregate impact statistics
- Cross-chain payment via ecoBridge (USDC, ETH on Base, Ethereum, Polygon, etc.)

## Prerequisites

- Node.js 20+

## Installation

```bash
/plugin install regen-compute@regen-ai
# Restart Claude Code
/mcp
```

No setup required - the MCP server runs directly from npm via `npx`.
Read-only tools work without any configuration.

## Configuration

For advanced features, set optional environment variables:

| Variable | What it enables |
|----------|----------------|
| `REGEN_WALLET_MNEMONIC` | Direct on-chain retirement |
| `ECOBRIDGE_EVM_MNEMONIC` | Cross-chain payment via ecoBridge |
| `ECOBRIDGE_ENABLED=false` | Disable ecoBridge tools |

## Package

[npmjs.com/package/regen-compute](https://www.npmjs.com/package/regen-compute)

## Source

[github.com/regen-network/regen-compute](https://github.com/regen-network/regen-compute)
