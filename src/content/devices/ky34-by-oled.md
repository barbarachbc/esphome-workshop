---
title: 'KY34-BY OLED Blue (Kuman)'
description: '0.96" OLED Display Module (128x64) - I2C - SSD1306'
category: "display"
manufacturer: "Kuman"
model: "KY34-BY"
connectionTypes: ["i2c"]
components: ["i2c", "display", "ssd1306_i2c"]
tags: ["display", "oled", "monochrome", "ssd1306", "blue", "kuman"]
productionStatus: "active"
purchaseLinks:
  - vendor: "Amazon"
    url: "https://www.amazon.com"
references:
  - title: "ESPHome SSD1306"
    url: "https://esphome.io/components/display/ssd1306.html"
status: "unused"
---

## Overview

The KY34-BY OLED Display by Kuman is a monochrome blue OLED display module.

OLED displays are self-illuminating (no backlight needed), have excellent contrast, wide viewing angles, and consume very little power. This module uses the SSD1306 driver chip.

- 0.96" blue OLED display (128x64 pixels)
- Uses the SSD1306 driver chip
- I2C interface
- I2C address: 0x3C or 0x3D (configurable)
- Operating voltage: 3.3V-5V
- Wide viewing angle
- Low power consumption
- High contrast ratio

## Configuration Notes

- Requires **I2C** interface
- Platform: **ssd1306_i2c**
- Model: **SSD1306 128x64**
- I2C address: **0x3C** or **0x3D** (most commonly 0x3C)
- Compatible with standard SSD1306 driver in ESPHome

### Basic Configuration

```yaml
esphome:
  name: my-ky34-oled

esp32:
  board: esp32dev
  framework:
    type: esp-idf

i2c:
  sda: GPIO21
  scl: GPIO22
  scan: true

display:
  - platform: ssd1306_i2c
    id: kuman_oled
    model: "SSD1306 128x64"
    address: 0x3C
    lambda: |-
      it.print(0, 0, id(font), "Hello World!");
      it.print(0, 20, id(font), "KY34-BY OLED");

font:
  - file: "gfonts://Roboto"
    id: font
    size: 12
```
