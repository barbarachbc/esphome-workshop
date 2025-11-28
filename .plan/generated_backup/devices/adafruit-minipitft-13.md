---
title: 'Adafruit MiniPiTFT 1.3"'
description: '240x240 TFT display with ST7789 driver and 2 buttons'
category: "display"
manufacturer: "Adafruit"
model: "4484 / 4393"
variants: ["4484 (no buttons)", "4393 (with buttons)"]
connectionTypes: ["spi"]
components: ["spi", "display", "st7789v", "binary_sensor"]
tags: ["display", "lcd", "tft", "rgb", "buttons"]
productionStatus: "active"
purchaseLinks:
  - vendor: "Adafruit"
    url: "https://www.adafruit.com/product/4393"
references:
  - title: "Product Page"
    url: "https://learn.adafruit.com/adafruit-mini-pitft-135x240-color-tft-add-on-for-raspberry-pi"
  - title: "ESPHome ST7789V"
    url: "https://esphome.io/components/display/st7789v.html"
status: "unused"
---

## Overview

The Adafruit MiniPiTFT is a 1.3" (diagonal) TFT display with 240x240 pixel resolution, featuring the ST7789 display driver and two tactile buttons. Originally designed for Raspberry Pi, it works with ESP32 and other microcontrollers.

The module features:
- 1.3" square TFT display (240x240 pixels)
- ST7789 display driver
- 4-wire SPI interface
- Full color display (RGB 18-bit, 262K colors)
- 2x tactile buttons (on model #4393)
- Backlight control via transistor
- 3.3V compatible
- Compact form factor
- Viewing angles: ~160°
- Bright backlight

## Configuration Notes

- Requires **SPI** interface
- Platform: **st7789v** (also works with ili9xxx platform)
- 2 tactile buttons require 2 **GPIO** pins
- Backlight control optional (1 GPIO pin)
- CS, DC, and RESET pins required
- Resolution: 240x240
- Color order may need adjustment (RGB vs BGR)

### Basic Configuration

```yaml
esphome:
  name: my-minipitft

esp32:
  board: esp32dev
  framework:
    type: esp-idf

spi:
  clk_pin: GPIO18
  mosi_pin: GPIO23

display:
  - platform: st7789v
    id: my_display
    cs_pin: GPIO5
    dc_pin: GPIO4
    reset_pin: GPIO16
    rotation: 0
    width: 240
    height: 240
    offset_height: 0
    offset_width: 0
    lambda: |-
      it.print(120, 120, id(font), COLOR_WHITE, TextAlign::CENTER, "Hello!");

font:
  - file: "gfonts://Roboto"
    id: font
    size: 20

binary_sensor:
  - platform: gpio
    name: "Button A"
    pin:
      number: GPIO14
      inverted: true
      mode:
        input: true
        pullup: true
  - platform: gpio
    name: "Button B"
    pin:
      number: GPIO15
      inverted: true
      mode:
        input: true
        pullup: true
```
