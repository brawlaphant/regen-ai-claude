# Regen AI - Claude Code Plugin Marketplace

Zero-config access to the Regen Network ecosystem through four MCP server plugins.

## Plugins

| Plugin | Package | Description |
|--------|---------|-------------|
| **ledger** | [regen-ledger-mcp](https://www.npmjs.com/package/regen-ledger-mcp) | Blockchain data - credit classes, batches, balances |
| **koi** | [regen-koi-mcp](https://www.npmjs.com/package/regen-koi-mcp) | Knowledge graph - ecological data and SPARQL queries |
| **network** | [regen-python-mcp](https://pypi.org/project/regen-python-mcp/) | Python tools - governance, analytics, portfolio analysis |
| **registry** | [registry-review-mcp](https://pypi.org/project/registry-review-mcp/) | Document review - carbon credit project compliance |

## Prerequisites

**Node.js plugins (ledger, koi):** Node.js 18+

**Python plugins (network, registry):** uv
```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

## Quick Start

### 1. Add the Marketplace

```bash
/plugin marketplace add https://github.com/gaiaaiagent/regen-ai-claude
```

### 2. Install Plugins

```bash
/plugin install ledger@regen-ai
/plugin install koi@regen-ai
/plugin install network@regen-ai
/plugin install registry@regen-ai
```

### 3. Restart and Verify

Restart Claude Code, then:
```bash
/mcp
```

That's it. No setup commands, no builds - MCP servers download automatically on first use.

## Example Usage

Once installed, use natural language:

> "What credit classes exist on Regen Network?"

> "Query the knowledge graph for soil carbon projects"

> "Analyze my portfolio's ecological impact"

> "Review this project design document for compliance"

## Resources

- [Regen Network](https://www.regen.network/)
- [Regen Registry](https://registry.regen.network/)
- [Block Explorer](https://www.mintscan.io/regen)
- [Regen Ledger Docs](https://docs.regen.network/)

## License

Apache-2.0
