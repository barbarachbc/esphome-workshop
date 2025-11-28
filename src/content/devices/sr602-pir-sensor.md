---
title: 'SR602 PIR Sensor'
description: 'Mini PIR motion sensor with adjustable sensitivity'
category: "sensor"
manufacturer: "Generic"
model: "SR602"
connectionTypes: ["gpio"]
components: ["binary_sensor"]
tags: ["pir", "motion", "sensor", "infrared"]
productionStatus: "active"
purchaseLinks:
  - vendor: "AliExpress"
    url: "https://www.aliexpress.com"
references:
  - title: "ESPHome Binary Sensor"
    url: "https://esphome.io/components/binary_sensor/gpio.html"
status: "unused"
---

## Overview

The SR602 is a compact PIR (Passive Infrared) motion sensor module with adjustable sensitivity and very low power consumption.

The module features:
- Compact size: 10mm x 23mm
- Ultra-low power consumption (< 0.1mA standby)
- Digital output (HIGH when motion detected)
- Operating voltage: 4.5V-20V (typically 5V)
- Detection range: up to 7 meters (adjustable)
- Detection angle: approximately 100°
- Delay time: approximately 2.5 seconds
- Repeat trigger mode
- On-board sensitivity adjustment
- Small fresnel lens

## Configuration Notes

- Requires single **GPIO** pin
- Digital output: HIGH (3.3V) when motion detected, LOW when idle
- Sensitivity can be adjusted via on-board resistor/jumper
- Very compact - suitable for space-constrained projects
- Similar to AM312 but with adjustable sensitivity

### Basic Configuration

```yaml
esphome:
  name: my-sr602

esp32:
  board: esp32dev
  framework:
    type: esp-idf

binary_sensor:
  - platform: gpio
    pin: GPIO14
    name: "Motion Sensor"
    device_class: motion
    filters:
      - delayed_off: 500ms
```
