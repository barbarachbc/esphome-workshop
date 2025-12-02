---
title: '1.12" Mono SPI OLED Breakout'
description: '1.12" Mono OLED (128x128, white/black) Breakout - SPI by Pimoroni'
category: "display"
manufacturer: "Pimoroni"
model: "PIM473"
connectionTypes: ["spi"]
components: ["spi", "display", "ssd1306_spi"]
tags: ["display", "oled", "monochrome", "sh1107"]
productionStatus: "active"
purchaseLinks:
  - vendor: "Pimoroni"
    url: "https://shop.pimoroni.com/products/1-12-oled-breakout?variant=12628508704851"
status: "ready"
dateAcquired: "Jan 2022"
---

## Overview

This OLED is a beautiful monochrome display.

OLED displays are self-illuminating (no backlight needed), have excellent contrast, wide viewing angles, and consume very little power.

- 1.12" white/black OLED display (128x128 pixels)
- Uses the SH1107 driver chip
- 20x20mm active area
- SPI or I2C (address 0x3C/0x3D (cut trace)) interface
- This version uses SPI
- 3.3V or 5V compatible

## Configuration Notes

- Requires **SPI**, spi_id is optional, but spi component is required.
- ⚠️ **show_test_card** - cannot be used, does not show anything.
- model: "SH1107 128x128"
- rotation: 180 ... well, depends on how you want to position it I suppose 🙂, but because of how the board is oriented 180 makes sense
- cs_pin and dc_pin are required - can be any available GPIO

### Basic Configuration

Example here is for [esp32-devkit-v1](./esp32-devkit-v1) I use substitutions in the example below.

TODO: photos of the examples

```yaml
esphome:
  name: my-1-12oled

esp32:
  board: esp32dev
  framework:
    type: esp-idf

substitutions:
  clk_pin: GPIO18
  mosi_pin: GPIO23
  disp_cs_pin: GPIO15
  disp_dc_pin: GPIO04

display:
  - platform: ssd1306_spi
    id: pimoroni1_12oled
    model: "SH1107 128x128"
    cs_pin: ${disp_cs_pin}
    dc_pin: ${disp_dc_pin}
    rotation: 180
    lambda: |-
      it.filled_rectangle(0, 0, 48, 48);
      it.filled_rectangle(it.get_width()/2, it.get_height()/2, 12, 12);

spi:
  clk_pin: ${clk_pin}
  mosi_pin: ${mosi_pin}

```

For [beetle-esp32-c6](./beetle-esp32-c6) you can use for example:
```yaml
substitutions:
  clk_pin: GPIO23
  mosi_pin: GPIO22
  disp_cs_pin: GPIO05
  disp_dc_pin: GPIO07
```

TODO: example with beautiful display pages that are cycling every 5 seconds
TODO: use those examples for font