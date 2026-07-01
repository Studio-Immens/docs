#!/bin/bash
cd /workspace
echo "script starting"
echo "token: ${GITHUB_TOKEN:+SET}${GITHUB_TOKEN:-UNSET}"
curl -s "https://api.github.com/orgs/studio-immens" 2>&1
echo ""
echo "script done"
