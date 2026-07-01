// Quick GitHub scan
console.log("GITHUB_TOKEN in env:", process.env.GITHUB_TOKEN ? "YES" : "NO");
console.log("Length:", process.env.GITHUB_TOKEN ? process.env.GITHUB_TOKEN.length : 0);

const https = require("https");

function get(url) {
  return new Promise((resolve, reject) => {
    const opts = new URL(url);
    opts.headers = {"User-Agent": "OpenClaw-Docs/1.0", "Accept": "application/vnd.github.v3+json"};
    if (process.env.GITHUB_TOKEN) opts.headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
    https.get(opts, (res) => {
      let data = "";
      res.on("data", c => data += c);
      res.on("end", () => {
        try { resolve({ status: res.statusCode, data: JSON.parse(data) }); }
        catch { resolve({ status: res.statusCode, data: data }); }
      });
    }).on("error", reject);
  });
}

(async () => {
  // Try both org lookups
  for (const name of ["studio-immens", "studioimmens", "StudioImmens", "immens-studio"]) {
    try {
      const r = await get(`https://api.github.com/orgs/${name}`);
      if (r.status === 200) {
        console.log(`\n✅ FOUND ORG: ${name}`);
        console.log(JSON.stringify(r.data, null, 2).slice(0, 1000));
      } else {
        console.log(`❌ ${name}: ${r.status}`);
      }
    } catch(e) { console.log(`${name}: error`, e.message); }
  }

  // Search
  const s = await get("https://api.github.com/search/users?q=studio+immens&per_page=10");
  console.log("\nSearch results:", JSON.stringify(s.data, null, 2).slice(0, 2000));
  
  // If found org, list repos
  if (s.data?.items?.length) {
    for (const item of s.data.items) {
      console.log(`\n--- ${item.login} repos ---`);
      const repos = await get(`https://api.github.com/orgs/${item.login}/repos?per_page=50`);
      console.log(JSON.stringify(repos.data, null, 2).slice(0, 3000));
    }
  }
})();
