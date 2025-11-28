---
title: '5x5 RGB Matrix Breakout'
description: '5x5 RGB LED matrix, individually addressable by Pimoroni'
category: "display"
manufacturer: "Pimoroni"
model: "PIM435"
connectionTypes: ["i2c"]
components: ["i2c", "addressable_light", "is31fl3731"]
tags: ["led", "matrix", "rgb", "display"]
productionStatus: "active"
purchaseLinks:
  - vendor: "Pimoroni"
    url: "https://shop.pimoroni.com/products/5x5-rgb-matrix-breakout?variant=21375941279827"
references:
  - title: Datasheet
    url: "https://www.lumissil.com/assets/pdf/core/IS31FL3731_DS.pdf"
  - title: Github Python Library
    url: "https://github.com/pimoroni/rgbmatrix5x5-python"
  - title: Feature Request
    url: "https://github.com/esphome/feature-requests/issues/2245"
dateAcquired: "Jan 2022"
status: "unsupported"
---

## Overview

The 5x5 RGB Matrix Breakout is a grid of 25 individually controllable RGB LEDs driven by the IS31FL3731 matrix LED driver chip.

The board features:
- 5x5 (25 total) RGB LEDs
- IS31FL3731 LED driver chip
- 8-bit PWM control per LED (256 brightness levels)
- I2C interface (address 0x74, or 0x77 with trace cut)
- 3.3V or 5V compatible
- Integrated power regulator

## Configuration Notes

- Requires **I2C**, i2c_id is optional, but i2c component is required.
- Default I2C address: **0x74** (can be changed to 0x77 by cutting a trace on the board)
- Uses the **IS31FL3731** LED matrix driver
- Each LED has independent RGB control with 8-bit PWM
- Can be used as an addressable light or display component

## Status Remarks

IS31FL3731 not supported yet in ESPHome