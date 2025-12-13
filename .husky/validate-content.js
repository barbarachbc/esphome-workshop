#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = path.join(__dirname, '../src/content');

// Get all staged files
let stagedFiles = [];
try {
  const output = execSync('git diff --cached --name-only --diff-filter=ACM', { encoding: 'utf8' });
  stagedFiles = output.split('\n').filter(Boolean);
} catch (error) {
  console.error('Error getting staged files:', error.message);
  process.exit(1);
}

// Filter for markdown content files
const mdFiles = stagedFiles.filter(f => f.startsWith('src/content/') && f.endsWith('.md'));

if (mdFiles.length === 0) {
  console.log('\n✅ No content files to validate\n');
  process.exit(0);
}

// Read all content files to build reference map
function buildReferenceMap() {
  const map = {
    devices: new Set(),
    components: new Set(),
    projects: new Set(),
    notes: new Set()
  };

  Object.keys(map).forEach(collection => {
    const dir = path.join(CONTENT_DIR, collection);
    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
      files.forEach(file => {
        const slug = path.basename(file, '.md');
        map[collection].add(slug);
      });
    }
  });

  return map;
}

// Parse YAML frontmatter
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};

  const yaml = match[1];
  const data = {};

  yaml.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) return;

    const key = line.substring(0, colonIndex).trim();
    let value = line.substring(colonIndex + 1).trim();

    // Handle arrays
    if (value.startsWith('[')) {
      try {
        value = JSON.parse(value);
      } catch {
        value = [value];
      }
    } else if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    }

    data[key] = value;
  });

  return data;
}

// Validation functions
const validators = {
  checkComponentSlugs(file, frontmatter, refMap) {
    const errors = [];
    //at the moment component slugs are optional
    return errors;
    const componentRefs = frontmatter.components || [];

    if (!Array.isArray(componentRefs)) return errors;

    componentRefs.forEach(slug => {
      if (!refMap.components.has(slug)) {
        errors.push(`  ❌ Unknown component slug: "${slug}"`);
      }
    });

    return errors;
  },

  checkDeviceSlugs(file, frontmatter, refMap) {
    const errors = [];
    const deviceRefs = frontmatter.devices || [];

    if (!Array.isArray(deviceRefs)) return errors;

    deviceRefs.forEach(slug => {
      if (!refMap.devices.has(slug)) {
        errors.push(`  ❌ Unknown device slug: "${slug}"`);
      }
    });

    return errors;
  }
};

// Run validation
console.log('\n🔍 Validating content references...\n');

const refMap = buildReferenceMap();
let validationErrors = [];

// Check component/device slugs
mdFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const frontmatter = parseFrontmatter(content);
  const filePath = path.relative(process.cwd(), file);

  const errors = [
    ...validators.checkComponentSlugs(file, frontmatter, refMap),
    ...validators.checkDeviceSlugs(file, frontmatter, refMap)
  ];

  if (errors.length > 0) {
    validationErrors.push(`${filePath}:\n${errors.join('\n')}`);
  }
});

if (validationErrors.length > 0) {
  console.error('❌ Content validation failed:\n');
  console.error(validationErrors.join('\n\n'));
  console.error('\n');
  process.exit(1);
}

console.log('✅ Content references valid\n');
process.exit(0);
