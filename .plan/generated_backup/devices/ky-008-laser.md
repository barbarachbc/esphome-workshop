---
title: 'KY-008 Laser Module'
description: '650nm red laser diode transmitter module'
category: "output"
manufacturer: "Generic"
model: "KY-008"
connectionTypes: ["digital"]
components: ["gpio", "output"]
tags: ["laser", "transmitter", "650nm", "red", "ky-008"]
productionStatus: "active"
purchaseLinks:
  - vendor: "Amazon"
    url: "https://www.amazon.co.uk/dp/B01DKAAYK2"
references:
  - title: "ESPHome GPIO Switch"
    url: "https://esphome.io/components/switch/gpio.html"
status: "unused"
---

## Overview

The KY-008 laser module is a 650nm red laser diode transmitter for pointing, alignment, and sensor applications.

The module features:
- 650nm red laser diode
- Operating voltage: 5V
- Operating current: <40mA
- Power: <5mW (Class 2 laser)
- Compact module design
- Easy to control via digital signal
- Suitable for laser pointing, alignment, communication, sensors
- Compatible with 3-pin interface

## Configuration Notes

- Requires **GPIO** pin configured as output
- Platform: **gpio** (switch or output)
- Control with HIGH/LOW signal
- Laser safety: Class 2 laser - do not point at eyes
- May require external transistor for higher current
- Can be PWM controlled for intensity modulation

### Basic Configuration

```yaml
esphome:
  name: my-laser-module

esp32:
  board: esp32dev
  framework:
    type: esp-idf

switch:
  - platform: gpio
    pin: GPIO25
    name: "Laser"
    id: laser_output
```
