# WG Packet — Units 4/5 (regen-ai-claude): MCP enablement for KOI + Ledger

## What shipped
- Added MCP configuration templates and a short quickstart so contributors can enable:
  - **KOI MCP** (knowledge search/graph/stats)
  - **Ledger MCP** (on-chain queries)
- This is the “tooling layer” used by Heartbeat `signal-agent` to move from placeholder zeros to real KPIs.

## Key files
- `.mcp.json.template` (copy to `.mcp.json`)
- `public/.mcp.json.template` (same, for portability)
- `docs/MCP_QUICKSTART.md` (copy template → set env vars → verify tools)

## How to verify MCP is working
- After configuring `.mcp.json`, confirm your MCP client lists KOI/Ledger tools (per the quickstart).

As-of: 2026-02-04
