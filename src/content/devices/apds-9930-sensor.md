---
title: 'APDS-9930 Sensor'
description: 'Ambient Light and Proximity Sensor'
category: "sensor"
manufacturer: "Broadcom"
model: "APDS-9930"
connectionTypes: ["i2c"]
components: ["i2c", "sensor"]
tags: ["proximity", "light", "ambient"]
productionStatus: "obsolete"
purchaseLinks:
  - vendor: "AliExpress"
    url: "https://www.aliexpress.com/item/1005007287755130.html"
references:
  - title: "Product Page"
    url: "https://www.broadcom.com/products/optical-sensors/integrated-ambient-light-and-proximity-sensors/apds-9930"
  - title: "Datasheet"
    url: "https://docs.broadcom.com/doc/AV02-3190EN"
status: "unsupported"
dateAcquired: "Sept 2025"
---

## Overview

The APDS-9930 is a digital ambient light and proximity sensor that combines two photodiodes and an IR LED in a single package with I2C interface. It's similar to the APDS-9960 but without RGB color sensing and gesture detection.

The module features:
- Ambient light sensing
- Proximity detection
- I2C interface (up to 400kHz)
- Operating voltage: 2.4V-3.6V (most modules have 3.3V/5V regulator)
- I2C address: 0x39 (fixed)

## Configuration Notes

⚠️ **Note**: ESPHome does not have native support for APDS-9930. You may need to use a custom component. The device is similar to APDS-9960 but simpler (no gesture/RGB).

- Requires **I2C** interface
- I2C address: **0x39** (fixed)
- Supports ambient light and proximity sensing
- Built-in IR LED for proximity detection
- Similar to APDS-9960 but without gesture and color sensing

## Remarks

Possibly supported through [apds9960](https://esphome.io/components/sensor/apds9960/) component.