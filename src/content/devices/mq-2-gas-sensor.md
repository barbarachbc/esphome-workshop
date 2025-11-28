---
title: 'MQ-2 Gas Sensor'
description: 'Combustible gas and smoke detection sensor module'
category: "sensor"
manufacturer: "Generic"
model: "MQ-2"
connectionTypes: ["gpio", "analog"]
components: ["binary_sensor", "adc"]
tags: ["sensor", "gas", "smoke", "mq-2", "combustible"]
productionStatus: "active"
purchaseLinks:
  - vendor: "Amazon"
    url: "https://www.amazon.co.uk/dp/B01DKAAYK2"
  - vendor: AZ Delivery
    url: https://www.az-delivery.de/en/products/16-in-1-kit-zubehorset-fur-raspberry-pi-arduino-und-andere-mikrocontroller
references:
  - title: How MQ2 Gas/Smoke Sensor Works
    url: "https://lastminuteengineers.com/mq2-gas-senser-arduino-tutorial/"
dateAcquired: "2016"
status: "pending"
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
- Uses LM393 comparator for triggering digital output

## Configuration Notes

Probably supported through [GPIO Binary Sensor](https://esphome.io/components/binary_sensor/gpio/) component. And analog through [ADC](https://esphome.io/components/sensor/adc/)
