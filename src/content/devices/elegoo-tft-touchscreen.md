---
title: 'ELEGOO UNO R3 2.8" TFT Touch Screen'
description: '2.8" TFT LCD touchscreen shield with SD card socket'
category: "display"
manufacturer: "ELEGOO"
model: "UNO R3 2.8 TFT Shield"
connectionTypes: ["spi"]
components: ["spi", "display", "touchscreen", "sd_card"]
tags: ["display", "tft", "touchscreen", "lcd", "shield", "sd-card"]
productionStatus: "active"
purchaseLinks:
  - vendor: "Amazon"
    url: "https://www.amazon.co.uk/dp/B01EUVJYME"
references:
  - title: Elegoo Manual Download
    url: https://www.elegoo.com/blogs/arduino-projects/elegoo-2-8-inch-touch-screen-for-raspberry-pi-manual
  - title: Instructables
    url: https://www.instructables.com/UNO-R3-28-TFT-Touch-Screen-With-SD-Card-Socket-for/
dateAcquired: "2016"
status: "unsupported"
---

## Overview

The ELEGOO 2.8" TFT Touch Screen is a color LCD touchscreen shield with SD card socket for Arduino UNO.

The shield features:
- 2.8" TFT LCD display (240x320 pixels)
- Resistive touchscreen
- SD card socket for data storage
- SPI interface for touchscreen and SD Card
- Operating voltage: 5V (3.3V compatible with level shifters)
- 65K color display
- ILI9341 or similar display driver
- 8 Bit parallel interface for display
- Shield form factor (though adaptable to ESP32)
- Backlight control

## Remarks

While ILI9341 is supported through [ili9xxx](https://esphome.io/components/display/ili9xxx/) and [MIPI SPI](https://esphome.io/components/display/mipi_spi/) components, they both use SPI bus for sending display data. This touch screen uses parallel interface and SPI is used for control.