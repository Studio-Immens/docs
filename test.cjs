process.stdout.write("Hello world\n");
process.stdout.write("GITHUB_TOKEN env: " + (process.env.GITHUB_TOKEN ? "SET" : "NOT SET") + "\n");
process.stdout.write("First 4: " + (process.env.GITHUB_TOKEN ? process.env.GITHUB_TOKEN.substring(0,4) : "N/A") + "\n");
process.stdout.write("process.version: " + process.version + "\n");
process.stdout.write("All env keys with GITHUB/TOKEN: " + 
  JSON.stringify(Object.keys(process.env).filter(k => k.includes("GITHUB") || k.includes("TOKEN") || k.includes("SECRET") || k.includes("API"))) + "\n");
