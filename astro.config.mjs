import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwindcss from "@tailwindcss/vite";
import pagefind from "astro-pagefind";

import partytown from '@astrojs/partytown';

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), partytown(), pagefind()],
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