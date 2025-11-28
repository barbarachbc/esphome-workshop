---
title: 'AM312 PIR Sensor'
description: 'Mini PIR motion sensor module with low power consumption'
category: "sensor"
manufacturer: "Generic"
model: "AM312"
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

The AM312 is a miniature PIR (Passive Infrared) motion sensor module designed for automatic human body detection with very low power consumption.

The module features:
- Mini size: 15mm x 10mm
- Low power consumption (< 100µA)
- Digital output (HIGH when motion detected)
- Wide voltage range: 2.7V-12V
- Detection range: 3-5 meters
- Detection angle: approximately 100°
- Output high time: 2-3 seconds (non-adjustable)
- Automatic re-triggering
- Fresnel lens for improved sensitivity

## Configuration Notes

- Requires single **GPIO** pin
- Digital output: HIGH (3.3V) when motion detected, LOW when idle
- No configuration jumpers or potentiometers (unlike HC-SR501)
- Very simple to use - just connect VCC, GND, and OUT
- Lower power consumption than HC-SR501

### Basic Configuration

```yaml
esphome:
  name: my-am312

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
