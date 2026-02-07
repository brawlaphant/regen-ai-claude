# Stub mode (offline)

Stub mode provides **deterministic, offline** sample payloads that resemble normalized MCP outputs.
This is useful for:
- demos without MCP connectivity
- PR review when tool access is unavailable
- testing parsers/normalizers

## Files
- `stubs/koi.sample.json`
- `stubs/ledger.sample.json`

## How to use
1) Treat stub files as if they were tool outputs.
2) Pass them through a normalizer (see `docs/MCP_ADAPTER_INTERFACE.md`).
3) Use the resulting items to compute KPIs (signals_emitted, latency, coverage).

These stubs are not authoritative chain or KOI data.
