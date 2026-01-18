---
title: 'Touch pHAT'
description: 'Touch pHAT with 6 touch pads and 6 LEDs by Pimoroni'
category: "input"
manufacturer: "Pimoroni"
model: "PIM272"
connectionTypes: ["gpio"]
components: ["esp32", "external-components", "cap1166", "i2c", "binary-sensor-cap1166"]
tags: ["led", "touch"]
productionStatus: "discontinued"
purchaseLinks:
  - vendor: "The PiHut"
    url: "https://thepihut.com/products/touch-phat?variant=31956265105"
  - vendor: "Pimoroni"
    url: "https://shop.pimoroni.com/products/touch-phat"
references:
  - title: Pinout Diagram
    url: "https://pinout.xyz/pinout/touch_phat"
  - title: CAP1188 for arduino
    url: "https://learn.adafruit.com/adafruit-cap1188-breakout/using-with-arduino"
  - title: Adafruit GitHub
    url: "https://github.com/adafruit/Adafruit_CAP1188_Library/blob/master/Adafruit_CAP1188.h"
  - title: Python using cap1xxx chip
    url: "https://github.com/bablokb/pcb-pico-pi-base/blob/main/lib/cap1xxx.py"
  - title: How pHat is using cap1xxx chip
    url: "https://github.com/pimoroni/touch-phat/blob/master/library/touchphat/__init__.py"
  - title: Datasheet
    url: "https://ww1.microchip.com/downloads/aemDocuments/documents/OTH/ProductDocuments/DataSheets/00001621B.pdf"
  - title: External component
    url: "https://github.com/barbarachbc/esphomecomponents"
dateAcquired: "2017"
status: "ready"
lastModified: "2026-01-18"
image: "/images/devices/thumbnails/touch-phat.jpg"
---

## Overview

Six touch-sensitive buttons with added LEDs. It uses the CAP1166 capacitive touch and LED driver chip.
The LEDs have been under-mounted and shine through exposed sections of the PCB to give
a pleasing yellow-green glow and a completely smooth top surface!

![Touch pHat photo](./images/touch-phat/touch-phat.jpg)

The board features:

- Six capacitive touch buttons
- Six bright white under-mounted LEDs
- Microchip CAP1166 capacitive touch and LED driver chip
- I2C: 0x2c

## Configuration Notes

Not supported by ESPHome. The chip is nearly exactly the same as
[CAP1188](https://esphome.io/components/binary_sensor/cap1188/).
The only difference is that CAP1188 supports 8, and CAP1166 supports 6 touch sensors and LEDs.
Addresses and functionalities are all the same.

**NOTE** The LEDs are not linked to Touch Pads. LEDs are positioned under different pads so they have to be disconnected.

✅ External component [available](github://barbarachbc/esphomecomponents) (by me 🙂)

### Basic Configuration

```yaml
esp32:
  board: esp32dev
  framework:
#    type: arduino
    type: esp-idf

external_components:
    - source: github://barbarachbc/esphomecomponents
      components: [ cap1166 ]
      refresh: 5min
          
cap1166:
  - id: touch_phat
    address: 0x2C
    touch_threshold: 0x40
    allow_multiple_touches: true

i2c:
  id: i2c_bus
  sda: GPIO33
  scl: GPIO32

binary_sensor:
  - platform: cap1166
    id: touch_key0
    channel: 0
    name: "Touch Key 0"
    on_press:
      then:
        - ....
    on_release:
      then:
        - ....
    on_click:
      min_length: 50ms
      max_length: 350ms
      then:
        - lambda: |-
            ESP_LOGI("my_test", "Touched Key 0");
  - platform: cap1166
    id: touch_key1
    channel: 1
    name: "Touch Key 1"
    on_press:
      ....

```

**NEXT:** add notes on all the functionality of the external component

## Other Images

Touch pHat back:
![Touch pHat back](./images/touch-phat/touch-phat-back.jpg)
