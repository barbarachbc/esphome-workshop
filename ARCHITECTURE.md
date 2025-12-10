# ESPHome Workshop - Architecture

**Last Updated:** December 10, 2025

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
    │   └── Footer.astro
    ├── config.ts                # Site configuration (GitHub repo, etc.)
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
- `Footer.astro` - Site-wide footer with links and build date

**Code Block Enhancement:**
Client-side copy button added to all code blocks via JavaScript in `Layout.astro` - hover to reveal, click to copy with visual feedback.

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

## Future Considerations

### Potential Enhancements

1. **RSS feeds** - Auto-generate from changelog
2. **Image optimization** - Astro Image integration for automatic resizing/format conversion
3. **Comment system** - Consider https://community.home-assistant.io/c/esphome/

---

**For implementation guidelines, see [CONTRIBUTING.md](./CONTRIBUTING.md)**  
**For project vision, see [PROJECT.md](./PROJECT.md)**
