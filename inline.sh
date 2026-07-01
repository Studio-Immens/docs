#!/bin/bash
cd /workspace
NODE_PATH=$(which node)
echo "node at: $NODE_PATH"
$NODE_PATH -e "
const https = require('https');
function get(url) {
  return new Promise((resolve, reject) => {
    const opts = { ...new URL(url), headers: { 'User-Agent': 'OpenClaw/1.0', 'Accept': 'application/vnd.github.v3+json' }};
    if (process.env.GITHUB_TOKEN) opts.headers['Authorization'] = 'Bearer ' + process.env.GITHUB_TOKEN;
    https.get(opts, (res) => { let b = ''; res.on('data', d => b += d); res.on('end', () => { try { resolve({s: res.statusCode, j: JSON.parse(b)}); } catch { resolve({s: res.statusCode, j: b}); } }); }).on('error', reject);
  });
}
(async () => {
  console.log('TOKEN:', process.env.GITHUB_TOKEN ? 'YES' : 'NO');
  const r = await get('https://api.github.com/orgs/studio-immens');
  console.log('studio-immens status:', r.s);
  if (r.s === 200) console.log(JSON.stringify(r.j).substring(0, 1000));
  const s = await get('https://api.github.com/search/users?q=studio+immens&per_page=10');
  console.log('search:', JSON.stringify(s.j).substring(0, 1000));
  const r2 = await get('https://api.github.com/orgs/studioimmens');
  console.log('studioimmens status:', r2.s);
  if (r2.s === 200) console.log(JSON.stringify(r2.j).substring(0, 1000));
  console.log('DONE');
})();
" 2>&1