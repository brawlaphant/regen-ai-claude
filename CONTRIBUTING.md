# Contributing to Regen AI Claude

This repo is a Claude Code plugin marketplace for the Regen Network ecosystem. Contributions welcome — whether you're adding a new MCP plugin, improving documentation, or fixing bugs.

## Adding a New Plugin

### Directory Structure

Every plugin lives in `plugins/<your-plugin-name>/` and needs exactly three files:

```
plugins/your-plugin/
├── .claude-plugin/
│   └── plugin.json      # Plugin metadata
├── .mcp.json             # MCP server configuration
└── README.md             # Plugin documentation
```

### Required Files

#### 1. `.claude-plugin/plugin.json`

```json
{
  "name": "your-plugin",
  "version": "1.0.0",
  "description": "One-line description of what the MCP does",
  "author": {
    "name": "Your Name or Org",
    "url": "https://github.com/your-org"
  },
  "homepage": "https://github.com/your-org/your-mcp-repo",
  "license": "Apache-2.0",
  "keywords": ["regen", "your-domain", "mcp"]
}
```

#### 2. `.mcp.json`

**npm:** `"command": "npx", "args": ["-y", "your-package@latest"]`
**PyPI:** `"command": "uvx", "args": ["your-package"]`

#### 3. `README.md`

Include: description, features, prerequisites, `claude mcp add` install command, and package/source links.

### Update Manifests

- Add to `.claude-plugin/marketplace.json`
- Add to the plugins table in root `README.md`

## Testing Your Plugin Locally

### 1. Verify the package is published

```bash
npm view your-package version          # npm
curl -s https://pypi.org/pypi/your-package/json | python3 -c "import sys,json; print(json.load(sys.stdin)['info']['version'])"  # PyPI
```

### 2. Add with `claude mcp add`

**npm:** `claude mcp add --transport stdio --scope user your-name -- npx -y your-package@latest`
**PyPI:** `claude mcp add --transport stdio --scope user your-name -- uvx your-package`

### 3. Verify and test

```bash
claude
> /mcp    # should show your server connected
```

### 4. Clean up

```bash
claude mcp remove your-server-name
```

### Pre-submission checklist

- [ ] Package published on npm or PyPI
- [ ] `claude mcp add` connects successfully
- [ ] Queries return correct results
- [ ] `plugin.json`, `.mcp.json`, `README.md` all present and valid
- [ ] `marketplace.json` and root `README.md` updated

## Submitting a PR

1. Fork the repo and create a branch
2. Make changes following the structure above
3. Push and open a PR against `gaiaaiagent/regen-ai-claude`

**Title format:** `plugin: add name` for plugins, `docs: description` for docs, `fix: description` for fixes.

## License

Apache-2.0
