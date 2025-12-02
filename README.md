# My ESPHome Workshop

> A personal documentation and tracking site for my 15+ year collection of dev boards, sensors, and components as I finally build useful smart home projects with ESPHome. Built with Astro.

## 🏗️ Project Architecture

This project uses **Astro's Content Collections** to manage four interconnected types of documentation:

### Content Collections

#### 1. **Devices** (`src/content/devices/`)
Physical hardware components used in ESPHome projects.

**Schema:**
- `title` - Device name (e.g., "ESP32 DevKit V1")
- `description` - What the device is and what it does
- `category` - `board`, `sensor`, `display`, `actuator`, `peripheral`, `other`
- `manufacturer` - Brand/maker (optional)
- `model` - Model number (optional)
- `connectionTypes` - Array: `i2c`, `spi`, `uart`, `gpio`, `onewire`, `analog`, `pwm`, `built-in` (only connections used)
- `image` - Path to device image (optional)
- `purchaseLinks` - Array of vendor/URL objects (optional)
- `tags` - Array of strings for categorization (optional)
- **`status`** - **REQUIRED:** `unused`, `testing`, `deployed`, `retired`
- `notes` - Personal notes, stories, salvage info (optional)
- `dateAcquired` - When acquired, flexible format like "2015" or "early 2012" (optional)
- **`variants`** - Array of variant names for different board versions (optional)
- **`productionStatus`** - **REQUIRED:** `active`, `NRND` (not recommended for new designs), `discontinued`, `unknown` (default)
- **`references`** - Array of reference objects with `title` and `url` for additional info (optional)
- **`lastModified`** - ISO date (YYYY-MM-DD) when content was last updated (optional)
- **`lastVerified`** - ISO date (YYYY-MM-DD) when info was last verified accurate (optional)
- **`changelog`** - Array of changelog entries with `date`, `type` (added/updated/fixed), and `description` (optional)

**Example file:** `src/content/devices/esp32-devkit-v1.md`

---

#### 2. **Components** (`src/content/components/`)
ESPHome software components and platforms.

**Schema:**
- `title` - Component name
- `description` - What the component does
- `category` - `sensor`, `binary_sensor`, `switch`, `light`, `climate`, `cover`, `fan`, `text_sensor`, `platform`, `other`
- `esphomeComponent` - The ESPHome YAML component name (e.g., `gpio`, `bme280`)
- `documentation` - Link to official ESPHome docs (optional)
- `requiresHardware` - Boolean (default: false)
- `relatedDevices` - Array of device slugs (optional)
- `tags` - Array of strings (optional)
- **`lastModified`** - ISO date (YYYY-MM-DD) when content was last updated (optional)
- **`lastVerified`** - ISO date (YYYY-MM-DD) when info was last verified accurate (optional)
- **`changelog`** - Array of changelog entries with `date`, `type` (added/updated/fixed), and `description` (optional)

**Example file:** `src/content/components/i2c.md`

---

#### 3. **Projects** (`src/content/projects/`)
Complete projects combining devices and components.

**Schema:**
- `title` - Example project name
- `description` - What the example demonstrates
- `difficulty` - `beginner`, `intermediate`, `advanced`
- `devices` - Array of device slugs (e.g., `['esp32-devkit-v1', 'bme280']`)
- `components` - Array of component slugs (e.g., `['i2c', 'sensor']`)
- `image` - Path to wiring diagram/photo (optional)
- `tags` - Array of strings (optional)
- **`status`** - **REQUIRED:** `idea`, `in-progress`, `completed`, `abandoned`
- `dateStarted` - When project started (optional)
- `dateCompleted` - When project finished (optional)
- `motivation` - Why this project matters (optional)
- **`lastModified`** - ISO date (YYYY-MM-DD) when content was last updated (optional)
- **`lastVerified`** - ISO date (YYYY-MM-DD) when info was last verified accurate (optional)
- **`changelog`** - Array of changelog entries with `date`, `type` (added/updated/fixed), and `description` (optional)

**Example file:** `src/content/projects/temperature-monitor.md`

---

