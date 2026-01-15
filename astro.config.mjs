import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwindcss from "@tailwindcss/vite";
import pagefind from "astro-pagefind";
import rehypeExternalLinks from 'rehype-external-links';

import partytown from '@astrojs/partytown';
import { siteConfig } from './src/config';
import test_pages from './src/integrations/test_pages'
import remarkEmbedCode from './src/plugins/remark-embed-code';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: siteConfig.siteUrl,
  integrations: [mdx(), partytown(), pagefind(), test_pages(), sitemap()],
  markdown: {
    remarkPlugins: [remarkEmbedCode],
    shikiConfig: {
      theme: 'github-dark',
      langs: ['yaml', 'python', 'cpp', 'javascript'],
    },
    rehypePlugins: [
      [
        rehypeExternalLinks, 
        { 
          rel: ['nofollow', 'noopener', 'noreferrer'],
          target: '_blank',
          content: { 
            type: 'raw', 
            value: `<svg version="2.0" class="external-icon"><use href="#external-arrow"/></svg>`
          }
        }
      ]
    ]
  },
  vite: {
    plugins: [tailwindcss()],
  },
});