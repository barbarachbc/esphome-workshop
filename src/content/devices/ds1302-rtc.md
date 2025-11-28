---
title: 'DS1302 Real Time Clock Module'
description: 'RTC module with battery backup for timekeeping'
category: "sensor"
manufacturer: "Dallas/Maxim"
model: "DS1302"
connectionTypes: ["spi"]
components: ["time", "ds1302"]
tags: ["rtc", "clock", "time", "ds1302", "battery"]
productionStatus: "active"
purchaseLinks:
  - vendor: "Amazon"
    url: "https://www.amazon.co.uk/dp/B01DKAAYK2"
  - vendor: AZ Delivery
    url: https://www.az-delivery.de/en/products/16-in-1-kit-zubehorset-fur-raspberry-pi-arduino-und-andere-mikrocontroller
references:
  - title: Datasheet
    url: "https://www.analog.com/media/en/technical-documentation/data-sheets/ds1302.pdf"
  - title: Arduino Library
    url: "https://docs.arduino.cc/libraries/ds1302/"
dateAcquired: "2016"
status: "unsupported"
---

## Overview

The DS1302 is a real-time clock module that maintains accurate timekeeping even when main power is lost.

The module features:
- Real-time clock with seconds, minutes, hours, day, date, month, year
- Battery backup (CR2032) for continuous timekeeping
- Operating voltage: 2.0V-5.5V
- Low power consumption (<500nA in battery mode)
- Serial 3-wire interface
- 31-byte static RAM for data storage
- Automatic leap year compensation (valid through 2100)
- Suitable for data logging, alarm clocks, timestamping

## Remarks

DS1302 uses 3 wire protocol that is similar to SPI.