#!/bin/bash
# Try to find GITHUB_TOKEN from various locations
if [ -n "$GITHUB_TOKEN" ]; then
  echo "TOKEN_EXISTS"
  echo "${GITHUB_TOKEN:0:4}..."
elif [ -f /root/.openclaw/secrets.env ]; then
  echo "Found secrets.env"
  cat /root/.openclaw/secrets.env | head -20
elif [ -f /root/.openclaw/.env ]; then
  echo "Found .env"
  cat /root/.openclaw/.env | head -20
else
  echo "NO_TOKEN"
fi

echo "---"
printenv | grep -i github || echo "No github in env"
printenv | grep -i token || echo "No token in env"
