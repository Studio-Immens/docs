#!/bin/bash
# Run commands and capture output
GITHUB_TOKEN="${GITHUB_TOKEN:-}"

echo "=== ENV CHECK ==="
if [ -n "$GITHUB_TOKEN" ]; then
  echo "GITHUB_TOKEN=YES (first 4: ${GITHUB_TOKEN:0:4})"
else
  echo "GITHUB_TOKEN=NO"
fi

echo ""
echo "=== ORG: studio-immens (no auth) ==="
curl -s "https://api.github.com/orgs/studio-immens"
echo ""
echo "=== ORG: studioimmens (no auth) ==="
curl -s "https://api.github.com/orgs/studioimmens"
echo ""
echo "=== SEARCH: studio immens ==="
curl -s "https://api.github.com/search/users?q=studio+immens&per_page=5"
echo ""
echo "=== SEARCH REPOS: immens ==="
curl -s "https://api.github.com/search/repositories?q=immens&per_page=10"
echo ""
