---
title: 'Adafruit MiniPiTFT 1.3"'
description: '240x240 TFT display with ST7789 driver and 2 buttons'
category: "display"
manufacturer: "Adafruit"
model: "4484"
variants: ["4484 (no buttons)", "4393 (with buttons)"]
connectionTypes: ["spi"]
components: ["spi", "display", "st7789v", "binary_sensor"]
tags: ["display", "lcd", "tft", "rgb", "buttons"]
productionStatus: "active"
purchaseLinks:
  - vendor: "The PiHut"
    url: "https://thepihut.com/products/adafruit-mini-pitft-1-3-240x240-tft-add-on-for-raspberry-pi?variant=31486702190654"
  - vendor: Adafruit
    url: https://www.adafruit.com/product/4484
references:
  - title: "Product Page"
    url: "https://learn.adafruit.com/adafruit-mini-pitft-135x240-color-tft-add-on-for-raspberry-pi"

dateAcquired: "Sept 2024"
status: "testing"
---

## Overview

The Adafruit MiniPiTFT is a 1.3" (diagonal) TFT display with 240x240 pixel resolution, featuring the ST7789 display driver and two tactile buttons. Originally designed for Raspberry Pi, it works with ESP32 and other microcontrollers.

The module features:
- 1.3" square TFT display (240x240 pixels)
- ST7789 display driver
- 4-wire SPI interface
- Full color display (RGB 18-bit, 262K colors)
- 2x tactile buttons (on model #4393)
- Bright backlight

## Remarks

ST7789 display driver supported through [MIPI SPI](https://esphome.io/components/display/mipi_spi/). [ST7789V component](https://esphome.io/components/display/st7789v/) is still available but will be removed in future.