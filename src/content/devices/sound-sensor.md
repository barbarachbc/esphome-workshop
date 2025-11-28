---
title: 'Sound Sensor Module'
description: 'Microphone sound detection sensor with digital and analog output'
category: "sensor"
manufacturer: "Generic"
model: "Sound Sensor"
connectionTypes: ["gpio", "analog"]
components: ["binary_sensor", "adc"]
tags: ["sensor", "sound", "microphone", "audio", "noise"]
productionStatus: "active"
purchaseLinks:
  - vendor: "Amazon"
    url: "https://www.amazon.co.uk/dp/B01DKAAYK2"
  - vendor: AZ Delivery
    url: https://www.az-delivery.de/en/products/16-in-1-kit-zubehorset-fur-raspberry-pi-arduino-und-andere-mikrocontroller
references:
  - title: "Interface Sound Sensor with Arduino and Control Devices With a Clap"
    url: "https://lastminuteengineers.com/sound-sensor-arduino-tutorial/"
dateAcquired: "2016"
status: "pending"
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
- Uses LM393 comparator for triggering digital output

## Configuration Notes

Probably supported through [GPIO Binary Sensor](https://esphome.io/components/binary_sensor/gpio/) component. And analog through [ADC](https://esphome.io/components/sensor/adc/)