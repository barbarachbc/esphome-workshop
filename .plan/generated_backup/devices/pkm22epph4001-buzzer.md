---
title: 'PKM22EPPH4001 Piezo Buzzer'
description: 'Piezoelectric buzzer with built-in oscillator'
category: "output"
manufacturer: "Murata"
model: "PKM22EPPH4001"
connectionTypes: ["gpio"]
components: ["output", "rtttl"]
tags: ["buzzer", "piezo", "audio", "alarm"]
productionStatus: "active"
purchaseLinks:
  - vendor: "DigiKey"
    url: "https://www.digikey.com"
references:
  - title: "Datasheet"
    url: "https://www.murata.com/products/productdetail?partno=PKM22EPP-4001-B0"
  - title: "ESPHome RTTTL"
    url: "https://esphome.io/components/rtttl.html"
status: "unused"
---

## Overview

The PKM22EPPH4001 is a piezoelectric buzzer with a built-in oscillator circuit, requiring only a DC voltage to operate. It produces a loud tone suitable for alarms, notifications, and alerts.

The module features:
- Built-in oscillator (no external driver needed)
- Operating voltage: 3V-16V (typically 12V)
- Sound pressure level: ~85dB at 10cm (12V)
- Resonant frequency: ~4000Hz
- Low current consumption: ~3-30mA
- Simple 2-wire connection (+ and -)
- Compact 22mm diameter
- Through-hole mounting

## Configuration Notes

- Requires single **GPIO** pin
- Can be driven directly from GPIO (for lower voltage versions)
- May require transistor driver for higher voltage/current
- Use **output** component for simple on/off control
- Use **rtttl** component for melodies
- Consider PWM for volume control (if buzzer supports it)

### Basic Configuration

```yaml
esphome:
  name: my-buzzer

esp32:
  board: esp32dev
  framework:
    type: esp-idf

output:
  - platform: gpio
    pin: GPIO14
    id: buzzer_output

rtttl:
  output: buzzer_output
  on_finished_playback:
    - logger.log: "Buzzer finished"

# Example: Play notification sound
button:
  - platform: template
    name: "Play Alarm"
    on_press:
      - rtttl.play: 'alarm:d=4,o=5,b=140:16c,16c,16c,8c,16c,16c,16c,8c'
```
