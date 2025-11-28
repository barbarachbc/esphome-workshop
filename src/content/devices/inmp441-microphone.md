---
title: 'INMP441 Microphone'
description: 'Omnidirectional MEMS I2S microphone module'
category: "audio"
manufacturer: "InvenSense"
model: "INMP441"
connectionTypes: ["i2s"]
components: ["i2s_audio", "microphone"]
tags: ["microphone", "audio", "i2s", "mems"]
productionStatus: "active"
purchaseLinks:
  - vendor: "AliExpress"
    url: "https://www.aliexpress.com/item/1005007395298977.html"
references:
  - title: "ESPHome I2S Audio"
    url: "https://esphome.io/components/i2s_audio.html"
  - title: "Datasheet"
    url: "https://invensense.tdk.com/wp-content/uploads/2015/02/INMP441.pdf"
status: "unused"
---

## Overview

The INMP441 is a high-performance, low power, digital-output omnidirectional MEMS microphone with a bottom port and I2S digital output interface.

The module features:
- Digital I2S interface
- High signal-to-noise ratio: 61 dBA
- High sensitivity: -26 dBFS
- Wide frequency response: 60Hz to 15kHz
- Low power consumption: 1.4mA
- Operating voltage: 1.8V-3.3V
- 24-bit data output
- Omnidirectional pickup pattern
- Small form factor
- Bottom port design

## Configuration Notes

- Requires **I2S** interface
- Platform: **i2s_audio** with **microphone** component
- Typical connections: SCK (clock), WS (word select/LR), SD (data), VDD, GND, L/R (channel select)
- L/R pin: tie to GND for left channel, VDD for right channel
- Suitable for voice recognition, audio recording, and voice assistants
- Works well with ESP32 I2S interface

### Basic Configuration

```yaml
esphome:
  name: my-inmp441

esp32:
  board: esp32dev
  framework:
    type: esp-idf

i2s_audio:
  i2s_lrclk_pin: GPIO25
  i2s_bclk_pin: GPIO26

microphone:
  - platform: i2s_audio
    id: mic
    i2s_din_pin: GPIO33
    adc_type: external
    pdm: false
```
