---
title: 'Obstacle Avoidance Sensor'
description: 'Infrared obstacle detection and avoidance sensor module'
category: "sensor"
manufacturer: "Generic"
model: "IR Obstacle Sensor"
connectionTypes: ["digital"]
components: ["binary_sensor"]
tags: ["sensor", "obstacle", "infrared", "ir", "proximity", "digital"]
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

The obstacle avoidance sensor module uses infrared light to detect objects and obstacles at close range.

The module features:
- Infrared transmitter and receiver
- Digital output (LOW when obstacle detected)
- Detection distance: 2-30cm (adjustable via potentiometer)
- Operating voltage: 3.3V-5V
- Detection angle: ~35 degrees
- Adjustable sensitivity
- Fast response time
- Onboard LED indicators (power and detection)
- Suitable for robotics, automation, collision avoidance

## Configuration Notes

- Requires **GPIO** pin configured as input
- Platform: **gpio** (binary_sensor)
- Output goes LOW when obstacle is detected within range
- Detection distance adjustable via onboard potentiometer
- Works best with non-reflective surfaces
- May be affected by ambient IR light

### Basic Configuration

```yaml
esphome:
  name: my-obstacle-sensor

esp32:
  board: esp32dev
  framework:
    type: esp-idf

binary_sensor:
  - platform: gpio
    pin: 
      number: GPIO22
      mode: INPUT_PULLUP
      inverted: true
    name: "Obstacle Detected"
    device_class: presence
```
