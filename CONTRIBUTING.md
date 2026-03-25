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

Plugin metadata. Follow this format exactly:

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

**Rules:**
- `name` must match your directory name under `plugins/`
- `version` should be `1.0.0` for new plugins
- `license` should be `Apache-2.0` to match the repo
- Include `"regen"` and `"mcp"` in keywords

#### 2. `.mcp.json`

MCP server configuration that Claude Code uses to start the server:

**For npm packages:**

```json
{
  "mcpServers": {
    "your-server-name": {
      "command": "npx",
      "args": ["-y", "your-npm-package@latest"],
      "env": {
        "YOUR_ENV_VAR": "value"
      },
      "description": "Short description of the MCP server"
    }
  }
}
```

**For PyPI packages:**

```json
{
  "mcpServers": {
    "your-server-name": {
      "command": "uvx",
      "args": ["your-pypi-package"],
      "env": {
        "YOUR_ENV_VAR": "value"
      },
      "description": "Short description of the MCP server"
    }
  }
}
```

**Rules:**
- Use `npx -y package@latest` for npm, `uvx package` for PyPI
- Only include env vars that are genuinely needed
- The server name in `mcpServers` should be descriptive and kebab-case

#### 3. `README.md`

Plugin documentation. Include: a description, features list, prerequisites, installation instructions (with `claude mcp add` command), and links to the package and source repo. See any existing plugin README under `plugins/` for the format.

### Update the Marketplace Manifest

Add your plugin to `.claude-plugin/marketplace.json`:

```json
{
  "name": "your-plugin",
  "source": "./plugins/your-plugin/",
  "description": "Short description matching your plugin.json"
}
```

### Update the README

Add a row to the plugins table in the root `README.md`:

```markdown
| **your-plugin** | [your-package](package-url) | Short description |
```

## Testing Your Plugin Locally

Before submitting a PR, test that your MCP server actually connects and responds to queries.

### 1. Verify the package is published

Your MCP server package **must** be published on npm or PyPI:

```bash
# For npm packages
npm view your-package version

# For PyPI packages
curl -s "https://pypi.org/pypi/your-package/json" | python3 -c "import sys,json; print(json.load(sys.stdin)['info']['version'])"
```

If either command fails, your package isn't published yet. Fix that first.

### 2. Add the server with `claude mcp add`

Use `claude mcp add` to register your MCP server locally. This is the fastest way to test — no config files to edit.

**For npm packages:**

```bash
claude mcp add --transport stdio --scope user \
  --env YOUR_ENV_VAR=value \
  your-server-name -- npx -y your-npm-package@latest
```

**For PyPI packages:**

```bash
claude mcp add --transport stdio --scope user \
  --env YOUR_ENV_VAR=value \
  your-server-name -- uvx your-pypi-package
```

**Flags reference:**
- `--transport stdio` — required; tells Claude Code this is a stdio-based server
- `--scope user` — makes the server available in all projects (use `--scope project` for current project only)
- `--env KEY=VALUE` — pass environment variables (repeat for multiple vars)
- `--` — separates Claude's flags from the command that launches the server

### 3. Verify it connects

Start Claude Code and check:

```bash
claude
> /mcp
```

Your server should appear in the list with a connected status.

### 4. Test queries

Try a few queries that exercise your MCP's tools. Make sure the responses are accurate and the server doesn't crash.

### 5. Clean up

To remove the server after testing:

```bash
claude mcp remove your-server-name
```

### 6. Pre-submission checklist

- [ ] Package is published and accessible on npm or PyPI
- [ ] `claude mcp add` connects successfully
- [ ] Queries return correct results
- [ ] `plugins/your-plugin/.claude-plugin/plugin.json` is valid JSON
- [ ] `plugins/your-plugin/.mcp.json` is valid JSON
- [ ] `plugins/your-plugin/README.md` exists with features, installation, and links
- [ ] `.claude-plugin/marketplace.json` includes your plugin
- [ ] Root `README.md` plugins table includes your plugin

## Submitting a PR

1. Fork the repo and create a branch (e.g., `plugin/your-plugin-name` or `docs/your-change`)
2. Make your changes following the structure above
3. Push to your fork and open a PR against `regen-network/regen-ai-claude`

### PR Guidelines

- **One plugin per PR** — keep plugin additions focused
- **Documentation changes** can be bundled together
- **Title format:** `plugin: add your-plugin-name` for new plugins, `docs: description` for docs, `fix: description` for fixes
- **Description:** explain what the MCP does, link to the source repo, and note any required configuration

## Improving Existing Plugins

To update an existing plugin:

1. Make your changes in the plugin's directory
2. If the MCP server has a new version, test it with `claude mcp add`
3. Update the README if features changed
4. Bump the version in `plugin.json` if appropriate

## Reporting Issues

If an MCP server is broken, a plugin doesn't connect, or documentation is wrong:

1. Open an issue describing what you expected vs. what happened
2. Include which plugin, what query you tried, and any error output
3. Note your environment: OS, Node.js version, Python version, Claude Code version

## License

All contributions are licensed under Apache-2.0, matching the repo.
