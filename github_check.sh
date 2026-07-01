#!/bin/bash
set -euo pipefail
# Attempt to run curl to GitHub
GITHUB_TOKEN="${GITHUB_TOKEN:-}"
if [ -n "$GITHUB_TOKEN" ]; then
  echo "Token available: ${GITHUB_TOKEN:0:4}..."
else
  echo "No GITHUB_TOKEN"
fi
echo "--- ORG: studio-immens ---"
curl -sf "https://api.github.com/orgs/studio-immens" 2>&1 || echo "FAILED_ORG_LOOKUP"
echo ""
echo "--- trying user lookup ---"
curl -sf "https://api.github.com/users/StudioImmens" 2>&1 || echo "FAILED_USER"
curl -sf "https://api.github.com/users/studioimmens" 2>&1 || echo "FAILED_USER2"
echo ""
echo "--- DONE ---"
