---
title: 'MCP4728 Quad DAC'
description: 'Adafruit MCP4728 Quad DAC with EEPROM'
category: "output"
manufacturer: "Microchip"
model: "MCP4728"
connectionTypes: ["i2c"]
components: ["i2c", "output", "MCP4728"]
tags: ["dac", "analog", "output", "i2c"]
productionStatus: "active"
purchaseLinks:
  - vendor: "The PiHut"
    url: "https://thepihut.com/products/adafruit-mcp4728-quad-dac-with-eeprom?variant=31536486121534"
  - vendor: "Adafruit"
    url: "https://www.adafruit.com/product/4470"
references:
  - title: Adafruit Tutorial
    url: https://learn.adafruit.com/adafruit-mcp4728-i2c-quad-dac
status: "pending"
dateAcquired: "Sept 2024"
---

## Overview

The MCP4728 12-Bit Voltage Output DAC with Four Buffered Outputs, I2C interface and EEPROM.

The module features:
- 12-bit resolution
- I2C interface (up to 3.4MHz)
- On-board voltage reference (Vref)
- Supports external Vref
- Output range: 0V to 2*Vref (up to VDD)
- Internal EEPROM for storing DAC settings
- Default I2C address 0x60 (configurable in EEPROM)
- Operating voltage: 2.7V-5.5V
- Rail-to-rail output

## Configuration Notes

Supported by [MCP4728 Component](https://esphome.io/components/output/mcp4728/)
