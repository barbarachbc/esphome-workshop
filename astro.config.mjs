import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  integrations: [mdx()],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      langs: ['yaml', 'python', 'cpp', 'javascript'],
    },
  },
  vite: {    plugins: [tailwindcss()],  },
});
