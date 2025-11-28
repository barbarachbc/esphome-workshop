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
  - vendor: AZ Delivery
    url: https://www.az-delivery.de/en/products/16-in-1-kit-zubehorset-fur-raspberry-pi-arduino-und-andere-mikrocontroller
references:
  - title: "Rain Sensor Arduino Tutorial"
    url: "https://lastminuteengineers.com/rain-sensor-arduino-tutorial/"
dateAcquired: "2016"
status: "pending"
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
- Uses LM393 comparator for triggering digital output

## Configuration Notes


Probably supported through [GPIO Binary Sensor](https://esphome.io/components/binary_sensor/gpio/) component. And analog through [ADC](https://esphome.io/components/sensor/adc/)