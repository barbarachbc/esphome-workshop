---
title: 'AHT10 Temperature and Humidity Sensor'
description: 'I2C temperature and humidity sensor module'
category: "sensor"
manufacturer: "Generic"
model: "AHT10"
connectionTypes: ["i2c"]
components: ["i2c", "sensor"]
tags: ["sensor", "temperature", "humidity", "aht10", "digital", "i2c"]
productionStatus: "active"
status: "pending"
dateAcquired: "Dec 2025"
purchaseLink:
    - vendor: "AliExpress"
      url: "https://www.aliexpress.com/item/1005007738941036.html"
references:
    - title: "ESPHome AHT10 Temperature+Humidity Sensor Component"
      url: "https://esphome.io/components/sensor/aht10/"
lastModified: "2025-12-24"
---

## Overview

The AHT10 is a low-cost temperature and humidity sensor that communicates over I2C with superb accuracy

Component Features:

- ±0.3°C - Typical accuracy for temperature
- ±2% RH - Typical accuracy for humidity
- I2C interface - 0x38 address (⚠️ fixed - only 1 supported per bus, at least per datasheet)
- The component itself: 1.8V-3.6V supply (⚠️ does not support 5V)

Module Features:

- 1.8V-6V power supply - has XC6206P332PRN 3.3V LDO on board
- I2C address 0x38 default, has place to solder jumper for 0x39 address

## Test Status

- [ ] Basic Configuration
