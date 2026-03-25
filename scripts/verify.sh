#!/usr/bin/env bash
# verify.sh — Check that all Regen MCP packages are available on their registries.
# Usage: ./scripts/verify.sh

set -euo pipefail

PASS=0
FAIL=0

check_npm() {
  local pkg="$1"
  if npm view "$pkg" version >/dev/null 2>&1; then
    echo "  PASS  npm: $pkg ($(npm view "$pkg" version 2>/dev/null))"
    PASS=$((PASS + 1))
  else
    echo "  FAIL  npm: $pkg — not found on npm registry"
    FAIL=$((FAIL + 1))
  fi
}

check_pypi() {
  local pkg="$1"
  local status
  status=$(curl -s -o /dev/null -w "%{http_code}" "https://pypi.org/pypi/$pkg/json")
  if [ "$status" = "200" ]; then
    local version
    version=$(curl -s "https://pypi.org/pypi/$pkg/json" | python3 -c "import sys,json; print(json.load(sys.stdin)['info']['version'])" 2>/dev/null || echo "unknown")
    echo "  PASS  pypi: $pkg ($version)"
    PASS=$((PASS + 1))
  else
    echo "  FAIL  pypi: $pkg — not found on PyPI (HTTP $status)"
    FAIL=$((FAIL + 1))
  fi
}

echo "Regen AI MCP — Package Registry Check"
echo "======================================"
echo ""

echo "npm packages:"
check_npm "regen-koi-mcp"
check_npm "regen-compute"
echo ""

echo "PyPI packages:"
check_pypi "regen-python-mcp"
check_pypi "registry-review-mcp"
echo ""

echo "--------------------------------------"
echo "Results: $PASS passed, $FAIL failed"

if [ "$FAIL" -gt 0 ]; then
  exit 1
fi
