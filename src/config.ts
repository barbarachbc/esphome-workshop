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

// Helper function to get environment variable with fallback
function getEnv(key: string, fallback: string = ''): string {
  return import.meta.env[key] || fallback;
}

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
