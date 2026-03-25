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

Choose **one** of the following methods.

### Method A: Edit `.mcp.json` directly (recommended)

Create `.mcp.json` in your project root for project-scoped access, or at `~/.claude/.mcp.json` for global access:

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

### Method B: Claude CLI one-liners

```bash
claude mcp add regen-koi npx -y regen-koi-mcp@latest
claude mcp add regen-network uvx regen-python-mcp
claude mcp add registry-review uvx registry-review-mcp
claude mcp add regen-compute npx -y regen-compute@latest
```

### Method C: Clone and build from source (for development)

Use this if you need to modify the MCP server source code:

```bash
mkdir -p ~/regen-mcps/mcps && cd ~/regen-mcps
git clone https://github.com/gaiaaiagent/regen-koi-mcp.git mcps/regen-koi-mcp
git clone https://github.com/gaiaaiagent/regen-python-mcp.git mcps/regen-python-mcp
git clone https://github.com/gaiaaiagent/regen-registry-review-mcp.git mcps/regen-registry-review-mcp

# Build Node.js servers
cd mcps/regen-koi-mcp && npm install && npm run build && cd ../..

# Setup Python servers
cd mcps/regen-registry-review-mcp && uv sync && cp .env.example .env && cd ../..
```

Then add them via `claude mcp add-json` pointing to your local builds (see [DISCUSSION.md](DISCUSSION.md) for full examples).

## Step 2: Enable Project MCP Servers

Create `.claude/settings.json` in your project:

```json
{
  "enableAllProjectMcpServers": true
}
```

## Step 3: Verify

Start Claude Code and check that all servers are connected:

```bash
claude
> /mcp
```

You should see each server listed with a green status.

You can also run the health check script to verify packages are available on their registries:

```bash
./scripts/verify.sh
```

## Step 4: Test Each Plugin

Try these queries to confirm each MCP is working:

### KOI (Knowledge Graph)

> "Search the knowledge graph for soil carbon projects"

### Ledger (Blockchain Data)

> "What credit classes exist on Regen Network?"

### Registry Review (Document Analysis)

> "What does a Regen methodology verification look like?"

### Regen Compute (Ecological Footprint)

> "Estimate the ecological footprint of this AI session"

## Optional Configuration

### Registry Review — LLM extraction

To enable AI-powered document extraction, set your Anthropic API key:

```json
{
  "registry-review": {
    "env": {
      "REGISTRY_REVIEW_LLM_EXTRACTION_ENABLED": "true",
      "REGISTRY_REVIEW_ANTHROPIC_API_KEY": "sk-ant-..."
    }
  }
}
```

## Troubleshooting

- **Server not appearing in `/mcp`**: Restart Claude Code after editing `.mcp.json`.
- **npx/uvx not found**: Ensure Node.js 18+ and uv are installed and on your PATH.
- **KOI returns inaccurate on-chain data**: KOI queries the knowledge graph, not the ledger directly. Use the ledger MCP for real-time on-chain data.
- **Block explorer**: Use [mintscan.io/regen](https://www.mintscan.io/regen) for on-chain verification.

## Related

- [Community discussion about MCP integration](DISCUSSION.md)
- [Main README](../../README.md)
