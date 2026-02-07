# Regen AI - Claude Code Plugin Marketplace

Zero-config access to the Regen Network ecosystem through three MCP server plugins.
## MCP Setup Standard

- See `docs/MCP_SETUP_STANDARD.md` (portable `~/.mcp.json` setup + verification)
## Additional docs
- MCP adapter interface: `docs/MCP_ADAPTER_INTERFACE.md`
- Stub mode (offline): `docs/STUB_MODE.md`
- Security prompting: `docs/SECURITY_PROMPTING.md`


## Plugins

| Plugin | Package | Description |
|--------|---------|-------------|
| **koi** | [regen-koi-mcp](https://www.npmjs.com/package/regen-koi-mcp) | Knowledge Organizational Infrastructure - Regen Commons - Knowledge Graphs - Embeddings |
| **ledger** | [regen-python-mcp](https://pypi.org/project/regen-python-mcp/) | Regen Ledger, Ecocredits, Sales, Governance, Portfolios, Regen Accounts |
| **registry-review** | [registry-review-mcp](https://pypi.org/project/registry-review-mcp/) | Regen Project Registration Assistance - Methodology Verification - Automation |

## Prerequisites

* **[Node.js 18+](https://nodejs.org/en) for koi** 
* **Python with [uv](https://github.com/astral-sh/uv) for ledger and registry-review:** 
```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

* **[Claude Code](https://code.claude.com/docs/en/setup):**
```bash
curl -fsSL https://claude.ai/install.sh | bash
```



## Quick Start

### 1. Open up Claude Code
```bash
claude
```

### 2. Add the Marketplace

```claude
/plugin marketplace add https://github.com/gaiaaiagent/regen-ai-claude
```

### 3. Install Plugins

```claude
/plugin install koi@regen-ai
/plugin install ledger@regen-ai
/plugin install registry-review@regen-ai
```

### 4. Restart and Verify

Restart Claude Code, then:
```claude
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
