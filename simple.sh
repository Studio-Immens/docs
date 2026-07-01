#!/bin/bash
# Must exec from /workspace
cd /workspace
exec 2>&1

echo "=== PIPESTATUS ==="
# Simple approach - just run and output
curl -s "https://api.github.com/orgs/studio-immens" 
echo ""
echo "EXIT: $?"
