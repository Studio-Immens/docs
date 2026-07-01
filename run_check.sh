#!/bin/bash
echo "=== env ==="
env | sort | head -50
echo ""
echo "=== trying GitHub API ==="
curl -s "https://api.github.com/orgs/studio-immens" 2>&1 | head -50
