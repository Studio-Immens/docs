// Fetch all repos for Studio Immens
import https from "https";

function get(url) {
  return new Promise((resolve, reject) => {
    const opts = new URL(url);
    opts.headers = {
      "User-Agent": "OpenClaw-DocsWriter/1.0",
      "Accept": "application/vnd.github.v3+json"
    };
    if (process.env.GITHUB_TOKEN) {
      opts.headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
    }
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

async function main() {
  console.log("GITHUB_TOKEN:", process.env.GITHUB_TOKEN ? "YES (" + process.env.GITHUB_TOKEN.substring(0,4) + "...)" : "NO");
  
  // Try various org/user names
  for (const name of ["studio-immens", "studioimmens", "StudioImmens"]) {
    console.log(`\n--- Checking org/user: ${name} ---`);
    const r = await get(`https://api.github.com/orgs/${name}`);
    console.log(`Status: ${r.status}`);
    if (r.status === 200) {
      console.log("Found:", JSON.stringify(r.data, null, 2).substring(0, 500));
    }
  }
  
  // Try search
  console.log("\n--- Search: studio immens ---");
  const s1 = await get("https://api.github.com/search/users?q=studio+immens&per_page=5");
  console.log(JSON.stringify(s1.data, null, 2).substring(0, 1000));
  
  console.log("\n--- Search repos: immens ---");
  const s2 = await get("https://api.github.com/search/repositories?q=immens+in:name&per_page=10");
  console.log(JSON.stringify(s2.data, null, 2).substring(0, 2000));
}

main().catch(e => console.error(e));
