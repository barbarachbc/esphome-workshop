---
title: '8x8 LED Matrix'
description: '64 LED dot matrix display module'
category: "display"
manufacturer: "Generic"
model: "8x8 LED Matrix"
variants: ["MAX7219", "HT16K33", "WS2812"]
connectionTypes: ["spi", "i2c"]
components: ["display", "max7219", "spi"]
tags: ["led", "matrix", "display", "dot-matrix"]
productionStatus: "active"
purchaseLinks:
  - vendor: "AliExpress"
    url: "https://www.aliexpress.com"
references:
  - title: "ESPHome MAX7219"
    url: "https://esphome.io/components/display/max7219.html"
status: "unused"
---

## Overview

The 8x8 LED Matrix is a square array of 64 LEDs arranged in 8 rows and 8 columns, commonly driven by MAX7219/MAX7221 controllers. These matrices can be cascaded to create larger displays.

Common variants include:
- **MAX7219/MAX7221** - SPI interface, most common
- **HT16K33** - I2C interface (used in Adafruit modules)
- **WS2812 RGB** - Individually addressable RGB LED matrix

The module features:
- 64 LEDs in 8x8 grid
- Cascadable (multiple modules can be chained)
- SPI interface (MAX7219) or I2C (HT16K33)
- Brightness control (typically 16 levels)
- Operating voltage: 5V (MAX7219) or 3.3V-5V
- Low current draw when using multiplexing
- Common anode or common cathode configurations

## Configuration Notes

- Most common: **MAX7219** with **SPI** interface
- Platform: **max7219**
- Can cascade multiple 8x8 modules
- Typical connections: DIN (MOSI), CS, CLK
- Some variants use I2C (HT16K33)
- RGB matrices typically use FastLED or NeoPixel protocols

### Basic Configuration (MAX7219)

```yaml
esphome:
  name: my-led-matrix

esp32:
  board: esp32dev
  framework:
    type: esp-idf

spi:
  clk_pin: GPIO18
  mosi_pin: GPIO23

display:
  - platform: max7219
    cs_pin: GPIO5
    num_chips: 1
    lambda: |-
      it.print(0, 0, id(font), "Hi");

font:
  - file: "gfonts://Roboto"
    id: font
    size: 8
    glyphs: "!\"%()+,-_.:°0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz"
```
