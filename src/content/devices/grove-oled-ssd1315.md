---
title: 'Grove OLED Display 0.96" Yellow&Blue'
description: '0.96" OLED Display Module (128x64) with SSD1315 driver - I2C or SPI'
category: "display"
manufacturer: "Seeed Studio"
model: "Grove OLED 0.96"
connectionTypes: ["i2c"]
components: ["i2c", "display", "ssd1306_i2c"]
tags: ["display", "oled", "monochrome", "grove", "ssd1315", "yellow", "blue"]
productionStatus: "active"
purchaseLinks:
  - vendor: "Mouser"
    url: "https://www.mouser.ie/new/seeed-studio/seeed-studios-grove-oled-bi-color-display/"
  - vendor: "DigiKey"
    url: "https://www.digikey.ie/en/products/detail/seeed-technology-co-ltd/104020208/10667534"
references:
  - title: "Seeed Studio Product Page"
    url: "https://wiki.seeedstudio.com/Grove-OLED-Yellow&Blue-Display-0.96-SSD1315_V1.0/"
  - title: Datasheet
    url: "https://files.seeedstudio.com/wiki/Grove-OLED-Yellow&Blue-Display-0.96-(SSD1315)_V1.0/res/SSD1315.pdf"
status: "testing"
count: 2
dateAcquired: "Feb 2024"
---

## Overview

Grove - OLED Yellow&Blue Display 0.96 (SSD1315) is a blue and yellow two-color display with 128x64 resolution.
Compared with LCDs, OLED has many advantages like self-emission, high contrast ration, slim/thin outline, wide viewing angle and low power consumption. This display works on 3.3V or 5V supply voltage.
You can control it through I2C interface on your microcontroller, to display words, images, or any information you want.

- 0.96" OLED display (128x64 pixels)
- Yellow and blue color zones (top 16 rows yellow, bottom 48 rows blue)
- Uses the SSD1315 driver chip
- Grove I2C interface
- I2C address: Unclear at the moment (There are SMD jumpers for I2C address 0x7A or 0x78)
- SPI - can use either through smd jumpers
- Operating voltage: 3.3V-5V
- Wide viewing angle
- Low power consumption

## Remarks

Examples on the product page indicate that [SSD1306 128X64](https://esphome.io/components/display/ssd1306/) should work.

It looks like that it is configured for I2C by default. I2C address: Unclear at the moment. There are SMD jumpers for I2C address 0x7A or 0x78. D/C# acts as SA0 for slave address selection (0x7A when 1, 0x78 when 0). Need to check if this is by default set.

There is an option to wire it up to use SPI by soldering jumpers.

