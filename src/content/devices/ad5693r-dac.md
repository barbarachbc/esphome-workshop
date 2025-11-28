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
  - vendor: "Adafruit"
    url: "https://thepihut.com/products/adafruit-ad5693r-breakout-board-16-bit-dac-with-i2c-interface-stemma-qt-qwiic?variant=42639165882563"
references:
  - title: "Analog Product Page"
    url: "https://www.analog.com/en/products/ad5693r.html"
  - title: "Adafruit Github Page"
    url: https://github.com/adafruit/Adafruit_AD569x/tree/main
  - title: "Guide"
    url: https://learn.adafruit.com/adafruit-ad5693r-16-bit-dac-breakout-board
dateAcquired: "Sept 2024"
status: "unsupported"
---

## Overview

 Adafruit AD5693R Breakout Board is a 16-bit DAC with I2C Interface and temperature compensated 2.5V internal reference for a compact high-precision output.

The module features:
- 16-bit resolution
- I2C interface (up to 400kHz standard, 3.4MHz fast mode)
- Internal 2.5V reference (can also use external)
- Output range rail-to-rail
- I2C addresses: 0x4C-0x4F (configurable - ADDR/A0 pin breakout available)
- Operating voltage: 2.7V-5.5V

## Configuration Notes

⚠️ **Note**: ESPHome does not have native support for AD5693R. 