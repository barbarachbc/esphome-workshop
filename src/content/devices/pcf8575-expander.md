---
title: 'PCF8575 I2C Expander'
description: '16-bit I2C I/O expander for GPIO expansion'
category: "io-expander"
manufacturer: "Texas Instruments"
model: "PCF8575"
connectionTypes: ["i2c"]
components: ["i2c", "pcf8574"]
tags: ["io-expander", "gpio", "i2c"]
productionStatus: "active"
purchaseLinks:
  - vendor: "AliExpress"
    url: "https://www.aliexpress.com/item/1005007284614147.html"
references:
  - title: "Datasheet"
    url: "https://www.ti.com/lit/ds/symlink/pcf8575.pdf"
status: "pending"
dateAcquired: "Sept 2025"
---

## Overview

The PCF8575 is a 16-bit I/O expander that provides general-purpose remote I/O expansion via the I2C bus. It's the 16-bit version of the popular PCF8574 (8-bit).

The module features:
- 16 quasi-bidirectional I/O ports
- I2C interface (up to 400kHz)
- Low standby current consumption
- Open-drain interrupt output
- Addresses: 0x20-0x27 (configurable via A0, A1, A2 pins)
- Operating voltage: 2.5V-5.5V
- 5V tolerant I/Os
- Latched outputs with high current drive
- Active LOW interrupt pin

## Configuration Notes

- Requires **I2C** interface
- Platform: [**pcf8574**](https://esphome.io/components/pcf8574/) (ESPHome uses same platform for PCF8575)
- Default I2C addresses: **0x20-0x27** (configurable via address pins, 0x20 by default)
- Use `pcf8575: true` configuration option
- Each pin can be configured as input or output
- Pins can be used with binary_sensor, switch, and other GPIO-based components
- Provides 16 additional GPIO pins over I2C

