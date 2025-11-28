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
  - title: "ESPHome ILI9xxx"
    url: "https://esphome.io/components/display/ili9xxx.html"
  - title: "ESPHome Touchscreen"
    url: "https://esphome.io/components/touchscreen/index.html"
status: "unused"
---

## Overview

The ELEGOO 2.8" TFT Touch Screen is a colorful LCD touchscreen shield with SD card socket for Arduino/ESP32 projects.

The shield features:
- 2.8" TFT LCD display (240x320 pixels)
- Resistive touchscreen
- SD card socket for data storage
- SPI interface
- Operating voltage: 5V (3.3V compatible with level shifters)
- 65K color display
- ILI9341 or similar display driver
- Shield form factor (though adaptable to ESP32)
- Backlight control
- Suitable for GUI interfaces, data visualization, touch controls

## Configuration Notes

- Requires **SPI** interface for display and SD card
- Platform: **ili9xxx** (likely ILI9341 or ILI9340)
- Display resolution: **240x320**
- Touchscreen requires separate touchscreen component
- SD card can be accessed via **spi** component
- May require level shifters for 3.3V ESP32 compatibility
- Shield designed for Arduino but can be adapted to ESP32

### Basic Configuration

```yaml
esphome:
  name: my-tft-touchscreen

esp32:
  board: esp32dev
  framework:
    type: esp-idf

spi:
  clk_pin: GPIO18
  mosi_pin: GPIO23
  miso_pin: GPIO19

display:
  - platform: ili9xxx
    model: ILI9341
    cs_pin: GPIO15
    dc_pin: GPIO2
    reset_pin: GPIO4
    rotation: 90
    lambda: |-
      it.fill(COLOR_BLACK);
      it.print(120, 160, id(font), COLOR_WHITE, TextAlign::CENTER, "Hello!");

font:
  - file: "gfonts://Roboto"
    id: font
    size: 20

# Touchscreen configuration (if using XPT2046)
# touchscreen:
#   - platform: xpt2046
#     id: my_touchscreen
#     cs_pin: GPIO14
#     interrupt_pin: GPIO25
```
