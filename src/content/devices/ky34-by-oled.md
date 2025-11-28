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
    url: "https://www.amazon.co.uk/dp/B01N2K3BC9"
status: "testing"
dateAcquired: "2017"
---

## Overview

The KY34-BY OLED Display by Kuman is a monochrome blue OLED display module.

OLED displays are self-illuminating (no backlight needed), have excellent contrast, wide viewing angles, and consume very little power. This module uses the SSD1306 driver chip.

- 0.96" blue OLED display (128x64 pixels)
- Uses the SSD1306 driver chip
- I2C interface
- I2C address: 0x78 (or 0x7A - jumper)
- Operating voltage: 3.3V-5V


## Configuration Notes

Uses [SSD1306](https://esphome.io/components/display/ssd1306/) I2C (SSD1306 128x64).

Similar to [grove-oled-ssd1315](./grove-oled-ssd1315), has the same addresses indicated.