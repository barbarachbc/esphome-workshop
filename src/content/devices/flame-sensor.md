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
  - vendor: AZ Delivery
    url: https://www.az-delivery.de/en/products/16-in-1-kit-zubehorset-fur-raspberry-pi-arduino-und-andere-mikrocontroller
dateAcquired: "2016"
status: "pending"
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
- Uses LM393 comparator for triggering digital output

## Configuration Notes

Probably supported through [GPIO Binary Sensor](https://esphome.io/components/binary_sensor/gpio/) component. And analog through [ADC](https://esphome.io/components/sensor/adc/)
