# MCP Setup Standard (Regen AI)

This repo ships MCP server plugin configs (KOI + Ledger) to connect Regen AI tools into Claude Code and other MCP-compatible clients.

## 1) Install / configure MCP
Use a portable config file at:

- `~/.mcp.json`

If you have a template in this repo (recommended), copy it:

```bash
cp .mcp.json.template ~/.mcp.json
```

Then set any required environment variables referenced by the server entries (tokens/URLs).

## 2) Verify tools are visible
In Claude Code, open a project and verify MCP servers load and tools appear (e.g., KOI + Ledger).

See Claude Code MCP docs for the current verification flow and CLI helpers (e.g., `claude mcp ...`).
- https://code.claude.com/docs/en/mcp

## 3) Use with Regen Heartbeat
Once MCP is configured, `regen-heartbeat`'s `signal-agent` can report non-zero KPIs by checking KOI + Ledger tool availability and evidence.
