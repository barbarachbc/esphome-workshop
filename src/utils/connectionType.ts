// Map connection types to component slugs
export const connectionTypeMap: Record<string, string> = {
  'i2c': 'i2c',
  'spi': 'spi',
  'uart': 'uart',
  'gpio': 'gpio',
  'onewire': 'one-wire-gpio',
  'analog': 'analog',
  'pwm': 'pwm',
};