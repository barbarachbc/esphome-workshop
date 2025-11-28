---
title: 'Reed Switch'
description: 'Magnetic proximity sensor switch'
category: "sensor"
manufacturer: "Generic"
model: "Reed Switch"
variants: ["Normally Open", "Normally Closed"]
connectionTypes: ["gpio"]
components: ["binary_sensor"]
tags: ["magnetic", "switch", "sensor", "proximity"]
productionStatus: "active"
purchaseLinks:
  - vendor: "AliExpress"
    url: "https://www.aliexpress.com"
references:
  - title: "ESPHome Binary Sensor"
    url: "https://esphome.io/components/binary_sensor/gpio.html"
status: "unused"
---

## Overview

A reed switch is a passive electronic switching device that operates via an applied magnetic field. It consists of two ferromagnetic contacts sealed in a glass tube that close when a magnetic field is present.

The module features:
- Magnetically actuated switch
- Normally Open (NO) or Normally Closed (NC) configurations
- No power required (passive device)
- Hermetically sealed contacts (protected from dust/moisture)
- Operating voltage: Up to switch rating (typically 100V-200V)
- Current rating: Typically 0.5A-1A
- Fast switching speed
- Long lifespan (millions of operations)
- Small form factor
- Common in door/window sensors

## Configuration Notes

- Requires single **GPIO** pin (with pull-up/pull-down resistor)
- Platform: **binary_sensor** with **gpio**
- Passive device - acts as mechanical switch
- Needs external or internal pull-up/pull-down resistor
- NO type: open circuit without magnet, closed with magnet
- NC type: closed without magnet, open with magnet
- Ideal for door/window sensors, position detection, security systems

### Basic Configuration (Normally Open)

```yaml
esphome:
  name: my-reed-switch

esp32:
  board: esp32dev
  framework:
    type: esp-idf

binary_sensor:
  - platform: gpio
    pin:
      number: GPIO14
      mode:
        input: true
        pullup: true
      inverted: true
    name: "Door Sensor"
    device_class: door
    filters:
      - delayed_on: 10ms
      - delayed_off: 10ms
```

### Advanced Configuration with Notifications

```yaml
binary_sensor:
  - platform: gpio
    pin:
      number: GPIO14
      mode:
        input: true
        pullup: true
      inverted: true
    name: "Window Sensor"
    device_class: window
    on_press:
      - logger.log: "Window opened!"
    on_release:
      - logger.log: "Window closed!"
```
