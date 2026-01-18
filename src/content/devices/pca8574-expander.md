---
title: 'PCA8574 I2C Expander'
description: '8-bit I2C I/O expander for GPIO expansion'
category: "io-expander"
manufacturer: "NXP"
model: "PCA8574"
connectionTypes: ["i2c"]
components: ["i2c", "pcf8574", "switch-gpio", "binary-sensor-gpio"]
tags: ["io-expander", "gpio", "i2c"]
productionStatus: "discontinued"
purchaseLinks:
  - vendor: "Mouser"
    url: "https://www.mouser.ie/ProductDetail/771-PCA85PW118"
references:
  - title: "Datasheet"
    url: "https://www.mouser.ie/datasheet/3/118/1/PCA8574_PCA8574A.pdf"
status: "pending"
dateAcquired: "Nov 2024"
lastModified: "2026-01-18"
---

## Overview

The PCA8574 is an 8-bit I/O expander that provides general-purpose remote I/O expansion via the I2C bus.
It's functionally compatible with the PCF8574 and shares the same component platform in ESPHome.

The module features:

- 8 quasi-bidirectional I/O ports
- I2C interface (up to 100kHz)
- Low standby current consumption
- Open-drain interrupt output
- Addresses: 0x20-0x27 (PCA8574) or 0x38-0x3F (PCA8574A)
- Operating voltage: 2.5V-6V
- 5V tolerant I/Os
- Latched outputs with high current drive
- Active LOW interrupt pin

## Configuration Notes

- Requires **I2C** interface
- Platform: [**pcf8574**](https://esphome.io/components/pcf8574/) (ESPHome uses PCF8574 platform for PCA8574)
- Default I2C addresses: **0x20-0x27** (PCA8574) or **0x38-0x3F** (PCA8574A)
- Default address in ESPHome: **0x21**
- Each pin can be configured as input or output
- Pins can be used with binary_sensor, switch, and other GPIO-based components
- Provides 8 additional GPIO pins over I2C
- Pin numbers: 0-7

## Example Configuration

```yaml
# I2C bus configuration
i2c:
  sda: GPIO21
  scl: GPIO22
  scan: true

# PCA8574 configuration
pcf8574:
  - id: 'pca8574_hub'
    address: 0x20  # or 0x38 for PCA8574A
    pcf8575: false

# Individual outputs
switch:
  - platform: gpio
    name: "PCA8574 Pin #0"
    pin:
      pcf8574: pca8574_hub
      number: 0
      mode:
        output: true
      inverted: false

# Individual inputs
binary_sensor:
  - platform: gpio
    name: "PCA8574 Pin #7"
    pin:
      pcf8574: pca8574_hub
      number: 7
      mode:
        input: true
      inverted: false
```

## Hardware Notes

- The PCA8574 and PCA8574A differ only in their I2C address ranges
- All pins are quasi-bidirectional (can be used as input or output without reconfiguration)
- Internal weak pull-up resistors on all I/O pins
- Maximum output sink current: 25mA per pin
- Address pins A0, A1, A2 configure the I2C address
- INT pin can be connected to an MCU interrupt pin to detect input changes
