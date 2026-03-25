## Summary

<!-- What does this PR do? 1-3 sentences. -->

## Type of change

- [ ] New plugin
- [ ] Documentation update
- [ ] Bug fix
- [ ] Other (describe below)

## Plugin checklist

<!-- Complete this section if you're adding or modifying a plugin. Delete if not applicable. -->

- [ ] `plugins/<name>/.claude-plugin/plugin.json` — valid JSON with name, version, description, author, homepage, license, keywords
- [ ] `plugins/<name>/.mcp.json` — valid MCP server configuration
- [ ] `plugins/<name>/README.md` — documents features, prerequisites, installation, package link, source link
- [ ] `.claude-plugin/marketplace.json` — updated with new plugin entry
- [ ] Root `README.md` — plugins table updated
- [ ] Package is published on npm or PyPI (`npm view <pkg>` or `curl https://pypi.org/pypi/<pkg>/json` returns 200)
- [ ] MCP server connects successfully (tested with `/mcp` in Claude Code)
- [ ] `./scripts/verify.sh` passes (if script covers your package)

## Documentation checklist

<!-- Complete this section if you're updating documentation. Delete if not applicable. -->

- [ ] No broken links
- [ ] Code examples are valid and tested
- [ ] Consistent with existing documentation style

## Testing

<!-- How did you test this? What queries did you run? -->

## Notes

<!-- Anything reviewers should know. -->
