# Initialize Regen AI MCP Servers

Step-by-step guide to connect the Regen Network MCP servers to Claude Code.

## Prerequisites

- [Node.js 18+](https://nodejs.org/) — required for **koi** and **regen-compute**
- [Python with uv](https://github.com/astral-sh/uv) — required for **ledger** and **registry-review**
- [Claude Code](https://code.claude.com/docs/en/setup)

Install uv if needed:

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

## Step 1: Add MCP Servers

### Method A: `claude mcp add` (recommended)

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

### Method B: Edit `.mcp.json` manually

Create `.mcp.json` in your project root or `~/.claude/.mcp.json` for global access. See root README for the full JSON config.

### Method C: Clone and build from source

See [DISCUSSION.md](DISCUSSION.md) for full clone-and-build instructions.

## Step 2: Verify

```bash
claude
> /mcp
```

All servers should appear with a connected status.

## Step 3: Test Each Plugin

> "Search the knowledge graph for soil carbon projects" *(KOI)*

> "What credit classes exist on Regen Network?" *(Ledger)*

> "What does a Regen methodology verification look like?" *(Registry Review)*

> "Estimate the ecological footprint of this AI session" *(Regen Compute)*

## Managing Servers

```bash
claude mcp list                 # List all servers
claude mcp get regen-koi        # Get details
claude mcp remove regen-koi     # Remove a server
```

## Troubleshooting

- **Server not appearing**: Restart Claude Code after adding servers.
- **npx/uvx not found**: Ensure Node.js 18+ and uv are on your PATH.
- **KOI returns inaccurate on-chain data**: Use the ledger MCP for real-time on-chain data.
- **Block explorer**: [mintscan.io/regen](https://www.mintscan.io/regen)
