# MCP Quickstart (KOI + Ledger)

1) Copy the template config:

```bash
cp .mcp.json.template .mcp.json
```

2) Fill in any required environment variables in `.mcp.json` (API keys / endpoints). Do **not** commit secrets.

3) Start Claude Code (or your MCP-compatible client) from this repo directory so it can load `.mcp.json`.

4) Verify MCP servers are live by listing tools/resources:
- KOI MCP (knowledge): search/summaries/stats.
- Ledger MCP (chain): governance/ecocredit/marketplace queries.

5) If tool listing fails:
- double-check the server command paths in `.mcp.json`
- confirm Node/Python versions and that dependencies are installed
- re-run the client and re-check tool listing

References:
- Claude Code MCP documentation
