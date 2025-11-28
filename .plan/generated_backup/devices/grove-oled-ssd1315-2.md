---
title: 'Grove OLED Display 0.96" Yellow&Blue #2'
description: '0.96" OLED Display Module (128x64) with SSD1315 driver - I2C'
category: "display"
manufacturer: "Seeed Studio"
model: "Grove OLED 0.96"
connectionTypes: ["i2c"]
components: ["i2c", "display", "ssd1306_i2c"]
tags: ["display", "oled", "monochrome", "grove", "ssd1315", "yellow", "blue"]
productionStatus: "active"
purchaseLinks:
  - vendor: "Seeed Studio"
    url: "https://www.seeedstudio.com/Grove-OLED-Display-0-96-SSD1315-p-4294.html"
references:
  - title: "ESPHome SSD1306"
    url: "https://esphome.io/components/display/ssd1306.html"
status: "unused"
---

## Overview

The Grove OLED Display 0.96" is a monochrome OLED display module with yellow and blue color zones.

OLED displays are self-illuminating (no backlight needed), have excellent contrast, wide viewing angles, and consume very little power. This Grove module uses the SSD1315 driver chip which is compatible with the SSD1306 driver.

- 0.96" OLED display (128x64 pixels)
- Yellow and blue color zones (top 16 rows yellow, bottom 48 rows blue)
- Uses the SSD1315 driver chip (SSD1306 compatible)
- Grove I2C interface
- I2C address: 0x3C
- Operating voltage: 3.3V-5V
- Wide viewing angle
- Low power consumption

## Configuration Notes

- Requires **I2C** interface
- Platform: **ssd1306_i2c**
- Model: **SSD1306 128x64**
- I2C address: **0x3C** (default)
- Compatible with SSD1306 driver in ESPHome
- Grove connector provides easy plug-and-play connection

### Basic Configuration

```yaml
esphome:
  name: my-grove-oled

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
    id: grove_oled
    model: "SSD1306 128x64"
    address: 0x3C
    lambda: |-
      it.print(0, 0, id(font), "Hello World!");
      it.print(0, 20, id(font), "Grove OLED");

font:
  - file: "gfonts://Roboto"
    id: font
    size: 12
```
