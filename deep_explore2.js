const https = require('https');
const fs = require('fs');

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
  const out = [];
  out.push("=== GITHUB_TOKEN ===");
  out.push(process.env.GITHUB_TOKEN ? "YES" : "NO");
  
  const names = ["studio-immens", "studioimmens", "StudioImmens"];
  for (const name of names) {
    const r = await get(`https://api.github.com/orgs/${name}`);
    out.push(`\n--- ORG: ${name} (${r.status}) ---`);
    if (r.status === 200) {
      out.push(`login: ${r.data.login}`);
      out.push(`name: ${r.data.name || '-'}`);
      out.push(`desc: ${r.data.description || '-'}`);
      out.push(`repos: ${r.data.public_repos}`);
      if (r.data.public_repos > 0) {
        const repos = await get(r.data.repos_url + "?per_page=100");
        for (const repo of repos.data) {
          out.push(`  REPO: ${repo.name}`);
          out.push(`  desc: ${repo.description || '-'}`);
          out.push(`  url: ${repo.html_url}`);
          out.push(`  lang: ${repo.language || '-'}`);
          out.push(`  topics: ${(repo.topics||[]).join(',') || '-'}`);
          out.push(`  stars: ${repo.stargazers_count}`);
          out.push(`  forks: ${repo.forks_count}`);
          out.push(`  created: ${repo.created_at}`);
          out.push(`  updated: ${repo.updated_at}`);
          out.push(`  default_branch: ${repo.default_branch}`);
          
          // Get README
          const readme = await get(`https://api.github.com/repos/${r.data.login}/${repo.name}/readme`);
          if (readme.status === 200 && readme.data.content) {
            const content = Buffer.from(readme.data.content, 'base64').toString();
            out.push(`  README:`);
            out.push(content);
          }
          out.push(`  ---`);
        }
      }
    }
  }
  
  // Search also for repos
  const sr = await get("https://api.github.com/search/repositories?q=immens&per_page=30");
  out.push("\n=== SEARCH REPOS ===");
  if (sr.data && sr.data.items) {
    for (const item of sr.data.items) {
      out.push(`  ${item.full_name}: ${item.description || '-'} (${item.html_url})`);
    }
  }
  
  out.push("\n=== DONE ===");
  fs.writeFileSync('/workspace/github_out.txt', out.join('\n'));
})();
