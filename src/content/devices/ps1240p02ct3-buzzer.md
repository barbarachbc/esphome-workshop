---
title: 'PS1240P02CT3 Piezo Buzzer'
description: 'Piezoelectric buzzer with built-in oscillator'
category: "output"
manufacturer: "TDK"
model: "PS1240P02CT3"
connectionTypes: ["gpio"]
components: ["output", "rtttl"]
tags: ["buzzer", "piezo", "audio", "alarm"]
productionStatus: "active"
purchaseLinks:
  - vendor: "Mouser"
    url: "https://www.mouser.ie/ProductDetail/810-PS1240P02CT3"
references:
  - title: "Datasheet"
    url: "https://product.tdk.com/system/files/dam/doc/product/sw_piezo/sw_piezo/piezo-buzzer/catalog/piezoelectronic_buzzer_ps_en.pdf"
status: "pending"
dateAcquired: "Dec 2024"
---

## Overview

The PS1240P02CT3 is a compact piezoelectric buzzer with a built-in oscillator circuit from TDK. It requires only a DC voltage to produce sound, making it ideal for simple alert and notification applications.

The module features:
- Built-in oscillator (no external driver needed)
- Operating voltage: 3V - rectangular waves
- Sound pressure level: min 60dB at 10cm (3V)
- Resonant frequency: ~4000Hz
- Low current consumption: typically 10-30mA
- Simple 2-wire connection (+ and -)
- Compact 12mm diameter

## Configuration Notes

- Requires single **GPIO** pin
- Can be driven directly from GPIO (for lower voltage versions) (**NOTE** check this, this is probably possible with LEDC Output)
- May require transistor driver for higher voltage/current
- Use [**ESP32 LEDC Output**](https://esphome.io/components/output/ledc/) component for simple on/off control
- Use [**rtttl**](https://esphome.io/components/rtttl/) component for melodies
- It's resonant at 4KHz, so it will be loudest around that frequency, but it can work reasonably well on other frequencies

### Recommended driving circuit

![driver circuit](/images/piezoelectronic_buzzer_driver.png)