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

### Basic Configuration

TODO: none of this works because there's no support for IS31FL...

Example configuration using the addressable light platform:

```yaml
esphome:
  name: my-rgb-matrix

esp32:
  board: esp32dev
  framework:
    type: esp-idf

i2c:
  sda: GPIO21
  scl: GPIO22
  scan: true

light:
  - platform: is31fl3731
    id: rgb_matrix_5x5
    address: 0x74
    width: 5
    height: 5
```

### Display Configuration

The matrix can also be used as a display:

```yaml
display:
  - platform: is31fl3731
    id: rgb_matrix_display
    address: 0x74
    width: 5
    height: 5
    lambda: |-
      // Draw patterns or text
      it.rectangle(0, 0, 5, 5);
      it.line(0, 0, 4, 4);
```

### Advanced Configuration with Effects

```yaml
light:
  - platform: is31fl3731
    id: rgb_matrix_5x5
    address: 0x74
    width: 5
    height: 5
    effects:
      - addressable_rainbow:
          name: Rainbow
          speed: 10
          width: 5
      - addressable_scan:
          name: Scan
          move_interval: 100ms
      - addressable_twinkle:
          name: Twinkle
          twinkle_probability: 5%
```

## Troubleshooting
TODO: review

- **Matrix not responding**: Verify I2C wiring and that the device appears at address 0x74 (or 0x77) in the I2C scan
- **Wrong colors**: Check the RGB channel ordering in your configuration
- **Dim LEDs**: Increase the brightness setting or check power supply
- **I2C address conflict**: If using multiple devices, cut the address selection trace to change to 0x77
