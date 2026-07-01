#!/bin/bash
cd /workspace
exec 2>&1
echo "DEBUG: which node = $(which node 2>/dev/null || echo NOTFOUND)"
echo "DEBUG: node version = $(node --version 2>/dev/null || echo NOTFOUND)"
echo "DEBUG: GITHUB_TOKEN set = ${GITHUB_TOKEN:+YES}${GITHUB_TOKEN:-NO}"
echo "DEBUG: GITHUB_TOKEN len = ${#GITHUB_TOKEN}"
echo "---"
bash -c 'echo "SUB: GITHUB_TOKEN=$GITHUB_TOKEN"'
echo "---"
env | grep -i github
env | grep -i token
echo "--- end ---"
