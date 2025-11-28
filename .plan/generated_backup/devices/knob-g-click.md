---
title: 'Knob G Click'
description: 'Rotary encoder with PCA9956B 24-channel I2C LED driver'
category: "input"
manufacturer: "MikroElektronika"
model: "MIKROE-4599"
connectionTypes: ["i2c", "gpio"]
components: ["i2c", "rotary_encoder"]
tags: ["rotary-encoder", "led-driver", "pwm", "input"]
productionStatus: "active"
purchaseLinks:
  - vendor: "MikroE"
    url: "https://www.mikroe.com/knob-g-click"
references:
  - title: "Product Page"
    url: "https://www.mikroe.com/knob-g-click"
  - title: "PCA9956B Datasheet"
    url: "https://www.nxs.com/docs/en/data-sheet/PCA9956B.pdf"
status: "unused"
---

## Overview

The Knob G Click is a combined rotary encoder and LED ring driver board featuring a mechanical rotary encoder and the PCA9956B 24-channel I2C-bus constant current LED driver optimized for dimming and blinking.

The module features:
- Mechanical rotary encoder with push button
- PCA9956B 24-channel I2C LED driver
- Constant current outputs: 57mA max per channel
- Individual PWM control for each channel (256 steps)
- Group PWM and blinking control
- Output voltage capability up to 20V
- I2C interface (up to 1MHz)
- I2C addresses: 0x40-0x7F (configurable)
- Operating voltage: 3.3V or 5V
- MikroBUS compatible

## Configuration Notes

⚠️ **Note**: ESPHome does not have native support for PCA9956B. The rotary encoder portion can be used with standard rotary_encoder component, but the LED driver requires custom component.

- Rotary encoder: requires 2 **GPIO** pins (A and B) + 1 for button
- LED driver: requires **I2C** interface
- Platform: **rotary_encoder** for encoder portion
- PCA9956B LED driver needs custom component
- 24 individual LED outputs with PWM control
- Suitable for illuminated knob/dial interfaces

### Basic Configuration (Encoder Only)

```yaml
esphome:
  name: my-knob-g

esp32:
  board: esp32dev
  framework:
    type: esp-idf

sensor:
  - platform: rotary_encoder
    name: "Rotary Encoder"
    id: my_encoder
    pin_a: GPIO14
    pin_b: GPIO15
    resolution: 1
    min_value: 0
    max_value: 100

binary_sensor:
  - platform: gpio
    name: "Encoder Button"
    pin:
      number: GPIO16
      inverted: true
      mode: INPUT_PULLUP
```
