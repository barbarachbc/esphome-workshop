import { defineCollection, z } from 'astro:content';

const devices = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(['board', 'sensor', 'display', 'actuator', 'peripheral', 'other']),
    manufacturer: z.string().optional(),
    model: z.string().optional(),
    connectionTypes: z.array(z.enum(['i2c', 'spi', 'uart', 'gpio', 'onewire', 'analog', 'pwm', 'built-in'])),
    image: z.string().optional(),
    purchaseLinks: z.array(z.object({
      vendor: z.string(),
      url: z.string(),
    })).optional(),
    tags: z.array(z.string()).optional(),
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
  }),
});

export const collections = {
  devices,
  components,
  projects,
};
