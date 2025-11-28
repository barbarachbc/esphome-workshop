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
    url: "https://www.aliexpress.com"
references:
  - title: "ESPHome PCF8574"
    url: "https://esphome.io/components/pcf8574/"
  - title: "Datasheet"
    url: "https://www.ti.com/lit/ds/symlink/pcf8575.pdf"
status: "unused"
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
- Platform: **pcf8574** (ESPHome uses same platform for PCF8575)
- Default I2C addresses: **0x20-0x27** (configurable via address pins)
- Use `pcf8575: true` configuration option
- Each pin can be configured as input or output
- Pins can be used with binary_sensor, switch, and other GPIO-based components
- Provides 16 additional GPIO pins over I2C

### Basic Configuration

```yaml
esphome:
  name: my-pcf8575

esp32:
  board: esp32dev
  framework:
    type: esp-idf

i2c:
  sda: GPIO21
  scl: GPIO22
  scan: true

pcf8574:
  - id: pcf8575_hub
    address: 0x20
    pcf8575: true

binary_sensor:
  - platform: gpio
    name: "PCF8575 Pin 0"
    pin:
      pcf8574: pcf8575_hub
      number: 0
      mode: INPUT
      inverted: false

switch:
  - platform: gpio
    name: "PCF8575 Pin 15"
    pin:
      pcf8574: pcf8575_hub
      number: 15
      mode: OUTPUT
```
