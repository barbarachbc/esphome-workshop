---
title: 'Adafruit NeoPixel'
description: 'Addressable RGB LED strips and modules with WS2812/WS2812B chips'
category: "output"
manufacturer: "Adafruit"
model: "NeoPixel"
variants: ["Strip", "Ring", "Stick", "Matrix", "Individual LEDs"]
connectionTypes: ["digital"]
components: ["light", "neopixelbus"]
tags: ["led", "rgb", "addressable", "neopixel", "ws2812", "ws2812b"]
productionStatus: "active"
purchaseLinks:
  - vendor: "Adafruit"
    url: "https://www.adafruit.com/category/168"
  - vendor: "AliExpress"
    url: "https://www.aliexpress.com"
references:
  - title: "ESPHome NeoPixelBus"
    url: "https://esphome.io/components/light/neopixelbus.html"
  - title: "Adafruit NeoPixel Guide"
    url: "https://learn.adafruit.com/adafruit-neopixel-uberguide"
status: "unused"
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

## Configuration Notes

- Requires **single GPIO pin** for data
- Platform: **neopixelbus** or **fastled_clockless**
- Type: **WS2812** or **WS2812B**
- Requires accurate timing (use hardware SPI or RMT on ESP32)
- Power supply sizing important for large LED counts
- Consider level shifter for 3.3V to 5V logic
- Add capacitor (1000µF) across power supply
- Add resistor (300-500Ω) on data line

### Basic Configuration

```yaml
esphome:
  name: my-neopixel

esp32:
  board: esp32dev
  framework:
    type: esp-idf

light:
  - platform: neopixelbus
    type: GRB
    variant: WS2812
    pin: GPIO13
    num_leds: 30
    name: "NeoPixel Strip"
    effects:
      - random:
      - strobe:
      - flicker:
      - addressable_rainbow:
      - addressable_scan:
```

### Configuration with Multiple Segments

```yaml
light:
  - platform: neopixelbus
    type: GRB
    variant: WS2812
    pin: GPIO13
    num_leds: 60
    name: "NeoPixel Strip"
    id: led_strip
    
  - platform: partition
    name: "Segment 1"
    segments:
      - id: led_strip
        from: 0
        to: 19
        
  - platform: partition
    name: "Segment 2"
    segments:
      - id: led_strip
        from: 20
        to: 39
```
