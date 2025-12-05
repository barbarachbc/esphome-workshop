# Contributing to ESPHome Workshop

**Primary Audience:** AI coding assistants (GitHub Copilot, etc.)  
**Last Updated:** December 4, 2025

This guide helps AI assistants contribute code improvements, bug fixes, and new features to the ESPHome Workshop documentation site. For content creation (adding devices, projects, notes), see [README.md](./README.md).

---

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:4321)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Essential Context for AI Assistants

### Before Starting Any Task

1. **Read ARCHITECTURE.md** - Understand project-specific design decisions (status computation, slug-based references, component patterns)
2. **Review `src/content/config.ts`** - Understand content collection schemas (Zod validation)
3. **Read this file completely** - Follow conventions and avoid common pitfalls

### Project Philosophy

- **Personal project** - Prioritize working solutions over perfection
- **Content-first** - Markdown files with YAML frontmatter are the source of truth
- **Type-safe** - TypeScript + Zod schemas validate everything at build time
- **Static generation** - All pages pre-rendered, minimal client-side JavaScript
- **Simplicity** - No over-engineering; keep it maintainable

---

## Technology Stack

- **Framework:** Astro 5.x (static site generator, file-based routing)
- **Language:** TypeScript throughout
- **Styling:** Tailwind CSS v4 + CSS Custom Properties (defined in `src/styles/global.css`)
- **Content:** Markdown/MDX via Astro Content Collections
- **Validation:** Zod schemas in `src/content/config.ts`
- **Build:** Vite tooling

---

## Project Structure

```
src/
├── components/          # Reusable Astro components
│   ├── DeviceCard.astro
│   ├── ProjectCard.astro
│   ├── ThemeToggle.astro
│   └── ...
├── content/
│   ├── config.ts        # Zod schemas for all collections
│   ├── devices/         # Device markdown files
│   ├── components/      # ESPHome component docs
│   ├── projects/        # Project markdown files
│   └── notes/           # Guide markdown files
├── layouts/
│   └── Layout.astro     # Base layout (header, nav, footer)
├── pages/               # File-based routing
│   ├── index.astro      # Homepage
│   ├── devices/[slug].astro
│   ├── projects/[slug].astro
│   └── ...
├── styles/
│   └── global.css       # Theme variables, global styles
└── utils/
    └── changelog.ts     # Changelog aggregation logic
```

**See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed design decisions.**

---

## Code Conventions

### File Naming

- **Components:** PascalCase - `DeviceCard.astro`, `TableOfContents.astro`
- **Utilities:** camelCase - `changelog.ts`
- **Directories:** lowercase - `components/`, `utils/`
- **Content slugs:** kebab-case - `esp32-devkit-v1.md`

### TypeScript Conventions

**Component Props:**
```typescript
// Always define Props interface
interface Props {
  device: {
    slug: string;
    data: DeviceSchema;
  };
  displayStatus?: string;
}

const { device, displayStatus } = Astro.props;
```

**Cross-Collection References:**
```typescript
// Use getEntry() for slug-based lookups
import { getEntry } from 'astro:content';

const relatedDevice = await getEntry('devices', deviceSlug);
```

**Conditional Rendering:**
```astro
{device.data.image && (
  <img src={device.data.image} alt={device.data.title} />
)}
```

### Styling Conventions

**NO inline styles** - Use `<style>` blocks or global CSS

**CSS Custom Properties for theming:**
```css
/* Use variables from src/styles/global.css */
background: var(--bg-primary);
color: var(--text-primary);
border: 1px solid var(--border-primary);
```

**Tailwind for layout:**
```astro
<div class="px-4 py-2 rounded-lg border">
  Content
</div>
```

**Status Badge Classes:**
- `.status-badge-deployed` (green)
- `.status-badge-testing` (amber)
- `.status-badge-ready` (gray)
- `.status-badge-retired` (muted)

---

## Key Architecture Patterns

### 1. Slug-Based Cross-Referencing

Collections reference each other via filename slugs:

```yaml
# In project frontmatter
devices: ['esp32-devkit-v1', 'bme280']
components: ['i2c', 'sensor']
```

### 2. Auto-Computed Device Status

**Critical:** Device status is computed on homepage based on project usage.

**Rules:**
- Device with `status: 'ready'` + used in completed project → shows as `'deployed'`
- Device with `status: 'ready'` + used in in-progress project → shows as `'testing'`
- Manual status (`'testing'`, `'deployed'`, `'retired'`) is **never auto-changed**

**See [ARCHITECTURE.md § Status Computation Logic](./ARCHITECTURE.md#status-computation-logic) for details.**

### 3. Content Collections Schema

All schemas in `src/content/config.ts`:

```typescript
const devices = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    category: z.enum(['board', 'sensor', ...]),
    status: z.enum(['ready', 'testing', 'deployed', ...]),
    // ... more fields
  })
});
```

**Always validate against schemas before creating/editing content.**

---

## Testing & Validation

### Build-Time Validation

Zod automatically validates all content:

```bash
npm run build
```

**Common errors:**
- Missing required field → Add to frontmatter
- Invalid enum value → Check schema in `src/content/config.ts`
- Type mismatch → Ensure correct data type

### Manual Testing Checklist

Before committing code changes:

- [ ] `npm run dev` - Site loads without errors
- [ ] `npm run build` - Build completes successfully
- [ ] New/changed components render correctly
- [ ] No TypeScript errors
- [ ] Dark mode works
- [ ] Mobile responsive

---

## Common Development Tasks

### Adding a New Component

1. Create `src/components/MyComponent.astro`
2. Define Props interface with TypeScript
3. Use semantic HTML
4. Style with Tailwind + CSS custom properties
5. Test with real data

### Modifying a Schema

1. Edit `src/content/config.ts`
2. Update components that use the field
3. Run `npm run build` to validate
4. Update existing content if needed

### Creating a New Page

1. Add file to `src/pages/` (file-based routing)
2. Import Layout: `import Layout from '../layouts/Layout.astro'`
3. Query content collections as needed
4. Test routing works correctly

---

## AI-Specific Guidelines

### File Operations

### Before Editing Code

1. **Read existing code** - Use `read_file` to understand current implementation
2. **Check for usage** - Use `grep_search` or `list_code_usages` to find references
3. **Understand schema** - Read `src/content/config.ts` for content structure
4. **Review ARCHITECTURE.md** - Understand design decisions

### When Creating Components

- Check for existing similar components
- Follow established patterns (see existing components)
- Use TypeScript for all props
- Test with actual content from collections

### When Modifying Schemas

- Update ALL files that use the changed field
- Run build to catch validation errors
- Consider backward compatibility
- Update ARCHITECTURE.md if design changes

### Common Pitfalls to Avoid

❌ **Don't:**
- Bypass schema validation
- Add inline styles
- Use framework-specific details in user-facing docs
- Assume file existence without checking
- Create overly complex solutions

✅ **Do:**
- Follow existing patterns
- Keep it simple
- Use semantic HTML
- Test thoroughly
- Update documentation when needed
- Pause and ask if unsure

---

## Further Details

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Technical architecture and design decisions
- **[README.md](./README.md)** - Getting started and content creation guide
- **[PROJECT.md](./PROJECT.md)** - Project vision and goals
- **`src/content/config.ts`** - Content schemas and validation rules
