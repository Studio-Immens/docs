#!/usr/bin/env node
// Simplified - just find what's there
const https = require('https');

function get(url) {
  return new Promise((resolve, reject) => {
    const opts = { ...new URL(url), headers: {
      'User-Agent': 'OpenClaw-Docs/1.0', 'Accept': 'application/vnd.github.v3+json'
    }};
    if (process.env.GITHUB_TOKEN) opts.headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
    https.get(opts, (res) => {
      let b = '';
      res.on('data', d => b += d);
      res.on('end', () => { try { resolve({s: res.statusCode, j: JSON.parse(b)}); } catch { resolve({s: res.statusCode, j: b}); } });
    }).on('error', reject);
  });
}

(async () => {
  process.stdout.write("START\n");
  process.stdout.write("TOKEN: " + (process.env.GITHUB_TOKEN ? "YES" : "NO") + "\n");
  
  const r = await get("https://api.github.com/orgs/studio-immens");
  process.stdout.write(`studio-immens: ${r.s}\n`);
  if (r.s === 200) process.stdout.write(JSON.stringify(r.j, null, 2).substring(0, 500) + "\n");
  
  const r2 = await get("https://api.github.com/orgs/studioimmens");
  process.stdout.write(`studioimmens: ${r2.s}\n`);
  if (r2.s === 200) process.stdout.write(JSON.stringify(r2.j, null, 2).substring(0, 500) + "\n");
  
  const s = await get("https://api.github.com/search/users?q=studio+immens&per_page=5");
  process.stdout.write(`search users: ${JSON.stringify(s.j).substring(0, 1000)}\n`);
  
  process.stdout.write("DONE\n");
})();
