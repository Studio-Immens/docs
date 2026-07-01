#!/bin/bash
cd /workspace
echo "=== ENV CHECK ==="
echo "GITHUB_TOKEN present: $([ -n "$GITHUB_TOKEN" ] && echo YES || echo NO)"
[ -n "$GITHUB_TOKEN" ] && echo "Length: ${#GITHUB_TOKEN}"
echo ""
echo "=== Running fetch script ==="
node fetch_repos.mjs 2>&1
