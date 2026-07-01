#!/bin/bash
echo "--- Simple Check ---"
which node
which curl
echo "--- GITHUB_TOKEN check ---"
echo "Token var: ${GITHUB_TOKEN:+SET}"
echo "Token len: ${#GITHUB_TOKEN}"
echo "--- Running node env check ---"
node /workspace/checkenv2.js
echo "--- Running curl ---"
curl -s "https://api.github.com/orgs/studio-immens"
