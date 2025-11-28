---
title: 'Path Tracking Sensor Module'
description: 'Infrared line tracking sensor for path following'
category: "sensor"
manufacturer: "Generic"
model: "IR Line Tracking"
connectionTypes: ["digital"]
components: ["binary_sensor"]
tags: ["sensor", "tracking", "line", "infrared", "ir", "digital"]
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

The path tracking sensor module uses infrared light to detect dark lines on light surfaces or vice versa.

The module features:
- Infrared LED transmitter and receiver
- Digital output (HIGH on white surface, LOW on black line)
- Detection distance: 2-60mm (adjustable)
- Operating voltage: 3.3V-5V
- Adjustable sensitivity via potentiometer
- Fast response time
- Onboard LED indicators
- Suitable for line-following robots, position detection, edge detection

## Configuration Notes

- Requires **GPIO** pin configured as input
- Platform: **gpio** (binary_sensor)
- Output changes based on surface reflectivity
- Works best with high contrast surfaces (black line on white)
- Detection height adjustable via sensitivity potentiometer
- Surface texture and ambient light affect performance

### Basic Configuration

```yaml
esphome:
  name: my-line-sensor

esp32:
  board: esp32dev
  framework:
    type: esp-idf

binary_sensor:
  - platform: gpio
    pin: 
      number: GPIO33
      mode: INPUT
    name: "Line Detected"
```
