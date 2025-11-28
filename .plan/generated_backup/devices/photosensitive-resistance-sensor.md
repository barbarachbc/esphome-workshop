---
title: 'Photosensitive Resistance Sensor'
description: 'Light-dependent resistor (LDR) analog light sensor module'
category: "sensor"
manufacturer: "Generic"
model: "Photoresistor Module"
connectionTypes: ["analog"]
components: ["adc", "sensor"]
tags: ["sensor", "light", "ldr", "photoresistor", "analog"]
productionStatus: "active"
purchaseLinks:
  - vendor: "Amazon"
    url: "https://www.amazon.co.uk/dp/B01DKAAYK2"
references:
  - title: "ESPHome ADC Sensor"
    url: "https://esphome.io/components/sensor/adc.html"
status: "unused"
---

## Overview

The photosensitive resistance sensor module uses a light-dependent resistor (LDR) to detect ambient light levels.

The module features:
- Photoresistor (light-dependent resistor)
- Analog output (voltage varies with light intensity)
- Digital output with adjustable threshold (via potentiometer)
- Operating voltage: 3.3V-5V
- Detection range: varies with ambient light
- Quick response time
- Wide sensing range
- Onboard LED indicator
- Compact PCB module

## Configuration Notes

- Requires **ADC** (Analog-to-Digital Converter)
- Platform: **adc**
- Connect analog output to ESP GPIO with ADC capability
- Output voltage increases with light intensity
- Suitable for light detection, day/night sensing, automatic lighting control
- May require calibration for specific applications

### Basic Configuration

```yaml
esphome:
  name: my-light-sensor

esp32:
  board: esp32dev
  framework:
    type: esp-idf

sensor:
  - platform: adc
    pin: GPIO34
    id: light_sensor
    name: "Light Level"
    update_interval: 2s
    attenuation: 11db
    filters:
      - sliding_window_moving_average:
          window_size: 5
          send_every: 5
```
