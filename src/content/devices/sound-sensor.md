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
image: "/images/devices/thumbnails/sound-sensor.jpg"
lastModified: "2025-12-13"
---

## Overview

The sound sensor module detects sound intensity using an electret microphone with adjustable sensitivity.

![Photo of the sound sensor](./images/sound-sensor/sound-sensor.jpg)

The module features:

- Electret microphone capsule
- Both digital and analog outputs
- Digital output with adjustable threshold
- Analog output for sound level measurement
- Operating voltage: 3.3V-5V
- Adjustable sensitivity via 100K (W104) trimmer potentiometer - ([Bochen 3296](https://www.bochen-guosheng.com/product_detail/170.html))
- Frequency range: 50Hz-10kHz
- Onboard LED indicators
- Uses LM393 comparator for triggering digital output

## Configuration Notes

Probably supported through:

- Digital: [GPIO Binary Sensor](https://esphome.io/components/binary_sensor/gpio/) component
- Analog through [ADC](https://esphome.io/components/sensor/adc/) component

## Other Images

Sound sensor:
![Sound sensor front photo](./images/sound-sensor/sound-sensor-front.jpg)

Sound sensor back:
![Sound sensor back photo](./images/sound-sensor/sound-sensor-back.jpg)
