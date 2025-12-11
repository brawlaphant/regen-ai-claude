# Regen Ledger Plugin

Access Regen Network blockchain data through the Regen Ledger MCP server.

## Features

- Bank module queries (balances, supply, metadata)
- Distribution module (rewards, validators)
- Governance (proposals, votes, deposits)
- Ecocredits (classes, projects, batches)
- Baskets and marketplace tools
- Analytics and portfolio analysis

## Prerequisites

- uv (`curl -LsSf https://astral.sh/uv/install.sh | sh`)

## Installation

```bash
/plugin install ledger@regen-ai
# Restart Claude Code
/mcp
```

No setup required - the MCP server runs directly from PyPI via `uvx`.

## Package

[pypi.org/project/regen-python-mcp](https://pypi.org/project/regen-python-mcp/)

## Source

[github.com/gaiaaiagent/regen-python-mcp](https://github.com/gaiaaiagent/regen-python-mcp)
