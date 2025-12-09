# ESPHome Workshop - Architecture

**Last Updated:** December 9, 2025

This document describes the project-specific architecture, design decisions, and organizational patterns for the ESPHome Workshop documentation site.

---

## Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [Content Architecture](#content-architecture)
- [Data Relationships](#data-relationships)
- [Status Computation Logic](#status-computation-logic)
- [UI Components](#ui-components)
- [Design System](#design-system)
- [Key Design Decisions](#key-design-decisions)
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

Content Collections provide type-safe, validated content management. All content is stored in `src/content/` with schemas defined in `src/content/config.ts`.

### Content Collections (Summary)

- **Devices:** Physical hardware (boards, sensors, etc.)
- **Components:** ESPHome software components/platforms
- **Projects:** Complete builds combining devices/components
- **Notes:** Guides, troubleshooting, general notes

For full schema details, see [`src/content/config.ts`](src/content/config.ts).

## Data Relationships & Status Computation

### Cross-Collection References

Content collections are interconnected via **slug-based references**:

```typescript
// Project references devices and components by slug
{
  devices: ['esp32-devkit-v1', 'bme280'],
  components: ['i2c', 'sensor']
}
```

### Relationship Graph

```
┌─────────────┐
│   Project   │
└──────┬──────┘
       │ references (by slug)
       ├────────────────┬───────────────┐
       ▼                ▼               ▼
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│   Device    │  │   Device    │  │  Component  │
└─────────────┘  └─────────────┘  └──────┬──────┘
                                         │ references
                                         ▼
                                   ┌─────────────┐
                                   │   Device    │
                                   └─────────────┘
```

### Status Computation Logic

Device status is **computed dynamically** at build time based on project usage:

**Rules:**
1. If device status is `'ready'` and used in a `'completed'` project → show as `'deployed'`
2. If device status is `'ready'` and used in an `'in-progress'` project → show as `'active'`
3. If device status is manually set to `'testing'`, `'deployed'`, `'active'`, or `'retired'` → **never override**
4. Devices not in any projects remain at their manual status

---

## UI Components

### Layout Component (`src/layouts/Layout.astro`)

**Purpose:** Base layout wrapper for all pages

**Responsibilities:**
- HTML document structure
- Header with site branding and GitHub link
- Navigation bar with theme toggle
- Footer
- Global styles injection

**Props:**
```typescript
interface Props {
  title: string;
}
```

---

### Card Components

Reusable card components for consistent item display across listing pages.

#### DeviceCard (`src/components/DeviceCard.astro`)

**Purpose:** Display device information in lists

**Props:**
```typescript
interface Props {
  device: {
    slug: string;
    data: DeviceSchema;
  };
  displayStatus?: 'ready' | 'testing' | 'active' | 'deployed' | 'retired' | 'pending' | 'unsupported';
}
```

**Features:**
- Shows status badge with color coding
- Displays category and connection types
- Clickable link to device detail page

---

#### ProjectCard (`src/components/ProjectCard.astro`)

**Purpose:** Display project information in lists

**Props:**
```typescript
interface Props {
  project: {
    slug: string;
    data: ProjectSchema;
  };
}
```

**Features:**
- Shows status badge (idea, in-progress, completed, abandoned)
- Displays difficulty level
- Shows device/component counts

---

#### ComponentCard (`src/components/ComponentCard.astro`)

**Purpose:** Display component information in lists

**Props:**
```typescript
interface Props {
  component: {
    slug: string;
    data: ComponentSchema;
  };
}
```

---

#### NoteCard (`src/components/NoteCard.astro`)

**Purpose:** Display note/guide information in lists

**Props:**
```typescript
interface Props {
  note: {
    slug: string;
    data: NoteSchema;
  };
}
```

---

#### ShowcaseCarousel (`src/components/ShowcaseCarousel.astro`)

**Purpose:** Featured content carousel on homepage

**Props:**
```typescript
interface Props {
  items?: Array<{
    type: 'device' | 'project' | 'note';
    slug: string;
    data: any;
  }>;
  autoPlayInterval?: number; // Default: 5000ms
}
```

**Features:**
- Auto-rotating carousel with manual navigation
- Supports devices, projects, and notes
- Previous/Next buttons
- Dot indicators for navigation
- Pause on hover
- Responsive layout
- Smooth transitions

**Usage on Homepage:**
```typescript
const showcase = [
  { type: 'device', slug: 'gc9a01-round-lcd' },
  { type: 'project', slug: 'info-panel-28' },
  { type: 'note', slug: 'mdns-docker-setup' },
];
```

---

### Utility Components

#### TableOfContents (`src/components/TableOfContents.astro`)

**Purpose:** Auto-generate in-page navigation from markdown headings

**Props:**
```typescript
interface Props {
  headings: { depth: number; slug: string; text: string; }[];
  minDepth?: number;
  maxDepth?: number;
}
```

**Features:**
- Conditional rendering (only shows if 3+ headings)
- Sticky sidebar on desktop
- Collapsible on mobile
- Active section highlighting via Intersection Observer
- Smooth scroll behavior

---

#### IssueReportButton (`src/components/IssueReportButton.astro`)

**Purpose:** GitHub issue reporting from content pages

**Props:**
```typescript
interface Props {
  pageType: 'device' | 'component' | 'project' | 'note';
  pageTitle: string;
  pageSlug: string;
}
```

**Features:**
- Pre-fills GitHub issue with page context
- Opens in new tab
- Styled as secondary button

---

#### LastModified (`src/components/LastModified.astro`)

**Purpose:** Content freshness indicator

**Props:**
```typescript
interface Props {
  date?: string;
  verified?: string;
}
```

**Features:**
- Color-coded age indicator (green < 30 days, yellow 30-180, gray > 180)
- Shows last update and verification dates
- Conditional rendering

---

#### ThemeToggle (`src/components/ThemeToggle.astro`)

**Purpose:** Dark mode switcher

**Features:**
- System preference detection
- Manual toggle with localStorage persistence
- Animated icon transition
- Accessible button with ARIA labels

---

#### Footer (`src/components/Footer.astro`)

**Purpose:** Site-wide footer with links and metadata

**Features:**
- Navigation links
- Community links
- Build date display
- Responsive layout

---

### Code Block Features

#### Copy Button (Client-Side Enhancement)

**Purpose:** Enable users to copy code from code blocks

**Implementation:**
- Client-side JavaScript in `Layout.astro`
- Auto-detects all `<pre>` elements on page load
- Adds copy button to each code block

**Features:**
- Top-right corner positioning
- Hidden by default, appears on hover
- Copy icon (clipboard) → Checkmark icon on success
- "Copy" text → "Copied!" feedback
- Auto-resets after 2 seconds
- Only applies to multi-line code blocks (`<pre><code>`)
- Inline `<code>` elements unaffected
- Uses Clipboard API with error handling
- Themed styling (matches site design system)
- Dark mode support

**CSS Classes:**
- `.copy-code-button` - Base button styling
- `.copy-code-button.copied` - Success state styling

---

## Design System

### Theme Variables

All theme variables are defined in `src/styles/global.css` using CSS Custom Properties:

```css
:root {
  /* Background Colors */
  --bg-primary: #ffffff;
  --bg-card: #ffffff;
  --bg-hero: linear-gradient(to bottom right, #2563eb, #1d4ed8);
  
  /* Text Colors */
  --text-primary: #1f2937;
  --text-secondary: #6b7280;
  --text-link: #2563eb;
  
  /* Border Colors */
  --border-primary: #e5e7eb;
  --border-accent: #2563eb;
  
  /* Accent Colors */
  --accent-blue: #2563eb;
  --accent-emerald-light: #d1fae5;
  --accent-amber-light: #fef3c7;
  /* ... more accent colors */
}
```

### Dark Mode

Dark mode is implemented using a `.dark` class on the root element:

```css
.dark {
  --bg-primary: #0f172a;
  --text-primary: #f1f5f9;
  --accent-blue: #3b82f6;
  /* ... overrides for all theme variables */
}
```

**Dark Mode Toggle Logic:**
1. Check localStorage for saved preference
2. Fall back to system preference (`prefers-color-scheme`)
3. Apply `.dark` class to `<html>` element
4. Persist user choice to localStorage

### Status Badge Colors

Status badges use consistent color coding across the site:

**Device Statuses:**
- `ready` (📦) - Gray/red-light background
- `testing` (🧪) - Amber-light background
- `active` (🔧) - Orange-light background
- `deployed` (✅) - Emerald-light background
- `retired` (⏸️) - Gray background
- `pending` (🔦) - Purple-light background
- `unsupported` (🚫) - Pink-light background

**Project Statuses:**
- `idea` (💭) - Blue-light background
- `in-progress` (🛠️) - Orange-light background
- `completed` (✅) - Emerald-light background
- `abandoned` (⏸️) - Gray background

**Implementation:**
```css
.status-badge-deployed {
  background: var(--accent-emerald-light);
  color: var(--text-primary);
}
```

**Analytics**

Privacy-friendly, using self-hosted Umami analytics platform. Uses Partytown to offload analytics script to web worker.

---

### Search Functionality

**Implemented:** Pagefind static search (uses astro-pagefind integration)

**Features:**
- Full-text search across all content (devices, components, projects, notes)
- Automatic indexing at build time (`npx pagefind --site dist`)
- Built-in filters by content type (Type:Device, Type:Project, etc.)
- Category and status filters via `data-pagefind-filter` attributes
- ~1KB overhead per page
- Zero-config, privacy-friendly (no external dependencies)
- Highlighted search results with context
- Dark mode support via CSS custom properties

**Implementation details:**
- Search box on the home page
- Search page: `src/pages/search.astro`
- Pagefind indexing runs after Astro build via `npm run build`
- Content pages use `data-pagefind-body` and `data-pagefind-filter` attributes

---

### Advanced Filtering System

**Implemented:** Multi-criteria filtering across all listing pages (devices, components, projects, notes)

**Shared Components & Utilities:**

1. **`src/components/FilterPanel.astro`** - Reusable filter UI component
   - Generates collapsible filter panel with search box
   - Renders filter checkboxes with badge labels
   - Displays active filter pills inline with heading
   - Shows results counter and clear button
   - Fully configurable via props

2. **`src/utils/filterPills.ts`** - Comprehensive filtering utilities
   - `updateFilterPills()` - Creates and manages active filter pills
   - `initFilterDetailsArrow()` - Handles collapsible arrow animation
   - `initializeFilters()` - Complete filtering setup (event listeners, logic, pills)
   - Supports both single-value and array-value attributes
   - Configurable filter types with custom colors

**FilterPanel Component Props:**
```typescript
interface Filter {
  type: string;      // e.g., 'category', 'tag', 'age'
  value: string;     // Filter value
  label: string;     // Display label
}

interface Props {
  filters: Filter[];                    // Array of all filter options
  itemName: string;                     // e.g., 'components', 'projects', 'notes'
  searchPlaceholder: string;            // Search box placeholder text
  getBadgeLabel: (type: string) => string;  // Function to generate badge labels
}
```

**initializeFilters() Configuration:**
```typescript
interface FilterControlConfig {
  gridSelector: string;           // ID of grid containing cards
  resultCountId: string;          // ID of result counter element
  clearButtonId: string;          // ID of clear button
  searchInputId: string;          // ID of search input
  pillsContainerId: string;       // ID of pills container
  filters: Array<{
    name: string;                 // Filter name (e.g., 'category')
    selector: string;             // CSS selector for checkboxes
    attribute: {
      name: string;               // data-* attribute name
      isArray: boolean;           // true for comma-separated values
    };
    color: string;                // Pill background color
  }>;
}
```

**Common Features:**
- **Collapsible filter panel** - Expandable details element with animated arrow
- **Active filter pills** - Visual indicators inline with "Filters" heading
- **Pill removal** - Click "×" on any pill to remove that specific filter
- **Search box** - Filter the filter list by typing
- **Clear all button** - Quick reset of all filters
- **Results counter** - Shows number of matching items
- **Scrollable filter areas** - Max height with overflow for long lists
- **DRY architecture** - Single component and utility reused across all pages

---

#### Devices Page (`src/pages/devices/index.astro`)

**Filter Types:**
- **Category** (blue pills) - board, sensor, display, actuator, etc.
- **Status** (green pills) - ready, testing, active, deployed, retired, pending, unsupported
- **Tags** (amber pills) - User-defined tags

**Layout:** 3-column grid for filter controls

**Filter Logic:**
- Multiple selections within same type = OR logic
- Selections across types = AND logic
- Empty selection = show all

**Note:** Devices page uses custom filter UI (not FilterPanel component) due to 3-column layout

---

#### Components Page (`src/pages/components/index.astro`)

**Filter Types:**
- **Category** (blue pills) - core, i2c, spi, sensor, display, etc.
- **Tags** (amber pills) - User-defined tags

**Layout:** Single combined list (categories + tags)

**Implementation:**
- Uses `<FilterPanel>` component
- Uses `initializeFilters()` from filterPills.ts
- Configuration: category (non-array) + tags (array)

**Filter Logic:**
- Multiple selections within same type = OR logic
- Category AND tag filters work together (AND logic between types)

---

#### Projects Page (`src/pages/projects/index.astro`)

**Filter Types:**
- **Recently Updated** (blue pills):
  - Recently updated (last 30 days)
  - Updated 1-3 months ago (31-90 days)
  - Updated 3-12 months ago (91-365 days)
  - Not updated in over a year (365+ days)
- **Tags** (amber pills) - User-defined tags

**Layout:** Single combined list (age filters first, then tags alphabetically)

**Implementation:**
- Uses `<FilterPanel>` component
- Uses `initializeFilters()` from filterPills.ts
- Configuration: age (non-array) + tags (array)
- Age calculated client-side from `lastModified` field

**Filter Logic:**
- Age filters are mutually exclusive timeframes
- Tags work with OR logic
- Age AND tag filters work together (AND logic between types)

---

#### Notes Page (`src/pages/notes/index.astro`)

**Filter Types:**
- **Recently Updated** (blue pills):
  - Recently updated (last 30 days)
  - Updated 1-3 months ago (31-90 days)
  - Updated 3-12 months ago (91-365 days)
  - Not updated in over a year (365+ days)
- **Tags** (amber pills) - User-defined tags

**Layout:** Single combined list (age filters first, then tags alphabetically)

**Implementation:**
- Uses `<FilterPanel>` component
- Uses `initializeFilters()` from filterPills.ts
- Configuration: age (non-array) + tags (array)
- Age calculated client-side from `lastUpdated` field

**Filter Logic:** Same as projects page

---

**Implementation Details:**
- Uses data attributes on cards (`data-category`, `data-status`, `data-tags`, `data-age`)
- Client-side filtering via vanilla JavaScript
- FilterPanel eliminates ~70 lines of duplicate HTML per page
- initializeFilters() eliminates ~80 lines of duplicate JavaScript per page
- Pills auto-update when filters change
- Filter state resets on "Clear All" button click

**Future Enhancements:**
- URL query parameters for shareable filter states
- Consider extracting devices page to use FilterPanel (requires multi-column layout support)

---

## Future Considerations

### Potential Enhancements

1. **RSS feeds** - Auto-generate from changelog
2. **Image optimization** - Astro Image integration for automatic resizing/format conversion
3. **Comment system** - Consider https://community.home-assistant.io/c/esphome/

---

**For implementation guidelines, see [CONTRIBUTING.md](./CONTRIBUTING.md)**  
**For project vision, see [PROJECT.md](./PROJECT.md)**
