---
title: '1.3" OLED Display White/Blue SH1106 #2'
description: '1.3" OLED Display Module (128x64) with SH1106 driver - I2C'
category: "display"
manufacturer: "Generic"
model: "SH1106 1.3"
connectionTypes: ["i2c"]
components: ["i2c", "display", "ssd1306_i2c"]
tags: ["display", "oled", "monochrome", "sh1106", "white", "blue"]
productionStatus: "active"
purchaseLinks:
  - vendor: "AliExpress"
    url: "https://www.aliexpress.com"
references:
  - title: "ESPHome SSD1306"
    url: "https://esphome.io/components/display/ssd1306.html"
status: "unused"
---

## Overview

The 1.3" OLED Display Module is a monochrome OLED display with white or blue pixels.

OLED displays are self-illuminating (no backlight needed), have excellent contrast, wide viewing angles, and consume very little power. This module uses the SH1106 driver chip.

- 1.3" OLED display (128x64 pixels)
- White or blue monochrome display
- Uses the SH1106 driver chip
- I2C interface
- I2C address: 0x3C or 0x3D (configurable)
- Operating voltage: 3.3V-5V
- Wide viewing angle (>160°)
- Low power consumption
- High contrast ratio

## Configuration Notes

- Requires **I2C** interface
- Platform: **ssd1306_i2c**
- Model: **SH1106 128x64**
- I2C address: **0x3C** or **0x3D** (check your module)
- The SH1106 driver is supported by ESPHome's ssd1306_i2c platform

### Basic Configuration

```yaml
esphome:
  name: my-sh1106-oled

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
    id: sh1106_display
    model: "SH1106 128x64"
    address: 0x3C
    lambda: |-
      it.print(0, 0, id(font), "Hello World!");
      it.print(0, 20, id(font), "SH1106 OLED");

font:
  - file: "gfonts://Roboto"
    id: font
    size: 14
```
