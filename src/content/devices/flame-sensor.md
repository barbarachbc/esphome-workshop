---
title: 'Flame Sensor Module'
description: 'IR flame detection sensor module for fire detection'
category: "sensor"
manufacturer: "Generic"
model: "Flame Sensor"
connectionTypes: ["gpio", "analog"]
components: ["binary_sensor", "adc"]
tags: ["sensor", "flame", "fire", "infrared", "ir"]
productionStatus: "active"
purchaseLinks:
  - vendor: "Amazon"
    url: "https://www.amazon.co.uk/dp/B01DKAAYK2"
references:
  - title: "ESPHome Binary Sensor"
    url: "https://esphome.io/components/binary_sensor/index.html"
status: "unused"
---

## Overview

The flame sensor module detects flames and fire using an infrared receiver sensitive to wavelengths between 760nm-1100nm.

The module features:
- IR flame detection (760nm-1100nm wavelength)
- Both digital and analog outputs
- Detection angle: ~60 degrees
- Detection distance: up to 100cm (depends on flame intensity)
- Operating voltage: 3.3V-5V
- Adjustable sensitivity via potentiometer
- Quick response time
- Onboard LED indicator
- Suitable for fire alarm systems

## Configuration Notes

- Can use **GPIO** for digital output or **ADC** for analog output
- Platform: **gpio** (binary_sensor) or **adc** (sensor)
- Digital output: LOW when flame detected, HIGH when no flame
- Analog output: voltage varies with flame intensity
- Detection range can be adjusted via onboard potentiometer
- Best results in environments with minimal IR interference

### Basic Configuration (Digital)

```yaml
esphome:
  name: my-flame-sensor

esp32:
  board: esp32dev
  framework:
    type: esp-idf

binary_sensor:
  - platform: gpio
    pin: 
      number: GPIO18
      mode: INPUT_PULLUP
      inverted: true
    name: "Flame Detected"
    device_class: smoke
```