#### 4. **Notes** (`src/content/notes/`)
Setup guides, networking tricks, and lessons learned - non-device-specific knowledge.

**Schema:**
- `title` - Note/guide title
- `description` - What the note covers
- `category` - `setup`, `networking`, `development`, `home-assistant`, `troubleshooting`, `custom-components`, `other`
- `difficulty` - `beginner`, `intermediate`, `advanced` (optional)
- `tags` - Array of strings (optional)
- `lastUpdated` - When last updated (optional)
- **`lastModified`** - ISO date (YYYY-MM-DD) when content was last updated (optional)
- **`lastVerified`** - ISO date (YYYY-MM-DD) when info was last verified accurate (optional)
- **`changelog`** - Array of changelog entries with `date`, `type` (added/updated/fixed), and `description` (optional)

**Example file:** `src/content/notes/mdns-docker-setup.md`

---

## 📁 Directory Structure

```
esphome-docs/
├── astro.config.mjs          # Astro configuration with MDX
├── package.json              # Dependencies
├── tsconfig.json             # TypeScript config
├── public/                   # Static assets (images, icons)
│   └── images/
│       ├── devices/          # Device photos
│       ├── projects/         # Wiring diagrams
│       └── components/       # Component illustrations
├── src/
│   ├── components/           # Reusable Astro components
│   │   ├── DeviceCard.astro
│   │   ├── ComponentCard.astro
│   │   ├── ProjectCard.astro
│   │   ├── NoteCard.astro
│   │   ├── TableOfContents.astro
│   │   ├── IssueReportButton.astro
│   │   ├── LastModified.astro
│   │   ├── Footer.astro
│   │   └── CodeBlock.astro
│   ├── config.ts             # Site configuration (GitHub repo, etc.)
│   ├── content/
│   │   ├── config.ts         # Content collection schemas
│   │   ├── devices/          # Device markdown files
│   │   ├── components/       # Component markdown files
│   │   ├── projects/         # Project markdown files
│   │   └── notes/            # Notes/guides markdown files
│   ├── layouts/
│   │   └── Layout.astro      # Base layout with header/nav/footer
│   ├── utils/
│   │   └── changelog.ts      # Changelog aggregation utilities
│   └── pages/
│       ├── index.astro       # Homepage
│       ├── about.astro       # About page with site info
│       ├── devices/
│       │   ├── index.astro   # Devices listing
│       │   └── [slug].astro  # Individual device page
│       ├── components/
│       │   ├── index.astro   # Components listing
│       │   └── [slug].astro  # Individual component page
│       ├── projects/
│       │   ├── index.astro   # Projects listing
│       │   └── [slug].astro  # Individual project page
│       └── notes/
│           ├── index.astro   # Notes listing
│           └── [slug].astro  # Individual note page
```

---

## 🔗 Content Relationships

The four collections are interconnected:

- **Projects** reference both **Devices** and **Components** via slugs
- **Components** can reference related **Devices**
- **Notes** are standalone knowledge articles
- Cross-linking is automatic through Astro's content collections

**Example flow:**
1. A project "Temperature Monitor" lists devices: `['esp32-devkit-v1', 'bme280']`
2. It also lists components: `['i2c', 'sensor']`
3. Detail pages automatically link to these related items
4. Users can navigate from project → device → other projects using that device
5. Device pages show status badges (unused, testing, deployed, retired)

---

## ✍️ Writing Content

### Creating a New Device

1. Create `src/content/devices/device-slug.md`
2. Add frontmatter:
```yaml
---
title: "Device Name"
description: "What it does"
category: "sensor"
manufacturer: "Bosch"
model: "BME280"
connectionTypes: ["i2c"]  # Only connections you actually used
tags: ["temperature", "humidity", "pressure"]
status: "unused"  # REQUIRED: unused, testing, deployed, or retired
productionStatus: "active"  # REQUIRED: active, NRND, discontinued, or unknown (default)
notes: "Bought in 2015, finally time to use it!"  # optional
dateAcquired: "2015"  # optional
variants: ["BME280 3.3V", "BME280 5V"]  # optional
references:  # optional
  - title: "Datasheet"
    url: "https://example.com/datasheet.pdf"
  - title: "Tutorial"
    url: "https://example.com/tutorial"
---
```
3. Write markdown content describing the device, pinouts, specifications

