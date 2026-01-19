---
title: '2.0" Color Display 240x320'
description: 'SPI 2.0" Display Module (240x320)'
category: "display"
manufacturer: "Generic"
model: "st7789v"
connectionTypes: ["spi"]
components: ["spi", "display", "display-mipi-spi"]
tags: ["display", "oled", "color", "st7789v"]
productionStatus: "active"
purchaseLinks:
  - vendor: "AliExpress"
    url: "https://www.aliexpress.com/item/1005006423091182.html"
status: "testing"
count: 1
dateAcquired: "Dec 2025"
image: "/images/devices/thumbnails/st7789v-color-display.jpg"
lastModified: "2026-01-19"
---

## Overview

The 2" OLED Display Module is a Color OLED? display with 240x320 resolution. (The listing says OLED LCD which
makes no sense)

![Photo of the 2.0" Color Display](./images/st7789v-color-display/display.jpg)

OLED displays are self-illuminating (no backlight needed), have excellent contrast, wide viewing angles,
and consume very little power. This module uses the ST7789V driver chip.

## Configuration Notes

- Requires **SPI** interface
- Platform: [**mipi_spi**](https://esphome.io/components/display/mipi_spi/)
- Model: **ST7789V**

Board [jc2432w328c](./jc2432w328c.md) has the same driver so it should have the same setup.

## Other Images

Back of the display:
![Photo of the 2" display from the back](./images/st7789v-color-display/back.jpg)
