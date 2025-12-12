#!/usr/bin/env node

import { execSync } from 'child_process';

// Get staged files
let stagedFiles = [];
try {
  const output = execSync('git diff --cached --name-only --diff-filter=ACM', { encoding: 'utf8' });
  stagedFiles = output.split('\n').filter(Boolean);
} catch (error) {
  console.error('Error getting staged files:', error.message);
  process.exit(1);
}

// Filter for markdown files
const mdFiles = stagedFiles.filter(f => f.endsWith('.md'));

if (mdFiles.length === 0) {
  console.log('\n✅ No markdown files to lint\n');
  process.exit(0);
}

console.log('\n🔍 Linting markdown files...\n');

try {
  // Run markdownlint-cli2 on staged files
  execSync(`npx markdownlint-cli2 ${mdFiles.join(' ')}`, { stdio: 'inherit' });
  console.log('\n✅ Markdown linting passed\n');
  process.exit(0);
} catch (error) {
  console.error('\n❌ Markdown linting failed\n');
  console.error('💡 Tip: Run `npm run lint:md:fix` to auto-fix issues\n');
  process.exit(1);
}
