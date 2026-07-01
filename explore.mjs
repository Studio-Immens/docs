#!/usr/bin/env node
const mod = await import("https");
console.log("GITHUB_TOKEN:", process.env.GITHUB_TOKEN ? "YES (" + process.env.GITHUB_TOKEN.substring(0,4) + "...)" : "NO");
console.log("All keys:", Object.keys(process.env).filter(k => k.includes("GITHUB") || k.includes("TOKEN") || k=== "NODE_ENV"));

function httpGet(url) {
  return new Promise((resolve, reject) => {
    const opts = new URL(url);
    opts.headers = {
      "User-Agent": "OpenClaw-Docs/1.0",
      "Accept": "application/vnd.github.v3+json",
      ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {})
    };
    mod.get(opts, (res) => {
      let body = "";
      res.on("data", d => body += d);
      res.on("end", () => {
        try { resolve({ status: res.statusCode, data: JSON.parse(body) }); }
        catch { resolve({ status: res.statusCode, data: body }); }
      });
    }).on("error", reject);
  });
}

// Try all possible org/user names
const names = ["studio-immens", "studioimmens", "StudioImmens", "immens-studio", "studio_immens"];
for (const name of names) {
  const r = await httpGet(`https://api.github.com/orgs/${name}`);
  console.log(`\n--- org ${name}: status ${r.status} ---`);
  if (r.status === 200) console.log(JSON.stringify(r.data, null, 2).slice(0, 800));
}

// Search
const s = await httpGet("https://api.github.com/search/users?q=studio+immens&per_page=10");
console.log("\n--- SEARCH users 'studio immens' ---");
console.log(JSON.stringify(s.data, null, 2).slice(0, 2000));

const sr = await httpGet("https://api.github.com/search/repositories?q=studio+immens&per_page=10");
console.log("\n--- SEARCH repos 'studio immens' ---");
console.log(JSON.stringify(sr.data, null, 2).slice(0, 2000));

// Also search for "immens" in repo names
const sr2 = await httpGet("https://api.github.com/search/repositories?q=immens&per_page=20");
console.log("\n--- SEARCH repos 'immens' ---");
console.log(JSON.stringify(sr2.data, null, 2).slice(0, 2000));

process.exit(0);
