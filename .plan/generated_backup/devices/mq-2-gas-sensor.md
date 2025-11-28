---
title: 'MQ-2 Gas Sensor'
description: 'Combustible gas and smoke detection sensor module'
category: "sensor"
manufacturer: "Generic"
model: "MQ-2"
connectionTypes: ["digital", "analog"]
components: ["binary_sensor", "adc"]
tags: ["sensor", "gas", "smoke", "mq-2", "combustible"]
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

The MQ-2 gas sensor detects combustible gases and smoke including LPG, propane, methane, hydrogen, alcohol, and smoke.

The module features:
- Detects: LPG, propane, methane, hydrogen, alcohol, smoke
- Detection range: 300-10,000 ppm
- Both digital and analog outputs
- Digital output with adjustable threshold
- Operating voltage: 5V
- Preheat time: 20 seconds (full stabilization ~24-48 hours)
- Adjustable sensitivity via potentiometer
- Onboard LED indicators
- Suitable for gas leak detection, safety alarms, air quality monitoring

## Configuration Notes

- Can use **GPIO** for digital output or **ADC** for analog output
- Platform: **gpio** (binary_sensor) or **adc** (sensor)
- Requires 5V power supply and heater warm-up time
- Digital output: LOW when gas concentration exceeds threshold
- Analog output: voltage increases with gas concentration
- Sensor requires calibration in clean air
- Not suitable for precise gas concentration measurement

### Basic Configuration (Digital)

```yaml
esphome:
  name: my-mq2-sensor

esp32:
  board: esp32dev
  framework:
    type: esp-idf

binary_sensor:
  - platform: gpio
    pin: 
      number: GPIO15
      mode: INPUT_PULLUP
      inverted: true
    name: "Gas Detected"
    device_class: gas
```

### Analog Configuration

```yaml
sensor:
  - platform: adc
    pin: GPIO36
    name: "Gas Level"
    update_interval: 2s
    attenuation: 11db
    filters:
      - multiply: 3.3
```
