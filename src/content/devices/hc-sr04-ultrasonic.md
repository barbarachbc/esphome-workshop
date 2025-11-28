---
title: 'HC-SR04 Ultrasonic Distance Sensor'
description: 'Ultrasonic ranging module for distance measurement'
category: "sensor"
manufacturer: "Generic"
model: "HC-SR04"
connectionTypes: ["gpio"]
components: ["ultrasonic", "sensor"]
tags: ["sensor", "ultrasonic", "distance", "ranging", "hc-sr04"]
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

The HC-SR04 ultrasonic sensor measures distance by emitting ultrasonic pulses and measuring the echo return time.

The module features:
- Measuring range: 2cm-400cm (0.8"-157")
- Accuracy: ±3mm
- Measuring angle: ~15 degrees
- Operating voltage: 5V
- Operating current: <15mA
- Ultrasonic frequency: 40kHz
- Trigger input: 10µs TTL pulse
- Echo output: pulse width proportional to distance
- Non-contact measurement

## Remarks

Requires two GPIOs, one for trigger pin, the other for echo.

Supported through [Ultrasonic Distance Sensor](https://esphome.io/components/sensor/ultrasonic/) component.