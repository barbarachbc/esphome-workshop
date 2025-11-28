---
title: 'Flash 5 Click'
description: '1Gbit SPI NOR Flash Memory Module (S25FL164K)'
category: "storage"
manufacturer: "MikroElektronika"
model: "MIKROE-2436"
connectionTypes: ["spi"]
components: ["spi"]
tags: ["flash", "storage", "memory", "spi"]
productionStatus: "active"
purchaseLinks:
  - vendor: "MikroE"
    url: "https://www.mikroe.com/flash-5-click"
references:
  - title: "Product Page"
    url: "https://www.mikroe.com/flash-5-click"
  - title: "Datasheet"
    url: "https://www.infineon.com/dgdl/Infineon-S25FL164K_128_Mb_(16_MB)_3.0_V_SPI_Flash_Memory-DataSheet-v13_00-EN.pdf"
status: "unused"
---

## Overview

Flash 5 Click is a Flash memory module based on the S25FL164K chip, a 1Gbit (128MB) serial NOR flash memory with SPI interface from Infineon (Cypress).

The module features:
- 1Gbit (128MB) storage capacity
- Standard SPI interface
- 108MHz clock frequency support
- Low power consumption
- Page program: 256 bytes
- Sector erase: 4KB
- Block erase: 32KB/64KB
- Wide voltage range: 2.7V-3.6V
- Industrial temperature range
- MikroBUS compatible
- Write protection features

## Configuration Notes

⚠️ **Note**: ESPHome does not have native support for external SPI flash as a storage component. This device is typically used at the hardware level or requires custom components for data storage.

- Requires **SPI** interface
- Typical SPI pins: CLK, MISO, MOSI, CS
- Operating voltage: 3.3V
- Large capacity suitable for data logging, configuration storage, or firmware updates
- Can be used for storing large amounts of data that don't fit in internal flash
