---
title: 'MCP4725 DAC'
description: '12-bit I2C Digital-to-Analog Converter'
category: "output"
manufacturer: "Microchip"
model: "MCP4725"
connectionTypes: ["i2c"]
components: ["i2c", "output", "mcp4725"]
tags: ["dac", "analog", "output", "i2c"]
productionStatus: "active"
purchaseLinks:
  - vendor: "AliExpress"
    url: "https://www.aliexpress.com"
  - vendor: "Adafruit"
    url: "https://www.adafruit.com/product/935"
references:
  - title: "ESPHome MCP4725"
    url: "https://esphome.io/components/output/mcp4725/"
  - title: "Datasheet"
    url: "https://ww1.microchip.com/downloads/en/DeviceDoc/22039d.pdf"
status: "unused"
---

## Overview

The MCP4725 is a low-power, high accuracy, single channel 12-bit buffered voltage output Digital-to-Analog Converter (DAC) with I2C interface and EEPROM.

The module features:
- 12-bit resolution (4096 steps)
- I2C interface (up to 3.4MHz)
- On-board voltage reference (VDD)
- Output range: 0V to VDD
- Internal EEPROM for storing DAC settings
- Low power consumption
- Addresses: 0x60-0x67 (configurable via A0 pin)
- Operating voltage: 2.7V-5.5V
- Rail-to-rail output

## Configuration Notes

- Requires **I2C** interface
- Platform: **mcp4725**
- Default I2C address: **0x60** (can be 0x60-0x67)
- Output voltage: 0V to VCC (typically 0-5V or 0-3.3V)
- Can be used to control analog devices, audio, motor speed, etc.
- EEPROM allows persistence of output value through power cycles

### Basic Configuration

```yaml
esphome:
  name: my-mcp4725

esp32:
  board: esp32dev
  framework:
    type: esp-idf

i2c:
  sda: GPIO21
  scl: GPIO22
  scan: true

output:
  - platform: mcp4725
    id: dac_output
    address: 0x60

light:
  - platform: monochromatic
    name: "DAC Controlled Light"
    output: dac_output
```
