---
title: 'Unicorn pHAT'
description: '4x8 RGB LED matrix HAT for Raspberry Pi Zero by Pimoroni'
category: "display"
manufacturer: "Pimoroni"
model: "PIM168"
connectionTypes: ["gpio"]
components: ["light", "neopixelbus"]
tags: ["led", "matrix", "rgb", "display", "sk6812"]
productionStatus: "discontinued"
purchaseLinks:
  - vendor: "The PiHut"
    url: "https://thepihut.com/products/unicorn-phat?variant=18970079428"
references:
  - title: Pinout Diagram
    url: "https://pinout.xyz/pinout/unicorn_phat"
  - title: Pimoroni Python Library
    url: "https://github.com/pimoroni/unicorn-hat"
  - title: Adafruit NeoPixel Library
    url: "https://github.com/adafruit/Adafruit_NeoPixel"
dateAcquired: "2017"
status: "testing"
---

## Overview

The Unicorn pHAT is a compact 4x8 RGB LED matrix designed as a HAT for Raspberry Pi Zero. It features 32 individually addressable RGB LEDs (SK6812 compatible) in a 3.5mm x 3.5mm package, providing vibrant color display capabilities in a small form factor.

The board features:
- 4x8 (32 total) RGB LEDs
- SK6812 individually addressable LEDs (similar to WS2812B)
- 3.5mm x 3.5mm LED package
- Raspberry Pi HAT form factor
- Compatible with NeoPixel/WS2812 protocols

## Configuration Notes

Supported via ESPHome's [NeoPixelBus Light component](https://esphome.io/components/light/neopixelbus/). Note that NeoPixelBus only works with the Arduino framework.

For ESP-IDF use [ESP32 RMT LED Strip](https://esphome.io/components/light/esp32_rmt_led_strip/)

### Basic Configuration

```yaml
#works with arduino only
light:
  - platform: neopixelbus
    variant: 800KBPS
    num_leds: 32
    type: GRB
    name: "My Unicorn Light"
    id: my_unicorn_phat
    pin: GPIO17
```

```yaml
#works with esp-idf
light:
  - platform: esp32_rmt_led_strip
    chipset: ws2812
    num_leds: 32
    rgb_order: GRB
    name: "My Light"
    internal: true
    id: my_strip
    pin: GPIO17
```
TODO: try with SK6812

TODO: try    
    effects:
      - random:
      - strobe:
      - addressable_rainbow: