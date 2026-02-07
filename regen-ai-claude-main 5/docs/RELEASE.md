# Release process

## When to cut a tag
- When MCP config templates or documentation changes affect downstream agent runs.

## Steps
1) Update `CHANGELOG.md`.
2) Tag and push:
```bash
git tag -a vX.Y.Z -m "regen-ai-claude vX.Y.Z"
git push origin vX.Y.Z
```

## Notes
- Keep `.mcp.json.template` backwards compatible when possible.
