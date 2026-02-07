# Regen KOI Plugin

Access the Regen Knowledge Ontology Integration (KOI) system for ecological data and SPARQL queries.

## Features

- Query ecological and project metadata
- Explore methodology relationships
- SPARQL queries against Jena/Fuseki endpoint
- Semantic search across the knowledge base

## Prerequisites

- Node.js 18+

## Installation

```bash
/plugin install koi@regen-ai
# Restart Claude Code
/mcp
```

No setup required - the MCP server runs directly from npm via `npx`.

## Endpoints

| Endpoint | URL |
|----------|-----|
| KOI API | https://regen.gaiaai.xyz/api/koi |
| SPARQL | https://regen.gaiaai.xyz/api/koi/fuseki/koi/sparql |

## Package

[npmjs.com/package/regen-koi-mcp](https://www.npmjs.com/package/regen-koi-mcp)

## Source

[github.com/gaiaaiagent/regen-koi-mcp](https://github.com/gaiaaiagent/regen-koi-mcp)
