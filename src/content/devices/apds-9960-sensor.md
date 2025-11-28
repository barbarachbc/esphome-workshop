---
title: 'APDS-9960 Sensor'
description: 'RGB, Ambient Light, Proximity and Gesture Sensor'
category: "sensor"
manufacturer: "Broadcom"
model: "APDS-9960"
connectionTypes: ["i2c"]
components: ["i2c", "sensor", "apds9960"]
tags: ["proximity", "gesture", "rgb", "light", "ambient"]
productionStatus: "obsolete"
purchaseLinks:
  - vendor: "AliExpress"
    url: "https://www.aliexpress.com/item/1005007384271922.html"
    color: "APDS-9960"
references:
  - title: "Product Page"
    url: "https://www.broadcom.com/products/optical-sensors/integrated-ambient-light-and-proximity-sensors/apds-9960"
  - title: "Datasheet"
    url: "https://docs.broadcom.com/doc/AV02-4191EN"
status: "pending"
dateAcquired: "Aug 2025"
---

## Overview

The APDS-9960 is a versatile sensor that combines RGB color sensing, ambient light sensing, proximity detection, and gesture recognition in a single I2C-connected module.

The module features:
- RGB and ambient light sensing
- Proximity detection (up to ~20cm)
- Gesture detection (up/down/left/right)
- I2C interface (up to 400kHz)
- Operating voltage: 2.4V-3.6V (most modules have 3.3V/5V regulator)
- I2C address: 0x39 (fixed)

## Configuration Notes

- Requires **I2C** interface
- Platform: **apds9960**
- I2C address: **0x39** (fixed)
- Supports multiple sensor types: RGB, ambient light, proximity, gesture
- Gesture detection requires proper positioning and clear line of sight
- Built-in IR LED for proximity sensing

## Remarks

ESPHome has [apds9960](https://esphome.io/components/sensor/apds9960/) component.