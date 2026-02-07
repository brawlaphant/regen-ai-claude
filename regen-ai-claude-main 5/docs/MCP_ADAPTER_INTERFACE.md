# MCP Adapter Interface (normalized outputs)

This document defines **normalized response shapes** for consuming MCP tool outputs in a deterministic way
(e.g., inside Heartbeat agents).

## Why normalize?
Raw MCP tool outputs vary by server and may evolve over time. A normalizer provides a stable interface for:
- extracting timestamps for latency metrics
- extracting subject IDs/types for mechanism logic (e.g., m010)
- extracting canonical links for citation

## Normalized item shape (v0)
A normalizer should produce an array of items with this minimal shape:

```json
{
  "source": "koi",
  "kind": "forum_post",
  "id": "string",
  "timestamp": "2026-02-04T12:00:00Z",
  "title": "string",
  "url": "string",
  "subjects": [
    {"subject_type": "Project", "subject_id": "P-regen-042"}
  ],
  "evidence": {
    "koi_links": ["koi://..."],
    "ledger_refs": ["ledger://..."],
    "web_links": []
  },
  "raw": {}
}
```

### Required fields
- `source`: `"koi" | "ledger" | "web"`
- `kind`: a stable string describing the record type
- `id`: stable identifier from the source
- `timestamp`: ISO-8601 datetime (used for latency metrics)
- `url`: canonical human-link (used for citations)

### Optional fields
- `subjects[]`: zero or more subject hints for mechanism logic
- `evidence`: link buckets used for evidence coverage metrics
- `raw`: original server payload (for debugging)

## Timestamp guidance
Prefer the *event time* over the retrieval time:
- Forum post created time
- Commit authored time
- Governance proposal submit time / voting start time

## Subject extraction
Subject hints may be extracted via:
- structured IDs in payloads
- regex patterns (e.g., `C01-001`, `P-regen-042`)
- entity linking in KOI (when available)

This spec is intentionally minimal and offline-friendly.
