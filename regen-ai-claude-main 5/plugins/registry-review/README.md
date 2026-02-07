# Regen Registry Review Plugin

Automated carbon credit project document review using MCP.

## Features

- PDF document processing and analysis
- Evidence extraction from project documents
- Requirement mapping against methodologies
- Cross-validation and report generation
- LLM-powered extraction (optional)

## Prerequisites

- uv (`curl -LsSf https://astral.sh/uv/install.sh | sh`)
- (Optional) Anthropic API key for LLM extraction

## Installation

```bash
/plugin install registry-review@regen-ai
# Restart Claude Code
/mcp
```

No setup required - the MCP server runs directly from PyPI via `uvx`.

## Configuration

For LLM-powered extraction, set in your environment:
```bash
export REGISTRY_REVIEW_ANTHROPIC_API_KEY=your-key
```

## Package

[pypi.org/project/registry-review-mcp](https://pypi.org/project/registry-review-mcp/)

## Source

[github.com/gaiaaiagent/regen-registry-review-mcp](https://github.com/gaiaaiagent/regen-registry-review-mcp)
