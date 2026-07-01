#!/bin/bash
set -e
AUTH=""
if [ -n "$GITHUB_TOKEN" ]; then
  AUTH="-H \"Authorization: Bearer $GITHUB_TOKEN\""
  echo "Token found: ${GITHUB_TOKEN:0:4}..."
fi

echo "=== Searching for studio-immens org ==="
eval curl -s $AUTH "https://api.github.com/orgs/studio-immens" 2>&1
echo "=== DONE ==="
