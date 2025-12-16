# ESPHome Workshop - Architecture

**Last Updated:** December 11, 2025

This document describes the architecture, design decisions, and implementation patterns for the ESPHome Workshop documentation site.

---

## Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [Content Architecture](#content-architecture)
- [UI Components](#ui-components)
- [Design System](#design-system)
- [Search & Filtering](#search--filtering)
- [Future Considerations](#future-considerations)

---

## Overview

**ESPHome Workshop** is a personal documentation site for tracking electronic devices, ESPHome components, projects, and knowledge notes. The architecture emphasizes:

- **Content-first approach** - All data stored in markdown files with YAML frontmatter
- **Type-safe schemas** - Content validated at build time
- **Auto-computed state** - Device status derived from project usage
- **Cross-referenced content** - Slug-based relationships between collections
- **Static generation** - Pre-rendered at build time for performance

**Technology:** Static site built with Astro 5.x, TypeScript, Tailwind CSS v4, and Zod schemas.

**Dev Mode:** Custom Astro integration injects dev-only test pages that don't get deployed in production builds.

---

## Project Structure

```
esphome-docs/
├── .github/
│   └── copilot-instructions.md  # GitHub Copilot guidelines
├── ARCHITECTURE.md              # This file
├── PROJECT.md                   # Vision and goals
├── CONTRIBUTING.md              # Contributing guidelines
├── README.md                    # Getting started guide
├── astro.config.mjs             # Astro configuration
├── package.json                 # Dependencies
├── tsconfig.json                # TypeScript configuration
├── public/
│   └── images/
│       ├── devices/             # Device photos
│       ├── projects/            # Wiring diagrams
│       └── components/          # Component illustrations
└── src/
    ├── components/              # Reusable UI components
    │   ├── DeviceCard.astro
    │   ├── ComponentCard.astro
    │   ├── ProjectCard.astro
    │   ├── NoteCard.astro
    │   ├── FilterPanel.astro
    │   ├── TableOfContents.astro
    │   ├── IssueReportButton.astro
    │   ├── LastModified.astro
    │   ├── ThemeToggle.astro
    │   ├── Lightbox.astro
    │   └── Footer.astro
    ├── config.ts                # Site configuration (GitHub repo, etc.)
    ├── integrations/
    │   └── test_pages.ts        # Dev-mode test page injection
    ├── content/
    │   ├── config.ts            # Content collection schemas (Zod)
    │   ├── devices/             # Device markdown files
    │   ├── components/          # Component markdown files
    │   ├── projects/            # Project markdown files
    │   └── notes/               # Notes/guides markdown files
    ├── layouts/
    │   └── Layout.astro         # Base layout (header, nav, footer)
    ├── pages/                   # Route pages (file-based routing)
    │   ├── index.astro          # Homepage
    │   ├── about.astro          # About page
    │   ├── devices/
    │   │   ├── index.astro      # Devices listing
    │   │   └── [slug].astro     # Device detail page
    │   ├── components/
    │   │   ├── index.astro
    │   │   └── [slug].astro
    │   ├── projects/
    │   │   ├── index.astro
    │   │   └── [slug].astro
    │   └── notes/
    │       ├── index.astro
    │       └── [slug].astro
    ├── styles/
    │   └── global.css           # Global styles, theme variables
    └── utils/
        ├── changelog.ts         # Changelog aggregation utilities
        └── filterPills.ts       # Shared filtering utilities (pills + initializeFilters)
```

---

## Content Architecture

Content Collections provide type-safe, validated content management via Zod schemas in `src/content/config.ts`.

**Collections:**
- **Devices:** Physical hardware (boards, sensors, displays, etc.)
- **Components:** ESPHome software components/platforms
- **Projects:** Complete builds combining devices and components
- **Notes:** Guides, troubleshooting, setup instructions

**Cross-Collection References:**
Collections reference each other via slug-based relationships:

```typescript
// Projects reference devices and components by slug
{ devices: ['esp32-devkit-v1', 'bme280'], components: ['i2c', 'sensor'] }
```

**Device Status Computation:**
Device status is computed dynamically at build time based on project usage:

1. `'ready'` + used in completed project → shows as `'deployed'`
2. `'ready'` + used in in-progress project → shows as `'active'`
3. Manual status (`'testing'`, `'deployed'`, `'retired'`) is **never overridden**
4. Unused devices retain their manual status

---

## UI Components

### Core Components

**Layout** (`src/layouts/Layout.astro`) - Base page wrapper with header, nav, footer, and theme system

**Card Components** - Consistent item display across listing pages:
- `DeviceCard.astro` - Device info with status badges and connection types
- `ProjectCard.astro` - Project info with status and difficulty badges
- `ComponentCard.astro` - Component info with category badges
- `NoteCard.astro` - Note info with category and difficulty badges

**Utility Components:**
- `ShowcaseCarousel.astro` - Featured content carousel on homepage (auto-rotating, manual navigation)
- `TableOfContents.astro` - Auto-generated page navigation (sticky sidebar, active section highlighting)
- `LastModified.astro` - Content freshness indicator with color-coded age badges
- `IssueReportButton.astro` - Pre-filled GitHub issue reporting
- `ThemeToggle.astro` - Dark/light mode switcher with localStorage persistence
- `FilterPanel.astro` - Reusable filter UI with search box and active filter pills
- `Lightbox.astro` - Image viewer modal with navigation and keyboard controls
- `Footer.astro` - Site-wide footer with links and build date

**Interactive Enhancements:**
- **Code Block Enhancement:** Client-side copy button added to all code blocks via JavaScript in `Layout.astro` - hover to reveal, click to copy with visual feedback
- **Image Lightbox:** Click any markdown image to view fullscreen with navigation controls (arrows/keyboard), automatic image cycling

---

## Design System

### Theme System

All colors use CSS Custom Properties defined in `src/styles/global.css`:

```css
:root {
  --bg-primary: #ffffff;
  --text-primary: #1f2937;
  --text-link: #2563eb;
  --accent-blue: #2563eb;
  /* ... more variables */
}

.dark {
  --bg-primary: #0f172a;
  --text-primary: #f1f5f9;
  --accent-blue: #3b82f6;
  /* ... dark overrides */
}
```

**Dark Mode Toggle:** Checks localStorage → system preference → applies `.dark` class to `<html>` → persists choice.

### Badge System

All badges use reusable CSS classes with theme-aware colors:

**7 Badge Types:**
1. **Status** - `.status-badge-{status}` - Device/project status (ready, testing, active, deployed, etc.)
2. **Difficulty** - `.difficulty-badge-{level}` - Project/note difficulty (beginner, intermediate, advanced)
3. **Category** - `.category-badge-{color}` - Content categories (purple, blue, emerald variants)
4. **Tag** - `.tag-badge` - Content tags
5. **Connection** - `.connection-badge` - Device connection types (I2C, SPI, UART)
6. **Filter Pills** - `.filter-pill-{color}` - Active filters (blue, emerald, amber variants)
7. **Freshness** - `.freshness-badge-{state}` - Content age (fresh <30d, recent 30-180d, old >180d)

**Design Principles:**
- All colors use CSS variables (no hardcoded `bg-blue-600` or `text-gray-800`)
- Automatic dark mode support via variable overrides
- Consistent spacing via Tailwind `@apply` directives

---

## Search & Filtering

## Search & Filtering

### Search (Pagefind)

- Full-text search across all content types
- Automatic indexing at build time (~1KB/page overhead)
- Built-in filters by content type, category, status
- Zero external dependencies, privacy-friendly
- Search page: `src/pages/search.astro`

### Filtering System

**Shared Architecture:**
- `FilterPanel.astro` - Reusable filter UI component
- `filterPills.ts` - Utilities for filter management and active pill display

**Filter Pages:**
1. **Devices** - Category, status, tags (custom 3-column layout)
2. **Components** - Category, tags (uses FilterPanel)
3. **Projects** - Age-based, tags (uses FilterPanel)
4. **Notes** - Age-based, tags (uses FilterPanel)

**Features:**
- Collapsible filter panels with search
- Active filter pills with individual removal
- Results counter and clear all button
- Client-side filtering via data attributes
- OR logic within filter type, AND logic between types

---

## Integrations

### Test Pages Integration (`src/integrations/test_pages.ts`)

Custom Astro integration that injects dev-only pages during development, excluded from production builds:

- **Dev Mode:** Routes injected when running `npm run dev`
- **Build Mode:** Routes excluded when building for production
- **Example:** Theme designer at `/theme-designer`

**How it works:**
1. Test page files start with underscore: `src/pages/_theme-designer.astro` so astro will ignore them for build.
2. Integration checks if `params.command === 'dev'`
3. Routes are injected using `injectRoute()`
4. Production build ignores this integration entirely

Use for UI experimentation and design testing without affecting the published site.

---

## Lightbox Implementation

### Image Viewer Component

**Component:** `src/components/Lightbox.astro`  
**Styles:** `src/styles/global.css` (`.lightbox-*` classes)

The lightbox provides an interactive image viewing experience for all markdown images:

**Features:**
- 🖱️ **Click to view** - Click any markdown image to open in fullscreen modal
- ⌨️ **Keyboard navigation** - Arrow keys (prev/next), Escape (close)
- 🔄 **Image cycling** - Navigate through all images on the page
- 🎯 **Click outside to close** - Click overlay background to dismiss
- ♿ **Accessibility** - ARIA labels, focus management, focus trap
- 📱 **Responsive** - 90vw × 90vh container with proper sizing

**How it works:**
1. Automatically detects all Astro-optimized images (`data-image-component="true"`) **This is not working**
  1. `data-image-component` is not emitted when generating static website for deployment
  1. changed slug templates to set id for the wrapper container around content: `_markdown_wrapper`
  1. all images in this container are then used
2. Makes images clickable with cursor and keyboard support
3. Opens modal overlay when clicked
4. Copies image's `srcset` and `sizes` attributes to lightbox
5. Browser automatically selects optimal resolution for large container
6. Allows navigation between all images on the page

**Browser-native optimization:**
The lightbox leverages the browser's built-in responsive image selection by copying the original image's `srcset` attribute. When displayed in the 90vw × 90vh container, the browser automatically requests the highest appropriate resolution from Astro's generated image variants.

**Styling:**
All lightbox styles are centralized in `global.css` under the `LIGHTBOX STYLES` section, making them easy to customize and maintain. Dark mode is fully supported with enhanced background opacity.

---

## Markdown Processing

#### External Links
- The `rehype-external-links` plugin is used to process external links in Markdown files.
- Configuration for this plugin can be found in `astro.config.mjs` under the `markdown.rehypePlugins` section.

---

## Future Considerations

### Potential Enhancements

1. **RSS feeds** - Auto-generate from changelog
2. **Comment system** - Consider https://community.home-assistant.io/c/esphome/
3. **Lightbox enhancements** - Touch swipe gestures, pinch-to-zoom, loading indicators

---

## Configuration & Deployment

### Environment Variables

The site uses environment variables for sensitive configuration. See `.env.example` for all available options.

**Required for deployment:**
- `PUBLIC_SITE_URL` - Your site's public URL
- `PUBLIC_GITHUB_REPO` - GitHub repository (username/repo)

**Optional analytics:**
- `PUBLIC_UMAMI_URL` - Umami analytics script URL
- `PUBLIC_UMAMI_WEBSITE_ID` - Umami website identifier

**Local development:**
```bash
# Copy template and fill in your values
cp .env.example .env
```

**Deployment platforms:**
- **GitHub Actions:** Set in repository secrets
- **Vercel/Netlify:** Set in project settings > Environment Variables
- **Cloudflare Pages:** Set in project settings > Variables

All `PUBLIC_*` variables are accessible in both server and client code. The analytics scripts only load if their respective environment variables are configured.

---

## Sitemap and Robots.txt Integration

#### Sitemap
- The `@astrojs/sitemap` integration has been added to the project.
- The sitemap is automatically generated during the build process and is available at `/sitemap-index.xml`.
- Ensure the `PUBLIC_SITE_URL` environment variable is set correctly in the `.env` file to generate accurate URLs in the sitemap.

#### Robots.txt
- A dynamic `robots.txt` file is generated at `/robots.txt`.
- The `robots.txt` file references the sitemap URL dynamically based on the `PUBLIC_SITE_URL` value.
- The implementation can be found in `src/pages/robots.txt.ts`.

#### Environment Variables
- The `vite` `loadEnv` function is used to load environment variables early in the build process.
- Ensure all required variables are defined in `.env` or the hosting platform's environment settings.

----

**For implementation guidelines, see [CONTRIBUTING.md](./CONTRIBUTING.md)**  
**For project vision, see [PROJECT.md](./PROJECT.md)**
