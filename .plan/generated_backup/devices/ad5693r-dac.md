---
title: 'AD5693R DAC'
description: '16-bit I2C Digital-to-Analog Converter'
category: "output"
manufacturer: "Analog Devices"
model: "AD5693R"
connectionTypes: ["i2c"]
components: ["i2c"]
tags: ["dac", "analog", "output", "i2c", "16-bit"]
productionStatus: "active"
purchaseLinks:
  - vendor: "DigiKey"
    url: "https://www.digikey.com"
references:
  - title: "Datasheet"
    url: "https://www.analog.com/media/en/technical-documentation/data-sheets/AD5693R_5692R_5691R_5690R.pdf"
status: "unused"
---

## Overview

The AD5693R is a low power, single channel 16-bit buffered voltage output Digital-to-Analog Converter (DAC) with I2C interface and integrated reference.

The module features:
- 16-bit resolution (65536 steps)
- I2C interface (up to 400kHz standard, 3.4MHz fast mode)
- Internal 2.5V reference (can also use external)
- Output range: 0V to VDD or 0V to 2x VREF
- Power-on reset to zero scale or midscale
- Low power consumption: 120µA typical
- I2C addresses: 0x4C-0x4F (configurable)
- Operating voltage: 2.7V-5.5V
- 14-lead TSSOP or 10-lead MSOP package
- High accuracy and low noise

## Configuration Notes

⚠️ **Note**: ESPHome does not have native support for AD5693R. You may need to use a custom component or the I2C component directly.

- Requires **I2C** interface
- Default I2C addresses: **0x4C** to **0x4F** (configurable via A0/A1 pins)
- 16-bit resolution provides finer control than 12-bit DACs like MCP4725
- Integrated voltage reference simplifies design
- Suitable for precision analog control applications
