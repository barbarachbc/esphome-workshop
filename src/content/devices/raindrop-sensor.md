---
title: 'Raindrop Detection Sensor'
description: 'Water detection sensor for rain and moisture sensing'
category: "sensor"
manufacturer: "Generic"
model: "Rain Sensor"
connectionTypes: ["gpio", "analog"]
components: ["binary_sensor", "adc"]
tags: ["sensor", "rain", "water", "moisture", "detection"]
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

The raindrop detection sensor detects water droplets and measures rain intensity using a resistive sensing board.

The module features:
- Resistive rain sensing board
- Both digital and analog outputs
- Digital output with adjustable threshold
- Analog output for rain intensity measurement
- Operating voltage: 3.3V-5V
- Large detection area
- Adjustable sensitivity via potentiometer
- Onboard LED indicators
- Nickel-plated PCB for weather resistance
- Suitable for weather stations, irrigation control, vehicle automation

## Configuration Notes

- Can use **GPIO** for digital output or **ADC** for analog output
- Platform: **gpio** (binary_sensor) or **adc** (sensor)
- Digital output: LOW when water detected
- Analog output: voltage decreases with water presence
- Sensitivity adjustable via onboard potentiometer
- Sensor board may require periodic cleaning

### Basic Configuration (Digital)

```yaml
esphome:
  name: my-rain-sensor

esp32:
  board: esp32dev
  framework:
    type: esp-idf

binary_sensor:
  - platform: gpio
    pin: 
      number: GPIO2
      mode: INPUT_PULLUP
      inverted: true
    name: "Rain Detected"
    device_class: moisture
```

### Analog Configuration

```yaml
sensor:
  - platform: adc
    pin: GPIO39
    name: "Rain Intensity"
    update_interval: 2s
    attenuation: 11db
    filters:
      - lambda: return 100.0 - (x / 3.3 * 100.0);
    unit_of_measurement: "%"
```
