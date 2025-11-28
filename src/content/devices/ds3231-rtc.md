---
title: 'DS3231 Real Time Clock Module'
description: 'RTC module with battery backup for timekeeping'
category: "sensor"
manufacturer: "Dallas/Maxim"
model: "DS3231"
connectionTypes: ["spi"]
components: ["time", "ds3231"]
tags: ["rtc", "clock", "time", "ds3231", "battery", "eeprom"]
productionStatus: "active"
purchaseLinks:
  - vendor: "Amazon"
    url: "https://www.amazon.co.uk/dp/B01DKAAYK2"
  - vendor: AZ Delivery
    url: https://www.az-delivery.de/en/products/16-in-1-kit-zubehorset-fur-raspberry-pi-arduino-und-andere-mikrocontroller
  - vendor: "Amazon"
    url: "https://www.amazon.co.uk/dp/B01H5NAFUY"
references:
  - title: Datasheet
    url: "https://www.analog.com/media/en/technical-documentation/data-sheets/ds3231.pdf"
  - title: Arduino Library
    url: "https://docs.arduino.cc/libraries/ds3231/"
dateAcquired: "2016"
status: "unsupported"
---

## Overview

The DS3231 is a real-time clock module that maintains accurate timekeeping even when main power is lost.
Module includes AT24C32 EEPROM (storage capacity 32K)

The module features:
- High-precision I²C real-time clock with temperature-compensated crystal oscillator (TCXO)
- Accuracy: ±2ppm (±1 minute per year) from -40°C to +85°C
- Battery backup (CR2032) for continuous timekeeping
- Operating voltage: 2.3V-5.5V
- Two programmable time-of-day alarms
- Programmable square-wave output
- Automatic leap year compensation (valid through 2100)
- The device integrates a digital temperature sensor: accuracy ±3°C
- I2C default address 0x68 (like DS1307)
- AT24C32 - default address is 0x57. Addresses can be shorted A0/A1/A2 to modify address

### Pinout

- 32K - 32kHz TCXO frequency output
- SQW - ~INT/SQW - provides either an interrupt signal due to alarm conditions or a square wave output
- SCL
- SDA
- VCC
- GND

## Remarks

It is possible that [DS1307](https://esphome.io/components/time/ds1307/) can be used to certain extent.