### Creating a New Component

1. Create `src/content/components/component-slug.md`
2. Add frontmatter:
```yaml
---
title: "Component Name"
description: "What it does in ESPHome"
category: "platform"
esphomeComponent: "i2c"
documentation: "https://esphome.io/components/i2c.html"
requiresHardware: false
---
```
3. Write markdown explaining configuration options

### Creating a New Project

1. Create `src/content/projects/project-slug.md`
2. Add frontmatter:
```yaml
---
title: "Example Project Name"
description: "What you'll build"
difficulty: "beginner"
devices: ["esp32-devkit-v1", "bme280"]
components: ["i2c", "sensor"]
tags: ["weather", "monitoring"]
status: "completed"  # REQUIRED: idea, in-progress, completed, or abandoned
dateStarted: "November 2025"  # optional
dateCompleted: "November 2025"  # optional
motivation: "Finally using that sensor from 2015!"  # optional
---
```
3. Write markdown with:
   - What you'll need
   - Wiring instructions
   - Complete YAML configuration
   - Troubleshooting tips

### Creating a New Note

1. Create `src/content/notes/note-slug.md`
2. Add frontmatter:
```yaml
---
title: "Setting up mDNS in Docker"
description: "How to configure Docker networking for ESPHome device discovery"
category: "networking"
difficulty: "intermediate"  # optional
tags: ["docker", "mdns", "networking"]  # optional
lastUpdated: "November 2025"  # optional
---
```
3. Write markdown with setup instructions, troubleshooting, lessons learned

---

## 🎨 Styling & Components

### Reusable Card Components

The project includes four reusable card components for consistent display across listing pages:

1. **`DeviceCard.astro`** - Displays device information
   - Props: `device` object with slug and data
   - Shows: title, category, manufacturer, description, connection types, **status badge**
   - Used in: `/devices` listing page and homepage stats card

2. **`ComponentCard.astro`** - Displays component information
   - Props: `component` object with slug and data
   - Shows: title, category, esphomeComponent name, description, hardware badge
   - Used in: `/components` listing page

3. **`ProjectCard.astro`** - Displays projects
   - Props: `project` object with slug and data
   - Shows: title, difficulty badge, description, device/component counts, **status badge**
   - Used in: `/projects` listing page and homepage stats card

4. **`NoteCard.astro`** - Displays notes/guides
   - Props: `note` object with slug and data
   - Shows: title, category badge, difficulty badge, description
   - Used in: `/notes` listing page

5. **`IssueReportButton.astro`** - GitHub issue reporting
   - Props: `pageType`, `pageTitle`, `pageSlug`
   - Generates pre-filled GitHub issue link
   - Used on: All content detail pages

6. **`LastModified.astro`** - Content freshness indicator
   - Props: `date`, `verified`
   - Displays last modified/verified dates with color-coded freshness
   - Used on: All content detail pages

7. **`TableOfContents.astro`** - In-page navigation (Phase 7)
   - Props: `headings` array from Astro's `render()` API
   - Generates hierarchical table of contents from H2-H4 headings
   - Features: Active section highlighting, smooth scroll, sticky sidebar (desktop), collapsible (mobile)
   - Used on: Device, project, and note detail pages (when 3+ headings present)

8. **`Footer.astro`** - Site-wide footer
   - Shows: Navigation links, community links, build date
   - Used in: `Layout.astro` on all pages

### Homepage Features (Session 3)

The homepage (`/`) includes:
- **Personal hero section** with rotating taglines on each page load
- **Devices & Projects cards** with integrated statistics showing counts and breakdowns
- **Random Device Picker** with horizontal layout (title left, details right)
- **Quick navigation** to Components and Notes sections
- Clean, compact design emphasizing Devices and Projects

### Design System

