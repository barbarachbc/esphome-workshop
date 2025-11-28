---
title: 'KY-008 Laser Module'
description: '650nm red laser diode transmitter module'
category: "peripheral"
manufacturer: "Generic"
model: "KY-008"
connectionTypes: ["gpio"]
components: ["gpio", "output"]
tags: ["laser", "transmitter", "650nm", "red", "ky-008"]
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

The KY-008 laser module is a 650nm red laser diode transmitter for pointing, alignment, and sensor applications.

The module features:
- 650nm red laser diode
- Operating voltage: 3.3V-5V
- Operating current: <40mA
- Power: <5mW (Class 2 laser)

## Remarks

Can use PWM output to control the laser. Consider using [ESP32 LEDC Output](https://esphome.io/components/sensor/rotary_encoder/)