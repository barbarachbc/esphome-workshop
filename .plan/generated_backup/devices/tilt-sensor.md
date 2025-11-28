---
title: 'Tilt Sensor Module'
description: 'Ball-type tilt switch sensor for angle detection'
category: "sensor"
manufacturer: "Generic"
model: "Tilt Switch"
connectionTypes: ["digital"]
components: ["binary_sensor"]
tags: ["sensor", "tilt", "angle", "switch", "digital"]
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

The tilt sensor module uses a ball-type tilt switch to detect orientation changes and tilting.

The module features:
- Ball-type tilt switch mechanism
- Digital output (HIGH/LOW based on tilt)
- Simple on/off detection
- Operating voltage: 3.3V-5V
- No moving parts to wear out
- Wide sensing angle
- Quick response
- Onboard LED indicator
- Suitable for tilt detection, orientation sensing, anti-theft alarms

## Configuration Notes

- Requires **GPIO** pin configured as input
- Platform: **gpio** (binary_sensor)
- Output changes state when tilted beyond threshold angle
- Simple two-state detection (tilted/not tilted)
- Can be used for shake detection and orientation monitoring

### Basic Configuration

```yaml
esphome:
  name: my-tilt-sensor

esp32:
  board: esp32dev
  framework:
    type: esp-idf

binary_sensor:
  - platform: gpio
    pin: 
      number: GPIO19
      mode: INPUT_PULLUP
    name: "Tilt Detected"
    device_class: moving
```
