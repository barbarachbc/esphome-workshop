---
title: 'Sound Sensor Module'
description: 'Microphone sound detection sensor with digital and analog output'
category: "sensor"
manufacturer: "Generic"
model: "Sound Sensor"
connectionTypes: ["digital", "analog"]
components: ["binary_sensor", "adc"]
tags: ["sensor", "sound", "microphone", "audio", "noise"]
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

The sound sensor module detects sound intensity using an electret microphone with adjustable sensitivity.

The module features:
- Electret microphone capsule
- Both digital and analog outputs
- Digital output with adjustable threshold
- Analog output for sound level measurement
- Operating voltage: 3.3V-5V
- Adjustable sensitivity via potentiometer
- Frequency range: 50Hz-10kHz
- Onboard LED indicators
- Suitable for sound-activated switches, noise monitoring, voice detection

## Configuration Notes

- Can use **GPIO** for digital output or **ADC** for analog output
- Platform: **gpio** (binary_sensor) or **adc** (sensor)
- Digital output: HIGH when sound exceeds threshold
- Analog output: voltage proportional to sound intensity
- Sensitivity adjustable via onboard potentiometer
- May require filtering for stable readings

### Basic Configuration (Digital)

```yaml
esphome:
  name: my-sound-sensor

esp32:
  board: esp32dev
  framework:
    type: esp-idf

binary_sensor:
  - platform: gpio
    pin: 
      number: GPIO26
      mode: INPUT_PULLUP
    name: "Sound Detected"
    filters:
      - delayed_on: 50ms
      - delayed_off: 500ms
```

### Analog Configuration

```yaml
sensor:
  - platform: adc
    pin: GPIO35
    name: "Sound Level"
    update_interval: 100ms
    attenuation: 11db
    filters:
      - sliding_window_moving_average:
          window_size: 10
```
