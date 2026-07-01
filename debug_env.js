const { execSync } = require("child_process");
try {
  // Check env
  console.log("=== process.env GITHUB related ===");
  Object.keys(process.env).filter(k => k.toUpperCase().includes("GITHUB") || k.toUpperCase().includes("TOKEN")).forEach(k => {
    console.log(`${k}=${process.env[k] ? process.env[k].substring(0,6) + "..." : "(empty)"}`);
  });
  
  console.log("\n=== exec env ===");
  console.log(execSync("env | sort", {encoding: "utf8", timeout: 5000}));
} catch(e) {
  console.error("Error:", e.message);
}
