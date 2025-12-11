import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwindcss from "@tailwindcss/vite";
import pagefind from "astro-pagefind";

import partytown from '@astrojs/partytown';
import { siteConfig } from './src/config';
import test_pages from './src/integrations/test_pages'

// https://astro.build/config
export default defineConfig({
  site: siteConfig.siteUrl,
  integrations: [mdx(), partytown(), pagefind(), test_pages()],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      langs: ['yaml', 'python', 'cpp', 'javascript'],
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});