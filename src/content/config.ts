import { defineCollection, z } from 'astro:content';

const devices = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(['board', 'sensor', 'display', 'actuator', 'peripheral', 'input', 'light', 'audio', 'communication', 'network', 'output', 'storage', 'io-expander', 'other']),
    manufacturer: z.string().optional(),
    model: z.string().optional(),
    connectionTypes: z.array(z.enum(['i2c', 'spi', 'uart', 'gpio', 'onewire', 'analog', 'pwm', 'i2s', 'ethernet', 'nfc', 'built-in'])),
    image: z.string().optional(),
    purchaseLinks: z.array(z.object({
      vendor: z.string(),
      url: z.string(),
    })).optional(),
    tags: z.array(z.string()).optional(),
    // Personal tracking fields
    status: z.enum(['unused', 'testing', 'deployed', 'retired', 'pending', 'unsupported']),
    notes: z.string().optional(),
    dateAcquired: z.string().optional(),
    // New fields
    variants: z.array(z.string()).optional(),
    productionStatus: z.enum(['active', 'NRND', 'discontinued', 'obsolete', 'unknown']).default('unknown'),
    references: z.array(z.object({
      title: z.string(),
      url: z.string(),
    })).optional(),
    changelog: z.array(z.object({
      date: z.string(),  // ISO format: YYYY-MM-DD
      type: z.enum(['added', 'updated', 'fixed']),
      description: z.string(),
    })).optional(),
  }),
});

const components = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(['sensor', 'binary_sensor', 'switch', 'light', 'climate', 'cover', 'fan', 'text_sensor', 'platform', 'other']),
    esphomeComponent: z.string(), // The ESPHome component name (e.g., 'gpio', 'i2c', 'bme280')
    documentation: z.string().optional(), // Link to official ESPHome docs
    requiresHardware: z.boolean().default(false),
    relatedDevices: z.array(z.string()).optional(), // References to device slugs
    tags: z.array(z.string()).optional(),
    changelog: z.array(z.object({
      date: z.string(),  // ISO format: YYYY-MM-DD
      type: z.enum(['added', 'updated', 'fixed']),
      description: z.string(),
    })).optional(),
  }),
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
    devices: z.array(z.string()), // References to device slugs
    components: z.array(z.string()), // References to component slugs
    image: z.string().optional(),
    tags: z.array(z.string()).optional(),
    // Project tracking fields
    status: z.enum(['idea', 'in-progress', 'completed', 'abandoned']),
    dateStarted: z.string().optional(),
    dateCompleted: z.string().optional(),
    motivation: z.string().optional(),
    changelog: z.array(z.object({
      date: z.string(),  // ISO format: YYYY-MM-DD
      type: z.enum(['added', 'updated', 'fixed']),
      description: z.string(),
    })).optional(),
  }),
});

const notes = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(['setup', 'networking', 'development', 'home-assistant', 'troubleshooting', 'custom-components', 'other']),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
    tags: z.array(z.string()).optional(),
    lastUpdated: z.string().optional(),
    changelog: z.array(z.object({
      date: z.string(),  // ISO format: YYYY-MM-DD
      type: z.enum(['added', 'updated', 'fixed']),
      description: z.string(),
    })).optional(),
  }),
});

export const collections = {
  devices,
  components,
  projects,
  notes,
};
