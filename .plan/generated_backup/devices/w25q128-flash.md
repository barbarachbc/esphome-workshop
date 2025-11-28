---
title: 'W25Q128 Flash Memory'
description: '128Mbit (16MB) SPI NOR Flash Memory'
category: "storage"
manufacturer: "Winbond"
model: "W25Q128"
connectionTypes: ["spi"]
components: ["spi"]
tags: ["flash", "storage", "memory", "spi"]
productionStatus: "active"
purchaseLinks:
  - vendor: "AliExpress"
    url: "https://www.aliexpress.com"
references:
  - title: "Datasheet"
    url: "https://www.winbond.com/hq/product/code-storage-flash-memory/serial-nor-flash/?__locale=en&partNo=W25Q128JV"
status: "unused"
---

## Overview

The W25Q128 is a 128Mbit (16MB) serial NOR flash memory device with SPI interface, commonly used for external storage in embedded systems.

The module features:
- 128Mbit (16MB) storage capacity
- Standard/Dual/Quad SPI interface
- 104MHz clock frequency
- Low power consumption
- Page program: 256 bytes
- Sector erase: 4KB
- Block erase: 32KB/64KB
- Wide voltage range: 2.7V-3.6V
- Industrial temperature range: -40°C to +85°C

## Configuration Notes

⚠️ **Note**: ESPHome does not have native support for external SPI flash as a storage component. This device is typically used at the hardware level for program storage or requires custom components for data storage.

- Requires **SPI** interface
- Typical SPI pins: CLK, MISO (DO), MOSI (DI), CS
- Operating voltage: 3.3V
- Can be used for storing large amounts of data that don't fit in internal flash
