---
title: '1.28" Round TFT LCD Display'
description: 'Round RGB TFT LCD display (240x240) with GC9A01 driver'
category: "display"
manufacturer: "Generic"
model: "GC9A01A"
variants: ["1.28 TFT Square variant"]
connectionTypes: ["spi"]
components: ["spi", "display", "mipi_spi"]
tags: ["display", "lcd", "tft", "rgb", "round", "gc9a01"]
productionStatus: "active"
purchaseLinks:
  - vendor: "AliExpress"
    url: "https://www.aliexpress.com/item/1005006051175539.html"
status: "pending"
dateAcquired: "May 2024"
count: 2
---

## Overview

This is a beautiful round TFT LCD color display with 240x240 resolution.

TFT LCD displays offer bright, full-color visuals with excellent readability in various lighting conditions. The round form factor makes it ideal for watch-style projects, gauges, and unique UI designs.

- 1.28" round RGB TFT LCD display (240x240 pixels)
- Uses the GC9A01A driver chip
- 4-wire SPI interface
- Full color display (RGB)
- 3.3V compatible

## Configuration Notes

- Requires **SPI**, spi_id is optional, but spi component is required.
- Platform: **mipi_spi** (also works with ili9xxx)
- Model: **GC9A01A**
- ⚠️ **buffer_size: 25%** - Important! Without this setting, the display may fail to initialize due to RAM constraints (especially with ESP8266 based boards).
- **invert_colors: true** - May be needed depending on your specific display module.
- **color_order: BGR** - Adjust if colors appear incorrect.
- cs_pin, dc_pin, and reset_pin are required - can be any available GPIO

### Basic Configuration

Example here is for [esp32-devkit-v1](./esp32-devkit-v1)
Adjust based on your board.

TODO: photos of the examples

```yaml
esphome:
  name: my-round-display

esp32:
  board: esp32dev
  framework:
    type: esp-idf

substitutions:
  clk_pin: GPIO18
  mosi_pin: GPIO23
  disp_cs_pin: GPIO05
  disp_dc_pin: GPIO04
  disp_reset_pin: GPIO16

display:
  - platform: mipi_spi
    id: round_screen
    model: GC9A01A
    cs_pin: ${disp_cs_pin}
    dc_pin: ${disp_dc_pin}
    reset_pin: ${disp_reset_pin}
    show_test_card: true
    invert_colors: true
    color_order: BGR
    buffer_size: 25%

spi:
  clk_pin: ${clk_pin}
  mosi_pin: ${mosi_pin}

```

### Advanced Configuration with Graphics

To add text and graphics, uncomment the lambda section and define fonts:

TODO: photos of the examples

```yaml
font:
  - file: "gfonts://Roboto"
    id: roboto
    size: 20

display:
  - platform: mipi_spi
    id: round_screen
    model: GC9A01A
    cs_pin: ${disp_cs_pin}
    dc_pin: ${disp_dc_pin}
    reset_pin: ${disp_reset_pin}
    invert_colors: true
    color_order: BGR
    buffer_size: 25%
    lambda: |-
      it.filled_circle(it.get_width()/2, it.get_height()/2, 100, red);
      it.print(it.get_width()/2, it.get_height()/2, id(roboto), blue, TextAlign::CENTER, "Hello!");
```

## Troubleshooting

- **Display fails to initialize**: Make sure `buffer_size: 25%` is set. The default buffer size may be too large for some ESP32 modules.
- **Wrong colors**: Try adjusting `color_order` between BGR and RGB, or toggle `invert_colors`.
- **Blank display**: Verify SPI wiring and that the reset pin is correctly connected.
