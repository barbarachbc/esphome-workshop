---
title: 'HC-SR501 PIR Motion Sensor'
description: 'Passive infrared motion detection sensor module'
category: "sensor"
manufacturer: "Generic"
model: "HC-SR501"
connectionTypes: ["gpio"]
components: ["binary_sensor"]
tags: ["sensor", "pir", "motion", "infrared", "hc-sr501"]
productionStatus: "active"
purchaseLinks:
  - vendor: "Amazon"
    url: "https://www.amazon.co.uk/dp/B01DKAAYK2"
references:
  - title: "ESPHome Binary Sensor"
    url: "https://esphome.io/components/binary_sensor/index.html"
status: "unused"
---

## Overview

The HC-SR501 PIR sensor detects motion by measuring changes in infrared radiation from moving warm objects.

The module features:
- Pyroelectric infrared sensor
- Detection range: up to 7 meters
- Detection angle: ~110 degrees
- Operating voltage: 4.5V-20V (typically 5V)
- Output: HIGH (3.3V) when motion detected
- Adjustable delay time: 0.3s-200s
- Adjustable sensitivity
- Repeatable/non-repeatable trigger modes
- Low power consumption
- Suitable for security systems, automatic lighting, presence detection

## Configuration Notes

- Requires **GPIO** pin configured as input
- Platform: **gpio** (binary_sensor)
- Output goes HIGH when motion is detected
- Delay and sensitivity adjustable via onboard potentiometers
- Jumper selects trigger mode (repeatable or single trigger)
- Warm-up time: ~1 minute after power-on for stable operation

### Basic Configuration

```yaml
esphome:
  name: my-hcsr501-sensor

esp32:
  board: esp32dev
  framework:
    type: esp-idf

binary_sensor:
  - platform: gpio
    pin: 
      number: GPIO13
      mode: INPUT
    name: "Motion Detected"
    device_class: motion
```
