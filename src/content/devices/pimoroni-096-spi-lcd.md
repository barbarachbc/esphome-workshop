---
title: '0.96" SPI Colour LCD by Pimoroni'
description: '0.96" SPI Colour LCD (160x80) Breakout'
category: "display"
manufacturer: "Pimoroni"
model: '0.96" SPI Colour LCD'
connectionTypes: ["spi"]
components: ["spi", "display", "st7735"]
tags: ["display", "lcd", "tft", "rgb", "spi", "st7735"]
productionStatus: "active"
purchaseLinks:
  - vendor: "Pimoroni"
    url: "https://shop.pimoroni.com/products/0-96-spi-colour-lcd-160x80-breakout?variant=21414301630547"
status: "testing"
dateAcquired: "Jan 2022"
image: "/images/devices/thumbnails/pimoroni-096-spi-lcd.jpg"
lastModified: "2025-12-14"
---

## Overview

The 0.96" SPI Colour LCD is a compact, high-quality color display from Pimoroni. Its small form factor makes it
ideal for embedded projects, wearables, and space-constrained applications.

![Pimoroni 0.96" Color LCD](./images/pimoroni-096-spi-lcd/pimoroni-096-spi-lcd.jpg)

Display specifications:

- 160x80 pixels (~190 PPI)
- 10.8x21.7mm active area
- 400cd/m2 luminance
- 800:1 contrast ratio
- 160° viewing angle (horizontal and vertical)
- ST7735S driver chip
- 4-wire SPI interface
- Full color display (RGB)
- 3.3V compatible

## Configuration Notes

- Requires **SPI**, spi_id is optional, but spi component is required.
- Platform: **st7735**
- cs_pin, dc_pin, and reset_pin are required - can be any available GPIO
- **Backlight control** is optional but recommended for power management

## Pin Connections

Typical Pimoroni breakout pinout:

- **VCC** → 3.3V
- **GND** → Ground
- **CS** → Chip Select (any GPIO)
- **SCK** → SPI Clock
- **MOSI** → SPI Data Out
- **DC** → Data/Command select (any GPIO)
- **BL** → Backlight control (optional, any GPIO - On/Off)
- **RST** → Reset (any GPIO)

Note: The breakout does not have MISO (SPI input) as the display is write-only.

## Other Images

Back of the OLED:
![Pimoroni 0.96" Color LCD - Back](./images/pimoroni-096-spi-lcd/pimoroni-096-spi-lcd-back.jpg)
