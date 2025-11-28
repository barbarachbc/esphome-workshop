---
title: 'Flash 5 Click'
description: '1Gbit SPI Serial SLC NAND Flash'
category: "storage"
manufacturer: "MikroElektronika"
model: "MIKROE-3780"
connectionTypes: ["spi"]
components: ["spi"]
tags: ["flash", "storage", "memory", "spi"]
productionStatus: "active"
purchaseLinks:
  - vendor: "MikroE"
    url: "https://www.mikroe.com/flash-5-click"
  - vendor: "Mouser"
    url: "https://www.mouser.ie/ProductDetail/Mikroe/MIKROE-3780?qs=rkhjVJ6%2F3EIC9zPadm205A%3D%3D"
references:
  - title: "Product Page"
    url: "https://www.mikroe.com/flash-5-click"
  - title: "Datasheet"
    url: "https://download.mikroe.com/documents/datasheets/W25N01GVZEIGIT_datasheet.pdf"
status: "unsupported"
dateAcquired: "2020"
---

## Overview

The Flash 5 click is based on the W25N01GVZEIG/IT (1G-bit) Serial SLC NAND Flash Memory from Winbond. The device operates on a single 3.3V power supply with current consumption as low as 25mA active and 10µA for standby.

The module features:
- 1Gbit (128MB) storage capacity
- 104MHz Standard/Dual/Quad SPI
- Low power consumption
- Supply Voltage: 3.3V
- MikroBUS compatible
- Write protection features

## Configuration Notes

Pins on mikroBUS:

- 2: WP (Write Protect)
- 3: CS
- 4: SCK
- 5: SDO
- 6: SDI
- 7: 3.3V
- 8, 9: GND
- 16: HLD (Hold)
- The rest not connected

## Remarks

⚠️ **Note**: ESPHome does not have native support for external SPI flash as a storage component. This device is typically used at the hardware level or requires custom components for data storage.
