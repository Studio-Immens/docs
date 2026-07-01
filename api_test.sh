#!/bin/bash
# Run from inside sandbox - check env and try github api
echo "=== ENV CHECK ==="
echo "GITHUB_TOKEN set: $([ -n "$GITHUB_TOKEN" ] && echo YES || echo NO)"
[ -n "$GITHUB_TOKEN" ] && echo "First 4 chars: ${GITHUB_TOKEN:0:4}"

echo ""
echo "=== Try org: studio-immens ==="
curl -s -H "Authorization: Bearer $GITHUB_TOKEN" "https://api.github.com/orgs/studio-immens" 2>&1

echo ""
echo "=== If that fails, try without auth ==="
curl -s "https://api.github.com/orgs/studio-immens" 2>&1

echo ""
echo "=== Search repos by studioimmens ==="
curl -s "https://api.github.com/search/repositories?q=studioimmens&per_page=10" 2>&1
