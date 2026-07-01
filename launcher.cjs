require('child_process').execSync('node /workspace/find.mjs 2>&1', {
  cwd: '/workspace',
  stdio: 'inherit',
  env: process.env
});
