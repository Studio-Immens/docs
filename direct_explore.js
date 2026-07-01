const https = require('https');

function get(url) {
  return new Promise((resolve, reject) => {
    const opts = new URL(url);
    opts.headers = {
      'User-Agent': 'OpenClaw-Docs/1.0',
      'Accept': 'application/vnd.github.v3+json',
    };
    if (process.env.GITHUB_TOKEN) {
      opts.headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
    }
    https.get(opts, (res) => {
      let body = '';
      res.on('data', d => body += d);
      res.on('end', () => {
        try { resolve({ status: res.statusCode, data: JSON.parse(body) }); }
        catch { resolve({ status: res.statusCode, data: body }); }
      });
    }).on('error', reject);
  });
}

(async () => {
  console.log("=== GITHUB_TOKEN ===");
  console.log(process.env.GITHUB_TOKEN ? "YES (" + process.env.GITHUB_TOKEN.substring(0,4) + "...)" : "NO");
  
  const names = ["studio-immens", "studioimmens", "StudioImmens", "immens-studio", "studio_immens"];
  for (const name of names) {
    const r = await get(`https://api.github.com/orgs/${name}`);
    console.log(`\n--- ORG: ${name} (${r.status}) ---`);
    if (r.status === 200) {
      console.log("login:", r.data.login);
      console.log("name:", r.data.name);
      console.log("description:", r.data.description);
      console.log("public_repos:", r.data.public_repos);
      
      // List repos
      if (r.data.public_repos > 0) {
        const repos = await get(r.data.repos_url + "?per_page=100");
        console.log(`\nREPOS (${repos.data.length}):`);
        for (const repo of repos.data) {
          console.log(`  - ${repo.name}: ${repo.description || "no description"}`);
        }
      }
    }
  }
  
  // Search
  const s = await get("https://api.github.com/search/users?q=studio+immens&per_page=10");
  console.log("\n=== SEARCH USERS ===");
  if (s.data.items) {
    for (const item of s.data.items) {
      console.log(`  ${item.login} (${item.type}): ${item.html_url}`);
    }
  }
  
  const sr = await get("https://api.github.com/search/repositories?q=immens&per_page=30");
  console.log("\n=== SEARCH REPOS 'immens' ===");
  if (sr.data.items) {
    for (const item of sr.data.items) {
      console.log(`  ${item.full_name}: ${item.description || "no desc"} (${item.html_url})`);
    }
  }
  
  const sr2 = await get("https://api.github.com/search/repositories?q=studio+immens&per_page=30");
  console.log("\n=== SEARCH REPOS 'studio immens' ===");
  if (sr2.data.items) {
    for (const item of sr2.data.items) {
      console.log(`  ${item.full_name}: ${item.description || "no desc"} (${item.html_url})`);
    }
  }

  process.exit(0);
})();
