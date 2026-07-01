#!/usr/bin/env node
// GitHub lookup for "Studio Immens" — standalone, writes output to stdout
const https = require('https');
function get(url) {
  return new Promise((resolve, reject) => {
    const opts = { ...new URL(url), headers: {
      'User-Agent': 'OpenClaw-Docs/1.0',
      'Accept': 'application/vnd.github.v3+json'
    }};
    if (process.env.GITHUB_TOKEN) opts.headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
    https.get(opts, (res) => {
      let b = '';
      res.on('data', d => b += d);
      res.on('end', () => {
        try { resolve({ status: res.statusCode, data: JSON.parse(b) }); }
        catch { resolve({ status: res.statusCode, data: b }); }
      });
    }).on('error', reject);
  });
}

(async () => {
  console.log('=== GitHub Lookup: Studio Immens ===');
  console.log('Token:', process.env.GITHUB_TOKEN ? 'YES' : 'NO', '\n');

  // 1. Check various org name permutations
  const names = ['studio-immens', 'studioimmens', 'StudioImmens', 'immens-studio', 'studio_immens'];
  for (const name of names) {
    const r = await get(`https://api.github.com/orgs/${name}`);
    if (r.status === 200) {
      console.log(`✓ ORG FOUND: ${name}`);
      console.log(`  Login: ${r.data.login}`);
      console.log(`  Name: ${r.data.name || '-'}`);
      console.log(`  Description: ${r.data.description || '-'}`);
      console.log(`  Repos: ${r.data.public_repos}`);
      console.log(`  URL: ${r.data.html_url}`);
      if (r.data.public_repos > 0) {
        const repos = await get(r.data.repos_url + '?per_page=50');
        console.log(`  Repos:`);
        for (const repo of repos.data) {
          console.log(`    - ${repo.name} (${repo.language || '?'}) ⭐${repo.stargazers_count}`);
          console.log(`      ${repo.description || '-'}`);
          console.log(`      ${repo.html_url}`);
        }
      }
      console.log('');
    } else {
      console.log(`✗ ${name}: status ${r.status}`);
    }
  }

  // 2. Search users
  const users = await get('https://api.github.com/search/users?q=studio+immens&per_page=10');
  if (users.status === 200 && users.data.items?.length) {
    console.log('\n=== Search Users ===');
    for (const u of users.data.items) {
      console.log(`  ${u.login} (${u.type}): ${u.html_url}`);
    }
  }

  // 3. Search repos
  const repos = await get('https://api.github.com/search/repositories?q=immens&per_page=30');
  if (repos.status === 200 && repos.data.items?.length) {
    console.log('\n=== Search Repos (query: immens) ===');
    for (const r of repos.data.items) {
      if (r.full_name.toLowerCase().includes('immens')) {
        console.log(`  ${r.full_name}: ${r.description || '-'}`);
        console.log(`    ${r.html_url}`);
      }
    }
  }

  console.log('\n=== DONE ===');
})().catch(e => { console.error('FAILED:', e.message); process.exit(1); });
