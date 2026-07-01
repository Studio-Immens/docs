require('child_process').execFileSync('/usr/bin/node', ['/workspace/explore.mjs'], {
  cwd: '/workspace',
  stdio: 'inherit',
  env: process.env
});
