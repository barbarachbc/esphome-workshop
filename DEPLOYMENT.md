# 🚀 Deployment Guide

## Quick Start

1. **Copy environment template:**
   ```bash
   cp .env.example .env
   ```

2. **Fill in your values in `.env`:**
   ```env
   PUBLIC_SITE_URL=https://your-actual-domain.com
   PUBLIC_GITHUB_REPO=yourusername/yourrepo
   PUBLIC_UMAMI_URL=https://your-umami-instance.com/script.js
   PUBLIC_UMAMI_WEBSITE_ID=your-website-id
   ```

3. **Test locally:**
   ```bash
   npm run dev
   ```

4. **Build and preview:**
   ```bash
   npm run build
   npm run preview
   ```

## Deployment Platforms

### GitHub Pages

1. Create `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy to GitHub Pages
   
   on:
     push:
       branches: [main]
   
   permissions:
     contents: read
     pages: write
     id-token: write
   
   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: actions/setup-node@v4
           with:
             node-version: 20
         - run: npm ci
         - run: npm run build
           env:
             PUBLIC_SITE_URL: ${{ secrets.PUBLIC_SITE_URL }}
             PUBLIC_GITHUB_REPO: ${{ secrets.PUBLIC_GITHUB_REPO }}
             PUBLIC_UMAMI_URL: ${{ secrets.PUBLIC_UMAMI_URL }}
             PUBLIC_UMAMI_WEBSITE_ID: ${{ secrets.PUBLIC_UMAMI_WEBSITE_ID }}
         - uses: actions/upload-pages-artifact@v3
           with:
             path: ./dist
     
     deploy:
       needs: build
       runs-on: ubuntu-latest
       environment:
         name: github-pages
         url: ${{ steps.deployment.outputs.page_url }}
       steps:
         - uses: actions/deploy-pages@v4
           id: deployment
   ```

2. Add secrets in **Settings > Secrets and variables > Actions**

### Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Deploy: `vercel`
3. Add environment variables in **Project Settings > Environment Variables**
4. Redeploy: `vercel --prod`

### Netlify

1. Connect repository in Netlify dashboard
2. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Add environment variables in **Site settings > Build & deploy > Environment**

### Cloudflare Pages

1. Connect repository in Cloudflare dashboard
2. Build settings:
   - Build command: `npm run build`
   - Output directory: `dist`
3. Add environment variables in **Settings > Environment variables**

## Security Checklist

- ✅ `.env` is in `.gitignore` (never commit secrets)
- ✅ `.env.example` has placeholder values only
- ✅ All sensitive values use environment variables
- ✅ Analytics only loads if configured (no hardcoded IDs)
- ✅ GitHub repo references are configurable

## Troubleshooting

**Build fails with "undefined" errors:**
- Ensure all required env vars are set in your deployment platform
- Check `.env.example` for required variables

**Analytics not loading:**
- Verify `PUBLIC_UMAMI_URL` and `PUBLIC_UMAMI_WEBSITE_ID` are set
- Check browser console for errors
- Ensure Partytown integration is working

**GitHub links point to wrong repo:**
- Update `PUBLIC_GITHUB_REPO` in your environment variables
- Redeploy to pick up changes
