---
title: 'MCP4725 DAC'
description: 'MCP4725 Breakout Board - 12-Bit DAC w/I2C Interface'
category: "output"
manufacturer: "Microchip"
model: "MCP4725"
connectionTypes: ["i2c"]
components: ["i2c", "output", "mcp4725"]
tags: ["dac", "analog", "output", "i2c"]
productionStatus: "active"
purchaseLinks:
  - vendor: "The PiHut"
    url: "https://thepihut.com/products/adafruit-mcp4725-breakout-board-12-bit-dac-w-i2c-interface?variant=27740542673"
  - vendor: "Adafruit"
    url: "https://www.adafruit.com/product/935"
  - vendor: AliExpress
    url: https://www.aliexpress.com/item/1005005970420972.html
references:
  - title: Adafruit Tutorial
    url: https://learn.adafruit.com/mcp4725-12-bit-dac-tutorial
status: "pending"
dateAcquired: "Sept 2024"
---

## Overview

The MCP4725 is a low-power, high accuracy, single channel 12-bit buffered voltage output Digital-to-Analog Converter (DAC) with I2C interface and EEPROM.

The module features:
- 12-bit resolution
- I2C interface (up to 3.4MHz)
- On-board voltage reference (VDD)
- Output range: 0V to VDD
- Internal EEPROM for storing DAC settings
- Low power consumption
- Addresses: 0x60-0x67 (configurable via A0 pin)
- Operating voltage: 2.7V-5.5V
- Rail-to-rail output

## Configuration Notes

Supported by [MCP4725 Output](https://esphome.io/components/output/mcp4725/)