---
title: 'Vibration Sensor Module'
description: 'SW-420 vibration detection sensor module'
category: "sensor"
manufacturer: "Generic"
model: "SW-420"
connectionTypes: ["gpio"]
components: ["binary_sensor"]
tags: ["sensor", "vibration", "shock", "sw-420", "digital"]
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

The vibration sensor module uses the SW-420 motion sensor to detect vibration, shock, and movement.

The module features:
- SW-420 vibration sensor chip
- Digital output (HIGH when vibration detected)
- Adjustable sensitivity via potentiometer
- Operating voltage: 3.3V-5V
- Quick response time
- Non-directional vibration detection
- Onboard LED indicator
- Suitable for theft alarms, knock detection, earthquake detection

## Configuration Notes

- Requires **GPIO** pin configured as input
- Platform: **gpio** (binary_sensor)
- Output goes HIGH when vibration exceeds threshold
- Sensitivity adjustable via onboard potentiometer
- May need debouncing for stable readings

### Basic Configuration

```yaml
esphome:
  name: my-vibration-sensor

esp32:
  board: esp32dev
  framework:
    type: esp-idf

binary_sensor:
  - platform: gpio
    pin: 
      number: GPIO23
      mode: INPUT_PULLUP
    name: "Vibration Detected"
    device_class: vibration
    filters:
      - delayed_on: 10ms
      - delayed_off: 100ms
```
