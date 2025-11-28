---
title: 'Rotary Encoder'
description: 'Mechanical rotary encoder for input control'
category: "input"
manufacturer: "Generic"
model: "KY-040 / EC11"
variants: ["KY-040", "EC11", "Incremental Encoder"]
connectionTypes: ["gpio"]
components: ["rotary_encoder", "binary_sensor"]
tags: ["encoder", "input", "knob", "dial"]
productionStatus: "active"
purchaseLinks:
  - vendor: "AliExpress"
    url: "https://www.aliexpress.com"
references:
  - title: "ESPHome Rotary Encoder"
    url: "https://esphome.io/components/sensor/rotary_encoder.html"
status: "unused"
---

## Overview

A rotary encoder is an electromechanical device that converts rotational position or motion into digital signals. The most common types for hobbyist use are incremental encoders like the KY-040 and EC11.

The module features:
- Incremental quadrature output
- Detent positions (clicks) for tactile feedback
- Push button switch (on most modules)
- CLK and DT output pins (A and B channels)
- Operating voltage: 3.3V-5V
- No external pull-up resistors needed (most modules)
- 360° endless rotation
- Typical resolution: 20 detents/rotation
- Debouncing may be required in software

## Configuration Notes

- Requires 2 **GPIO** pins for encoder (CLK/A and DT/B)
- Optional: 1 **GPIO** pin for push button (SW)
- Platform: **rotary_encoder**
- Software debouncing recommended
- Can track position or detect rotation direction
- Min/max value constraints can be set

### Basic Configuration

```yaml
esphome:
  name: my-encoder

esp32:
  board: esp32dev
  framework:
    type: esp-idf

sensor:
  - platform: rotary_encoder
    name: "Rotary Encoder"
    id: my_encoder
    pin_a:
      number: GPIO14
      mode:
        input: true
        pullup: true
    pin_b:
      number: GPIO15
      mode:
        input: true
        pullup: true
    resolution: 1
    min_value: 0
    max_value: 100
    on_clockwise:
      - logger.log: "Turned clockwise"
    on_anticlockwise:
      - logger.log: "Turned counter-clockwise"

binary_sensor:
  - platform: gpio
    name: "Encoder Button"
    pin:
      number: GPIO16
      inverted: true
      mode:
        input: true
        pullup: true
```
