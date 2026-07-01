#!/usr/bin/env node
const cp = require("child_process");
const result = cp.spawnSync("bash", ["/workspace/github_check.sh"], {
  env: { ...process.env, GITHUB_TOKEN: process.env.GITHUB_TOKEN || "" },
  cwd: "/workspace",
  timeout: 15000,
});
console.log("stdout:", result.stdout?.toString());
console.log("stderr:", result.stderr?.toString());
console.log("status:", result.status);
