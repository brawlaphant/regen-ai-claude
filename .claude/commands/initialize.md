# Initialize Regen AI MCP Servers

Step-by-step guide to connect the Regen Network MCP servers to Claude Code.

## Prerequisites

- [Node.js 18+](https://nodejs.org/) — required for **koi** (npm)
- [Python with uv](https://github.com/astral-sh/uv) — required for **ledger** and **registry-review** (PyPI)
- [Claude Code](https://code.claude.com/docs/en/setup)

Install uv if needed:

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

## Step 1: Add MCP Servers

Choose **one** of the following methods.

### Method A: `claude mcp add` (recommended)

Run these commands in your terminal. Use `--scope user` for global access across all projects, or `--scope project` for current directory only.

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
```

No config files to edit. Servers download automatically on first use.

### Method B: Edit `.mcp.json` manually

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
    }
  }
}
```

If using project-scoped `.mcp.json`, also enable MCP servers in `.claude/settings.json`:

```json
{
  "enableAllProjectMcpServers": true
}
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

Then register local builds with Claude Code:

```bash
claude mcp add --transport stdio --scope user \
  --env KOI_API_ENDPOINT=https://regen.gaiaai.xyz/api/koi \
  --env JENA_ENDPOINT=https://regen.gaiaai.xyz/api/koi/fuseki/koi/sparql \
  regen-koi -- node ~/regen-mcps/mcps/regen-koi-mcp/dist/index.js

claude mcp add --transport stdio --scope user \
  --env REGEN_MCP_LOG_LEVEL=INFO \
  regen-network -- uv run --directory ~/regen-mcps/mcps/regen-python-mcp python main.py

claude mcp add --transport stdio --scope user \
  --env REGISTRY_REVIEW_LLM_EXTRACTION_ENABLED=true \
  registry-review -- uv run --directory ~/regen-mcps/mcps/regen-registry-review-mcp python -m registry_review_mcp.server
```

## Step 2: Verify

Start Claude Code and check that all servers are connected:

```bash
claude
> /mcp
```

You should see each server listed with a connected status.

## Step 3: Test Each Plugin

Try these queries to confirm each MCP is working:

### KOI (Knowledge Graph)

> "Search the knowledge graph for soil carbon projects"

### Ledger (Blockchain Data)

> "What credit classes exist on Regen Network?"

### Registry Review (Document Analysis)

> "What does a Regen methodology verification look like?"

## Optional Configuration

### Registry Review — LLM extraction

To enable AI-powered document extraction, add your Anthropic API key:

```bash
claude mcp add --transport stdio --scope user \
  --env REGISTRY_REVIEW_LLM_EXTRACTION_ENABLED=true \
  --env REGISTRY_REVIEW_ANTHROPIC_API_KEY=sk-ant-... \
  registry-review -- uvx registry-review-mcp
```

## Managing Servers

```bash
# List all configured MCP servers
claude mcp list

# Get details for a specific server
claude mcp get regen-koi

# Remove a server
claude mcp remove regen-koi
```

## Troubleshooting

- **Server not appearing in `/mcp`**: Restart Claude Code after adding servers.
- **npx/uvx not found**: Ensure Node.js 18+ and uv are installed and on your PATH.
- **KOI returns inaccurate on-chain data**: KOI queries the knowledge graph, not the ledger directly. Use the ledger MCP for real-time on-chain data.
- **Block explorer**: Use [mintscan.io/regen](https://www.mintscan.io/regen) for on-chain verification.
