---
title: 'Adafruit NeoPixel'
description: 'Addressable RGB LED strips and modules with WS2812/WS2812B chips'
category: "light"
manufacturer: "Adafruit"
model: "NeoPixel"
variants: ["Strip", "Ring", "Stick", "Matrix", "Individual LEDs"]
connectionTypes: ["gpio"]
components: ["light", "neopixelbus"]
tags: ["led", "rgb", "addressable", "neopixel", "ws2812", "ws2812b"]
productionStatus: "active"
purchaseLinks:
  - vendor: "Adafruit"
    url: "https://www.adafruit.com/category/168"
  - vendor: "Pimoroni"
    url: "https://shop.pimoroni.com/products/adafruit-neopixel-mini-pcb-pack-of-5?variant=526757957"
references:
  - title: "Adafruit NeoPixel Guide"
    url: "https://learn.adafruit.com/adafruit-neopixel-uberguide"
dateAcquired: "Feb 2023"
status: "testing"
---

## Overview

Adafruit NeoPixels are addressable RGB LEDs using WS2812/WS2812B chips, allowing individual control of each LED's color and brightness.

The NeoPixel family features:
- Individually addressable RGB LEDs
- WS2812 or WS2812B driver chips
- 16.7 million colors per LED
- Single-wire control interface
- Chainable design
- Operating voltage: 5V (LEDs) with 3.3V logic compatible
- Low power consumption per LED (~60mA at full white)
- Various form factors: strips, rings, sticks, matrices, individual LEDs
- Suitable for decorative lighting, indicators, displays, wearables

## Remarks

Supported through [NeoPixelBus](https://esphome.io/components/light/neopixelbus/), [ESP32 RMT LED Strip](https://esphome.io/components/light/esp32_rmt_led_strip/) - depending on the framework used.