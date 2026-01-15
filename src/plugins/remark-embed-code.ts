/**
 * Remark plugin to embed external code files into markdown
 * 
 * Processes markdown AST and replaces HTML comments like:
 *   <!-- astro-embed: /path/to/file.yaml -->
 * with actual code blocks before rendering to HTML
 * 
 * Usage in astro.config.mjs:
 *   import remarkEmbedCode from './src/plugins/remark-embed-code';
 *   
 *   export default defineConfig({
 *     markdown: {
 *       remarkPlugins: [remarkEmbedCode],
 *     }
 *   });
 */

import { visit } from 'unist-util-visit';
import type { Plugin } from 'unified';
import type { Root, Html, Code } from 'mdast';
import fs from 'fs';
import path from 'path';

const remarkEmbedCode: Plugin<[], Root> = () => {
  return (tree, file) => {
    visit(tree, 'html', (node: Html, index, parent) => {
      // Match: <!-- astro-embed: /path/to/file.yaml -->
      // Or: <!-- astro-embed: /path/to/file.py lang:python -->
      const embedRegex = /^<!--\s*astro-embed:\s*([^\s]+)(?:\s+lang:(\w+))?\s*-->$/;
      const match = node.value.match(embedRegex);
      
      if (!match) return;
      
      const filePath = match[1];
      const specifiedLang = match[2];
      
      // Determine language from extension or explicit specification
      const ext = path.extname(filePath).slice(1);
      const lang = specifiedLang || ext || 'text';
      
      try {
        // Resolve file path relative to project root or public folder
        let resolvedPath: string;
        
        // If path starts with /files/, look in public/files/
        if (filePath.startsWith('/files/')) {
          resolvedPath = path.join(process.cwd(), 'public', filePath);
        } else if (filePath.startsWith('/')) {
          resolvedPath = path.join(process.cwd(), 'public', filePath);
        } else {
          resolvedPath = path.join(process.cwd(), filePath);
        }
        
        const fileContent = fs.readFileSync(resolvedPath, 'utf-8');
        
        // Create a code block node to replace the HTML comment
        const codeNode: Code = {
          type: 'code',
          lang: lang,
          meta: null,
          value: fileContent,
        };
        
        // Replace the HTML comment node with the code block node
        if (parent && typeof index === 'number') {
          parent.children[index] = codeNode;
        }
        
        console.log(`✓ Embedded code from: ${filePath} (${lang})`);
      } catch (error) {
        console.error(`✗ Error embedding file ${filePath}:`, error);
        
        // Replace with an error message in markdown
        const errorNode: Html = {
          type: 'html',
          value: `<div class="p-4 rounded-lg my-4" style="background: var(--bg-secondary); border: 2px solid var(--accent-red); color: var(--text-primary);">
  <strong style="color: var(--accent-red);">⚠️ Error loading file</strong>
</div>`,
        };
        
        if (parent && typeof index === 'number') {
          parent.children[index] = errorNode;
        }
      }
    });
  };
};

export default remarkEmbedCode;
