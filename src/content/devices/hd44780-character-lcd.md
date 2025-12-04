---
title: 'HD44780 Character LCD Display'
description: 'Character-based LCD display with HD44780 controller'
category: "display"
manufacturer: "Generic"
model: "HD44780"
variants: ["1602A"]
connectionTypes: ["i2c", "gpio"]
components: ["i2c", "display", "lcd_pcf8574", "lcd_gpio"]
tags: ["display", "lcd", "character", "text", "hd44780", "i2c", "pcf8574"]
productionStatus: "active"
purchaseLinks:
  - vendor: "Amazon UK"
    url: "https://www.amazon.co.uk/AZDelivery-HD44780-Display-Characters-including/dp/B0822QV8HK/?th=1"
  - vendor: "Amazon UK (16x2)"
    url: "https://www.amazon.co.uk/dp/B07CQG6CMT?th=1"
references:
  - title: "ESPHome LCD Display Component"
    url: "https://esphome.io/components/display/lcd_display/"
  - title: "HD44780U Datasheet"
    url: "https://www.sparkfun.com/datasheets/LCD/HD44780.pdf"
  - title: "Character Set Reference"
    url: "https://user-images.githubusercontent.com/1550668/173113487-9c98e866-8ee4-4a3c-a83f-61fe62057c5f.png"
  - title: "Custom Character Generator"
    url: "https://omerk.github.io/lcdchargen/"
status: "pending"
---

## Overview

The HD44780 is a character-based LCD display controller that has become the de facto standard for simple text displays. These displays show individual characters in a fixed grid pattern (not pixel-addressable) and are commonly available in various sizes such as 16x2, 20x4, and 8x2 configurations.

My display is salvaged from an old device.

Display features:
- Character-based display (not pixel-addressable)
- Common sizes: **16x2** (mine 1602A), 20x4, 8x2, 20x2, 40x2
- HD44780 or compatible controller chip
- Multiple character sets available
- 8 user-definable custom characters
- Built-in backlight (usually blue or **green** (mine))
- Operating voltage: 5V (display logic), 3.3V compatible with I2C module
- Adjustable contrast via potentiometer

