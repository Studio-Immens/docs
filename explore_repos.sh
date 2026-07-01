#!/bin/bash
set -e

# Check for GITHUB_TOKEN
if [ -n "$GITHUB_TOKEN" ]; then
  echo "GITHUB_TOKEN found, first 4 chars: ${GITHUB_TOKEN:0:4}..."
  AUTH="-H Authorization: Bearer $GITHUB_TOKEN"
else
  echo "GITHUB_TOKEN not set, trying without auth"
  AUTH=""
fi

echo "=== Searching for 'studio-immens' org ==="
curl -s $AUTH "https://api.github.com/orgs/studio-immens"
echo ""
echo "---"

echo "=== Searching for 'studioimmens' org ==="
curl -s $AUTH "https://api.github.com/orgs/studioimmens"
echo ""
echo "---"

echo "=== GitHub search: 'Studio Immens' in orgs ==="
curl -s $AUTH "https://api.github.com/search/users?q=studio+immens&type=orgs&per_page=10"
echo ""
echo "---"

echo "=== Searching repos with 'studio-immens' in name ==="
curl -s $AUTH "https://api.github.com/search/repositories?q=studio-immens&per_page=20"
echo ""
echo "---"

echo "=== Try user 'studioimmens' ==="
curl -s $AUTH "https://api.github.com/users/studioimmens/repos?per_page=50"
echo ""
echo "---"

echo "=== Try user 'studio-immens' ==="
curl -s $AUTH "https://api.github.com/users/studio-immens/repos?per_page=50"
echo ""
echo "---"
