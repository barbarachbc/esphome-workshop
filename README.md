# ESPHome Documentation Site

> A comprehensive documentation website for ESPHome devices, components, and example projects built with Astro.

## 🏗️ Project Architecture

This project uses **Astro's Content Collections** to manage three interconnected types of documentation:

### Content Collections

#### 1. **Devices** (`src/content/devices/`)
Physical hardware components used in ESPHome projects.

**Schema:**
- `title` - Device name (e.g., "ESP32 DevKit V1")
- `description` - What the device is and what it does
- `category` - `board`, `sensor`, `display`, `actuator`, `peripheral`, `other`
- `manufacturer` - Brand/maker (optional)
- `model` - Model number (optional)
- `connectionTypes` - Array: `i2c`, `spi`, `uart`, `gpio`, `onewire`, `analog`, `pwm`, `built-in`
- `image` - Path to device image (optional)
- `purchaseLinks` - Array of vendor/URL objects (optional)
- `tags` - Array of strings for categorization (optional)

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

**Example file:** `src/content/components/i2c.md`

---

#### 3. **Examples** (`src/content/examples/`)
Complete projects combining devices and components.

**Schema:**
- `title` - Example project name
- `description` - What the example demonstrates
- `difficulty` - `beginner`, `intermediate`, `advanced`
- `devices` - Array of device slugs (e.g., `['esp32-devkit-v1', 'bme280']`)
- `components` - Array of component slugs (e.g., `['i2c', 'sensor']`)
- `image` - Path to wiring diagram/photo (optional)
- `tags` - Array of strings (optional)

**Example file:** `src/content/examples/temperature-monitor.md`

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
│       ├── examples/         # Wiring diagrams
│       └── components/       # Component illustrations
├── src/
│   ├── components/           # Reusable Astro components
│   │   ├── DeviceCard.astro
│   │   ├── ComponentCard.astro
│   │   ├── ExampleCard.astro
│   │   └── CodeBlock.astro
│   ├── content/
│   │   ├── config.ts         # Content collection schemas
│   │   ├── devices/          # Device markdown files
│   │   ├── components/       # Component markdown files
│   │   └── examples/         # Example markdown files
│   ├── layouts/
│   │   └── Layout.astro      # Base layout with header/nav
│   └── pages/
│       ├── index.astro       # Homepage
│       ├── devices/
│       │   ├── index.astro   # Devices listing
│       │   └── [slug].astro  # Individual device page
│       ├── components/
│       │   ├── index.astro   # Components listing
│       │   └── [slug].astro  # Individual component page
│       └── examples/
│           ├── index.astro   # Examples listing
│           └── [slug].astro  # Individual example page
```

---

## 🔗 Content Relationships

The three collections are interconnected:

- **Examples** reference both **Devices** and **Components** via slugs
- **Components** can reference related **Devices**
- Cross-linking is automatic through Astro's content collections

**Example flow:**
1. An example "Temperature Monitor" lists devices: `['esp32-devkit-v1', 'bme280']`
2. It also lists components: `['i2c', 'sensor']`
3. Detail pages automatically link to these related items
4. Users can navigate from example → device → other examples using that device

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
connectionTypes: ["i2c"]
tags: ["temperature", "humidity", "pressure"]
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

### Creating a New Example

1. Create `src/content/examples/example-slug.md`
2. Add frontmatter:
```yaml
---
title: "Example Project Name"
description: "What you'll build"
difficulty: "beginner"
devices: ["esp32-devkit-v1", "bme280"]
components: ["i2c", "sensor"]
tags: ["weather", "monitoring"]
---
```
3. Write markdown with:
   - What you'll need
   - Wiring instructions
   - Complete YAML configuration
   - Troubleshooting tips

---

## 🎨 Styling

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
- "This is an Astro site using content collections"
- "Three collections: devices (hardware), components (ESPHome software), examples (projects)"
- "Collections are interconnected via slug references"

### Common Tasks

**Adding new content:**
> "Add a new device for [device name]. It's a [category] that connects via [connection type]."

**Creating pages:**
> "Create a listing page at /devices that shows all devices with filtering by category and connection type."

**Cross-referencing:**
> "On the example detail page, display cards for all referenced devices and components."

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
- [ ] User-contributed examples
- [ ] RSS feed for new examples
- [ ] Print-friendly layouts

---

## 👀 Want to learn more?

Feel free to check [Astro documentation](https://docs.astro.build) or join the [Discord server](https://astro.build/chat).
