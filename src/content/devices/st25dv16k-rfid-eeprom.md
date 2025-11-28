---
title: 'ST25DV16K RFID EEPROM'
description: 'NFC/RFID Dynamic Tag with I2C interface and 16Kbit EEPROM'
category: "communication"
manufacturer: "STMicroelectronics"
model: "ST25DV16K"
connectionTypes: ["i2c", "nfc"]
components: ["i2c"]
tags: ["nfc", "rfid", "eeprom", "i2c", "wireless"]
productionStatus: "active"
purchaseLinks:
  - vendor: "AliExpress"
    url: "https://www.aliexpress.com/item/1005002054278531.html"
references:
  - title: "Product Page"
    url: "https://www.adafruit.com/product/4701"
  - title: "Datasheet"
    url: "https://www.st.com/resource/en/datasheet/st25dv16k.pdf"
status: "unsupported"
dateAcquired: "Aug 2025"
---

## Overview

The ST25DV16K is a dynamic NFC/RFID tag IC with dual I2C and RF interfaces, featuring 16Kbit of EEPROM memory. The Adafruit breakout (Product #4701) includes the STEMMA QT connector for easy I2C connection.

The module features:
- 16Kbit (2KB) EEPROM memory
- ISO/IEC 15693 and NFC Forum Type 5 compatible
- Dual interface: I2C and RF (13.56MHz)
- Fast Transfer Mode (FTM) support
- Energy harvesting output pin
- Mailbox for dynamic data exchange
- Password protection
- Operating voltage: 2.7V-5.5V
- I2C address: 0x57 (system memory at 0x2D)
- STEMMA QT / Qwiic compatible
- GPO interrupt pin

## Configuration Notes

⚠️ **Note**: ESPHome does not have native support for ST25DV16K. You may need to use a custom component or access via raw I2C commands.

- Requires **I2C** interface
- I2C addresses: **0x57** (user memory), **0x2D** (system config)
- Can be accessed via NFC reader or I2C interface simultaneously
- Energy harvesting allows powering small circuits from RF field
- Useful for contactless data exchange, configuration, or identification
- EEPROM provides non-volatile storage
