---
title: 'APDS-9960 Sensor'
description: 'RGB, Ambient Light, Proximity and Gesture Sensor'
category: "sensor"
manufacturer: "Broadcom"
model: "APDS-9960"
connectionTypes: ["i2c"]
components: ["i2c", "sensor", "apds9960"]
tags: ["proximity", "gesture", "rgb", "light", "ambient"]
productionStatus: "active"
purchaseLinks:
  - vendor: "AliExpress"
    url: "https://www.aliexpress.com"
  - vendor: "Adafruit"
    url: "https://www.adafruit.com/product/3595"
references:
  - title: "ESPHome APDS9960"
    url: "https://esphome.io/components/sensor/apds9960/"
  - title: "Datasheet"
    url: "https://docs.broadcom.com/doc/AV02-4191EN"
status: "unused"
---

## Overview

The APDS-9960 is a versatile sensor that combines RGB color sensing, ambient light sensing, proximity detection, and gesture recognition in a single I2C-connected module.

The module features:
- RGB and ambient light sensing
- Proximity detection (up to ~20cm)
- Gesture detection (up/down/left/right)
- I2C interface (up to 400kHz)
- UV and IR blocking filter
- Programmable interrupt
- Configurable gain and integration time
- Low power consumption
- Operating voltage: 2.4V-3.6V (most modules have 3.3V/5V regulator)
- I2C address: 0x39 (fixed)

## Configuration Notes

- Requires **I2C** interface
- Platform: **apds9960**
- I2C address: **0x39** (fixed)
- Supports multiple sensor types: RGB, ambient light, proximity, gesture
- Gesture detection requires proper positioning and clear line of sight
- Built-in IR LED for proximity sensing

### Basic Configuration

```yaml
esphome:
  name: my-apds9960

esp32:
  board: esp32dev
  framework:
    type: esp-idf

i2c:
  sda: GPIO21
  scl: GPIO22
  scan: true

sensor:
  - platform: apds9960
    type: CLEAR
    name: "APDS9960 Clear Channel"
  - platform: apds9960
    type: RED
    name: "APDS9960 Red Channel"
  - platform: apds9960
    type: GREEN
    name: "APDS9960 Green Channel"
  - platform: apds9960
    type: BLUE
    name: "APDS9960 Blue Channel"
  - platform: apds9960
    type: PROXIMITY
    name: "APDS9960 Proximity"

binary_sensor:
  - platform: apds9960
    direction: UP
    name: "APDS9960 Up"
  - platform: apds9960
    direction: DOWN
    name: "APDS9960 Down"
  - platform: apds9960
    direction: LEFT
    name: "APDS9960 Left"
  - platform: apds9960
    direction: RIGHT
    name: "APDS9960 Right"
```
