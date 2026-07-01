console.log("GITHUB_TOKEN in env:", !!process.env.GITHUB_TOKEN);
console.log("First 4:", process.env.GITHUB_TOKEN ? process.env.GITHUB_TOKEN.substring(0,4) : "none");
console.log("All env keys:", Object.keys(process.env).filter(k => k.includes("GITHUB") || k.includes("TOKEN") || k.includes("SECRET")));
