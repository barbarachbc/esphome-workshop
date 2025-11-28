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
references:
  - title: "ESPHome DS1302"
    url: "https://esphome.io/components/time/ds1302.html"
status: "unused"
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

## Configuration Notes

- Requires **three GPIO pins** (CLK, DAT, CE)
- Platform: **ds1302**
- Battery backup maintains time during power loss
- Can be used as time source for ESPHome
- Time can be synchronized from Home Assistant or NTP
- RAM can store small amounts of persistent data

### Basic Configuration

```yaml
esphome:
  name: my-rtc-module

esp32:
  board: esp32dev
  framework:
    type: esp-idf

time:
  - platform: ds1302
    id: rtc_time
    cs_pin: GPIO5
    dio_pin: GPIO4
    clk_pin: GPIO18
    update_interval: 60s
```
