import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwindcss from "@tailwindcss/vite";

import partytown from '@astrojs/partytown';

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), partytown()],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      langs: ['yaml', 'python', 'cpp', 'javascript'],
    },
  },
  vite: {    plugins: [tailwindcss()],  },
});