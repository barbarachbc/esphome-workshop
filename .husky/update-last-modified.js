#!/usr/bin/env node

import { execSync } from 'child_process';
import { readFileSync, writeFileSync, existsSync } from 'fs';

// Get list of staged markdown files in src/content
let stagedFiles;
try {
  stagedFiles = execSync('git diff --cached --name-only --diff-filter=ACM', { encoding: 'utf8' })
    .trim()
    .split(/\r?\n/) // Cross-platform: handle both \n and \r\n
    .filter(Boolean) // Remove empty strings
    .filter(file => 
      file.startsWith('src/content/') && 
      file.endsWith('.md') &&
      existsSync(file)
    );
} catch (error) {
  console.error('Error getting staged files:', error.message);
  process.exit(1);
}

if (stagedFiles.length === 0) {
  process.exit(0);
}

const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

stagedFiles.forEach(file => {
  try {
    const content = readFileSync(file, 'utf8');
    
    // Check if file starts with frontmatter
    if (!content.startsWith('---')) {
      return;
    }
    
    // Split into lines (cross-platform)
    const lines = content.split(/\r?\n/);
    
    // Find end of frontmatter
    let frontmatterEnd = -1;
    for (let i = 1; i < lines.length; i++) {
      if (lines[i] === '---') {
        frontmatterEnd = i;
        break;
      }
    }
    
    if (frontmatterEnd === -1) {
      return; // No closing ---
    }
    
    // Check if lastModified exists
    let hasLastModified = false;
    for (let i = 1; i < frontmatterEnd; i++) {
      if (lines[i].startsWith('lastModified:')) {
        // Update the line
        lines[i] = `lastModified: "${today}"`;
        hasLastModified = true;
        break;
      }
    }
    
    // Add lastModified if it doesn't exist
    if (!hasLastModified) {
      lines.splice(frontmatterEnd, 0, `lastModified: "${today}"`);
    }
    
    // Write back (preserve original line endings)
    const newContent = lines.join('\n');
    writeFileSync(file, newContent, 'utf8');
    execSync(`git add "${file}"`, { stdio: 'ignore' });
    
    console.log(`✓ Updated ${file}`);
  } catch (error) {
    console.error(`✗ Error processing ${file}:`, error.message);
  }
});
