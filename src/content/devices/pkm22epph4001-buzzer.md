---
title: 'PKM22EPPH4001 Piezo Buzzer'
description: 'Piezoelectric buzzer with built-in oscillator'
category: "output"
manufacturer: "Murata"
model: "PKM22EPPH4001"
connectionTypes: ["gpio"]
components: ["output", "rtttl"]
tags: ["buzzer", "piezo", "audio", "alarm"]
productionStatus: "obsolete"
purchaseLinks:
  - vendor: "Mouser"
    url: "https://www.mouser.ie/ProductDetail/81-PKM22EPPH4001-B0"
references:
  - title: "Datasheet"
    url: "https://www.mouser.ie/datasheet/3/76/1/PKM22EPPH4001-B0.pdf"
  - title: "Application Notes"
    url: "https://datasheet.octopart.com/PKM22EPP-4001-Murata-datasheet-141439074.pdf"
  - title: "Overview of Driver Circuits for Piezo Transducer Buzzers"
    url: "https://www.allaboutcircuits.com/industry-articles/an-overview-of-driver-circuits-for-piezo-transducer-buzzers/"
status: "pending"
dateAcquired: "Dec 2024"
---

## Overview

The PKM22EPPH4001 is a piezoelectric buzzer with a built-in oscillator circuit, requiring only a DC voltage to operate. It produces a loud tone suitable for alarms, notifications, and alerts.

The module features:
- Oscillation Circuit NOT built in
- Drive Type: External
- Operating voltage: 3V square wave
- Sound pressure level: ~85dB at 10cm
- Resonant frequency: ~4000Hz
- Low current consumption: ~3-30mA
- Simple 2-wire connection (+ and -)
- Compact 22mm diameter
- Through-hole mounting

## Configuration Notes

- Requires single **GPIO** pin
- Can be driven directly from GPIO (for lower voltage versions) (**NOTE** check this, this is probably possible with LEDC Output)
- May require transistor driver for higher voltage/current
- Use [**ESP32 LEDC Output**](https://esphome.io/components/output/ledc/) component for simple on/off control
- Use [**rtttl**](https://esphome.io/components/rtttl/) component for melodies
- It's resonant at 4KHz, so it will be loudest around that frequency, but it can work reasonably well on other frequencies

### Recommended driving circuit

![driver circuit](/images/piezoelectronic_buzzer_driver.png)