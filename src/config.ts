/**
 * Site Configuration
 * 
 * Configuration values are loaded from environment variables.
 * See .env.example for available options.
 * 
 * For production deployment, set these values in your hosting platform:
 * - GitHub Actions: Repository secrets
 * - Vercel/Netlify/Cloudflare: Environment variables in project settings
 */

import { loadEnv } from "vite";

const my_env = loadEnv(process.env.NODE_ENV!, process.cwd(), "");

// Helper function to get environment variable with fallback
function getEnv(key: string, fallback: string = ''): string {
  return my_env[key] || fallback;
}

console.log('DEBUG: PUBLIC_SITE_URL:', process.env.PUBLIC_SITE_URL);

export const siteConfig = {
  siteName: 'My ESPHome Workshop',
  siteUrl: getEnv('PUBLIC_SITE_URL', 'https://yourdomain.com'),
  github: {
    repo: getEnv('PUBLIC_GITHUB_REPO', 'yourusername/yourrepo'),
    get issuesUrl() {
      return `https://github.com/${this.repo}/issues/new`;
    },
  },
  analytics: {
    umami: {
      url: getEnv('PUBLIC_UMAMI_URL'),
      websiteId: getEnv('PUBLIC_UMAMI_WEBSITE_ID'),
      get enabled() {
        return !!(this.url && this.websiteId);
      },
    },
  },
};
