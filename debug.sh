#!/bin/bash
export PATH="/usr/local/bin:/usr/bin:/bin"
# Check env and run curl
echo "--- env check ---"
env | grep -i github 2>/dev/null || echo "no GITHUB in env"
env | grep -i token 2>/dev/null || echo "no TOKEN in env"
echo "--- ls ~ ---"
ls -la /root/ 2>/dev/null || echo "no /root"
echo "--- ls /root/.openclaw ---"
ls -la /root/.openclaw/ 2>/dev/null || echo "no /root/.openclaw"
echo "--- trying curl ---"
curl -s "https://api.github.com/orgs/studio-immens" | head -30
