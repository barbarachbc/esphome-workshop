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
    status: z.enum(['ready', 'testing', 'deployed', 'retired', 'pending', 'unsupported', 'active']),
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
    lastModified: z.string().optional(),  // ISO date: YYYY-MM-DD
    lastVerified: z.string().optional(),  // When info was confirmed accurate
  }),
});

const components = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum([
      // Core components
      'core',
      // Communication & networking
      'spi', 'i2c', 'uart', 'ethernet', 'bluetooth', 'wifi',
      // Sensors
      'sensor', 'binary-sensor', 'text-sensor',
      // Outputs & controls
      'output', 'switch', 'light', 'climate', 'cover', 'fan', 'number',
      // Display & UI
      'display', 'touchscreen',
      // Time
      'time',
      // Automation
      'automation',
      // Other/generic
      'platform', 'other'
    ]),
    esphomeComponent: z.string(), // The ESPHome component name (e.g., 'gpio', 'i2c', 'bme280')
    documentation: z.string().optional(), // Link to official ESPHome docs
    //relatedDevices: z.array(z.string()).optional(), // References to device slugs
    relatedDevices: z.array( 
      z.union([z.string().transform(val => ({id: val, description: undefined})), z.object({
      id: z.string(),
      description: z.string().optional(),
    })]
    )).optional(), // References to device slugs or id/description object
    relatedProjects: z.array( 
      z.union([z.string().transform(val => ({id: val, description: undefined})), z.object({
      id: z.string(),
      description: z.string().optional(),
    })]
    )).optional(),
    tags: z.array(z.string()).optional(),
    changelog: z.array(z.object({
      date: z.string(),  // ISO format: YYYY-MM-DD
      type: z.enum(['added', 'updated', 'fixed']),
      description: z.string(),
    })).optional(),
    lastModified: z.string().optional(),  // ISO date: YYYY-MM-DD
    lastVerified: z.string().optional(),  // When info was confirmed accurate
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
    lastModified: z.string().optional(),  // ISO date: YYYY-MM-DD
    lastVerified: z.string().optional(),  // When info was confirmed accurate
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
    lastUpdated: z.string().optional(),  // ISO date: YYYY-MM-DD
    lastVerified: z.string().optional(),  // When info was confirmed accurate
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
