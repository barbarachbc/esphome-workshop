---
title: 'HC-SR04 Ultrasonic Distance Sensor'
description: 'Ultrasonic ranging module for distance measurement'
category: "sensor"
manufacturer: "Generic"
model: "HC-SR04"
connectionTypes: ["digital"]
components: ["ultrasonic", "sensor"]
tags: ["sensor", "ultrasonic", "distance", "ranging", "hc-sr04"]
productionStatus: "active"
purchaseLinks:
  - vendor: "Amazon"
    url: "https://www.amazon.co.uk/dp/B01DKAAYK2"
references:
  - title: "ESPHome Ultrasonic"
    url: "https://esphome.io/components/sensor/ultrasonic.html"
status: "unused"
---

## Overview

The HC-SR04 ultrasonic sensor measures distance by emitting ultrasonic pulses and measuring the echo return time.

The module features:
- Measuring range: 2cm-400cm (0.8"-157")
- Accuracy: ±3mm
- Measuring angle: ~15 degrees
- Operating voltage: 5V
- Operating current: <15mA
- Ultrasonic frequency: 40kHz
- Trigger input: 10µs TTL pulse
- Echo output: pulse width proportional to distance
- Non-contact measurement
- Suitable for robotics, parking sensors, liquid level detection

## Configuration Notes

- Requires **two GPIO pins** (trigger and echo)
- Platform: **ultrasonic**
- Trigger pin sends pulse, echo pin receives response
- Works best with flat, hard surfaces perpendicular to sensor
- Soft materials (fabric, foam) may absorb sound waves
- Temperature affects speed of sound (can be compensated)

### Basic Configuration

```yaml
esphome:
  name: my-hcsr04-sensor

esp32:
  board: esp32dev
  framework:
    type: esp-idf

sensor:
  - platform: ultrasonic
    trigger_pin: GPIO12
    echo_pin: GPIO14
    name: "Distance"
    update_interval: 1s
    timeout: 3m
    filters:
      - filter_out: nan
      - sliding_window_moving_average:
          window_size: 5
```
