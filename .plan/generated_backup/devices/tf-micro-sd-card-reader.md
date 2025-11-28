---
title: 'TF Micro SD Card Reader'
description: 'SPI Micro SD card module for external storage'
category: "storage"
manufacturer: "Generic"
model: "SD/TF Card"
connectionTypes: ["spi"]
components: ["spi"]
tags: ["sd-card", "storage", "spi", "microsd"]
productionStatus: "active"
purchaseLinks:
  - vendor: "AliExpress"
    url: "https://www.aliexpress.com"
references:
  - title: "Arduino SD Library"
    url: "https://www.arduino.cc/reference/en/libraries/sd/"
status: "unused"
---

## Overview

The TF (TransFlash) Micro SD Card Reader module provides an SPI interface for reading and writing data to Micro SD/SDHC cards, enabling expanded storage for embedded projects.

The module features:
- Standard SPI interface
- Supports Micro SD and Micro SDHC cards
- Built-in level shifter (5V tolerant in most modules)
- Card detect pin (on some modules)
- Operating voltage: 3.3V-5V (depending on module)
- Typical pins: CS, SCK, MOSI, MISO
- Support for FAT16/FAT32 file systems
- Hot-swap capability

## Configuration Notes

⚠️ **Note**: ESPHome does not have native SD card logging or storage component. SD card functionality typically requires custom components or use of ESP-IDF SD card APIs in custom code.

- Requires **SPI** interface
- Typical connections: CS, SCK (CLK), MOSI (CMD/DI), MISO (DAT0/DO)
- Operating voltage: 3.3V (some modules have 5V level shifters)
- Useful for data logging, configuration storage, or large data files
- Maximum SPI speed varies by card type and quality
- Consider using ESP32's SDMMC peripheral for faster speeds (if available)
