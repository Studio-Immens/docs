#!/usr/bin/env bash
exec 2>&1
set -euo pipefail
cd /workspace

echo "=== Pre-check ==="
echo "Node: $(node --version)"
echo "GITHUB_TOKEN: ${GITHUB_TOKEN:+set (len ${#GITHUB_TOKEN})}${GITHUB_TOKEN:-NOT SET}"

echo ""
echo "=== Attempt org lookup ==="
ORG_RESULT=$(curl -s -w "\n%{http_code}" \
  ${GITHUB_TOKEN:+-H "Authorization: Bearer $GITHUB_TOKEN"} \
  "https://api.github.com/orgs/studio-immens" 2>&1)
HTTP_CODE=$(echo "$ORG_RESULT" | tail -1)
ORG_BODY=$(echo "$ORG_RESULT" | head -n -1)
echo "HTTP status: $HTTP_CODE"
echo "$ORG_BODY" | head -40

echo ""
echo "=== Search: 'studio immens' ==="
SEARCH_RESULT=$(curl -s \
  ${GITHUB_TOKEN:+-H "Authorization: Bearer $GITHUB_TOKEN"} \
  "https://api.github.com/search/users?q=studio+immens&per_page=5" 2>&1)
echo "$SEARCH_RESULT" | python3 -m json.tool 2>/dev/null || echo "$SEARCH_RESULT" | head -50