- CSS is in `Layout.astro` using CSS custom properties
- Design system variables:
  - `--accent`: Primary blue
  - `--text`: Dark gray text
  - `--background`: White
  - `--border`: Light gray borders

---

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

---

## 📝 AI Prompt Guidelines

When asking AI to help with this project:

### Context to Provide
- "This is a personal ESPHome workshop tracking site built with Astro"
- "Four collections: devices (hardware with status tracking), components (ESPHome software), projects (with status tracking), notes (guides/lessons)"
- "Collections are interconnected via slug references"
- "Devices and projects have required status fields for tracking usage"

### Common Tasks

**Adding new content:**
> "Add a new device for [device name]. It's a [category] that connects via [connection type]."

**Creating pages:**
> "Create a listing page at /devices that shows all devices with filtering by category and connection type."

**Cross-referencing:**
> "On the project detail page, display cards for all referenced devices and components."

**Styling:**
> "Add a card component for devices that shows the title, category badge, and connection types."

### Project Conventions
- Use `.astro` files for pages and components
- Use `.md` or `.mdx` for content
- Always include proper TypeScript types
- Keep schemas in `src/content/config.ts`
- Store images in `public/images/[collection-name]/`
- Use slug-based references between collections

---

## 🎯 Key Features

- ✅ Type-safe content with Zod schemas
- ✅ Personal device inventory tracking (unused, testing, deployed, retired)
- ✅ Production status tracking (active, NRND, discontinued, unknown)
- ✅ Device variants support for different board versions
- ✅ Clickable connection type tags linking to component pages
- ✅ Reference links for datasheets and additional resources
- ✅ Project status tracking (idea, in-progress, completed, abandoned)
- ✅ **Notes collection for lessons learned and setup guides** (Session 2 ✅)
- ✅ **Personal homepage with integrated stats and random device picker** (Session 3 ✅)
  - Stats embedded in Devices and Projects cards
  - Random device suggestion with horizontal layout
  - Random rotating hero description for personality
- ✅ **Enhanced components with status badges** (Session 4 ✅)
  - Status badges on all device and project cards
  - Automatic status detection based on project usage
  - Device detail pages show "Used in Projects" with collapsible section
  - Project detail pages display dates and motivation
  - Smart status override: manual testing/deployed/retired status preserved
- ✅ **Navigation & polish** (Session 5 ✅)
  - Consistent site branding as "My ESPHome Workshop"
  - Complete navigation with Notes section
  - Standardized page titles throughout
- ✅ **Community & documentation features** (Session 6 ✅)
  - GitHub issue reporting from all content pages
  - About page with usage guides and status explanations
  - What's New section with manual changelog system
  - Last modified/verified dates on all content
  - Site-wide footer with navigation and build date
  - GitHub link in header
- 🚧 **In-page navigation** (Phase 7 in progress)
  - ✅ Automatic table of contents component created
  - ✅ Smooth scroll behavior with motion preference support
  - ✅ Device detail pages with two-column layout and sticky ToC sidebar
  - ✅ Notes detail pages with integrated ToC
  - ✅ Active section highlighting with Intersection Observer
  - Projects pages integration (pending)
  - Component pages integration (optional, pending)
- ✅ Automatic routing via file-based pages
- ✅ MDX support for rich content
- ✅ Syntax highlighting for YAML/code
- ✅ Cross-referenced content
- ✅ Static site generation (fast, SEO-friendly)

---

## 📚 Tech Stack

- **Framework:** Astro 5.x
- **Content:** Markdown/MDX with Astro Content Collections
- **Styling:** Native CSS (no framework)
- **Type Safety:** TypeScript with Zod
- **Build:** Vite (via Astro)

---

## 🔮 Future Enhancements

- [ ] Search functionality (Pagefind or Algolia)
- [ ] Dark mode toggle
- [ ] Interactive wiring diagrams
- [ ] ESPHome YAML validator
- [ ] User-contributed projects
- [ ] RSS feed for new projects
- [ ] Print-friendly layouts

---

## 👀 Want to learn more?

Feel free to check [Astro documentation](https://docs.astro.build) or join the [Discord server](https://astro.build/chat).
