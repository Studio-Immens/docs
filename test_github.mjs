// Just check environment
console.log("Hello from .mjs");
console.log("GITHUB_TOKEN:", process.env.GITHUB_TOKEN ? "YES (" + process.env.GITHUB_TOKEN.substring(0,4) + "...)" : "NO");
console.log("All keys:", Object.keys(process.env).filter(k => k.includes("GITHUB") || k.includes("TOKEN") || k=== "NODE_ENV"));

// Try fetch via dynamic import
const mod = await import("https");
console.log("https module loaded");

// Make request
const req = mod.get("https://api.github.com/orgs/studio-immens", {
  headers: {
    "User-Agent": "OpenClaw/1.0",
    ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {})
  }
}, (res) => {
  let body = "";
  res.on("data", d => body += d);
  res.on("end", () => {
    try {
      const j = JSON.parse(body);
      console.log("Status:", res.statusCode);
      console.log("Response:", JSON.stringify(j, null, 2).substring(0, 2000));
    } catch {
      console.log("Body:", body.substring(0, 500));
    }
  });
});
req.on("error", e => console.error("Error:", e));
