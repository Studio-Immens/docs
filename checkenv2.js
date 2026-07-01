#!/usr/bin/env node
// Check if node can see the GITHUB_TOKEN
console.log("Hello from node");
console.log("All env keys:", Object.keys(process.env).length);
const filtered = Object.keys(process.env).filter(k => {
  const u = k.toUpperCase();
  return u.includes("GITHUB") || u.includes("TOKEN") || u.includes("SECRET") || u.includes("API_KEY");
});
console.log("Relevant keys:", filtered);
filtered.forEach(k => {
  const v = process.env[k];
  console.log(`  ${k}=${v ? v.substring(0, Math.min(8, v.length)) + "..." : "(empty)"}`);
});
