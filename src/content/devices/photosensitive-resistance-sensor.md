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
  - vendor: AZ Delivery
    url: https://www.az-delivery.de/en/products/16-in-1-kit-zubehorset-fur-raspberry-pi-arduino-und-andere-mikrocontroller
dateAcquired: "2016"
status: "pending"
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
- Uses LM393 comparator for triggering digital output

## Configuration Notes

Probably supported through [GPIO Binary Sensor](https://esphome.io/components/binary_sensor/gpio/) component.

Analog output is not exposed by default.