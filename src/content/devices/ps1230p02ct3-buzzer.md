---
title: 'PS1230P02CT3 Piezo Buzzer'
description: 'Piezoelectric buzzer with built-in oscillator'
category: "output"
manufacturer: "TDK"
model: "PS1230P02CT3"
connectionTypes: ["gpio"]
components: ["output", "rtttl"]
tags: ["buzzer", "piezo", "audio", "alarm"]
productionStatus: "active"
purchaseLinks:
  - vendor: "DigiKey"
    url: "https://www.digikey.com"
references:
  - title: "Datasheet"
    url: "https://product.tdk.com/en/search/sw_piezo/sw_piezo/piezo-buzzer/info?part_no=PS1230P02CT3"
  - title: "ESPHome RTTTL"
    url: "https://esphome.io/components/rtttl.html"
status: "unused"
---

## Overview

The PS1230P02CT3 is a compact piezoelectric buzzer with a built-in oscillator circuit from TDK. It requires only a DC voltage to produce sound, making it ideal for simple alert and notification applications.

The module features:
- Built-in oscillator (no external driver needed)
- Operating voltage: 3V-5V
- Sound pressure level: ~85dB at 10cm (3V)
- Resonant frequency: ~2300Hz
- Low current consumption: typically 10-30mA
- Simple 2-wire connection (+ and -)
- Compact 12mm diameter
- SMD or through-hole mounting options
- RoHS compliant

## Configuration Notes

- Requires single **GPIO** pin
- Can be driven directly from ESP32/ESP8266 GPIO
- Use **output** component for simple on/off control
- Use **rtttl** component for melodies
- Lower voltage requirement makes it suitable for 3.3V systems
- Consider adding series resistor to limit current if needed

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

# Example: Play notification sound
button:
  - platform: template
    name: "Play Beep"
    on_press:
      - rtttl.play: 'beep:d=4,o=5,b=100:16c,16d,16e'
```
