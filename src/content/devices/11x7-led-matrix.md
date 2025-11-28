---
title: '11x7 LED Matrix Breakout'
description: '11x7 white LED matrix, individually addressable by Pimoroni'
category: "display"
manufacturer: "Pimoroni"
model: "PIM442"
connectionTypes: ["i2c"]
components: ["i2c", "display", "is31fl3731"]
tags: ["led", "matrix", "monochrome", "display"]
productionStatus: "active"
purchaseLinks:
  - vendor: "Pimoroni"
    url: "https://shop.pimoroni.com/products/11x7-led-matrix-breakout?variant=21791690752083"

references:
  - title: Datasheet
    url: "https://www.lumissil.com/assets/pdf/core/IS31FL3731_DS.pdf"
  - title: Github Python Library
    url: "https://github.com/pimoroni/matrix11x7-python"
  - title: Feature Request
    url: "https://github.com/esphome/feature-requests/issues/2245"

dateAcquired: "Jan 2022"
status: "unsupported"
---

## Overview

The 11x7 LED Matrix Breakout is a grid of 77 individually controllable bright white LEDs driven by the IS31FL3731 matrix LED driver chip.

The board features:
- 11x7 (77 total) bright white LEDs
- IS31FL3731 LED driver chip
- 8-bit PWM control per LED (256 brightness levels)
- I2C interface (address 0x75, or 0x77 with trace cut)
- 3.3V or 5V compatible
- Integrated power regulator

## Status Remarks

IS31FL3731 not supported yet in ESPHome