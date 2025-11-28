---
title: 'Tilt Sensor Module'
description: 'Ball-type tilt switch sensor for angle detection'
category: "sensor"
manufacturer: "Generic"
model: "Tilt Switch"
connectionTypes: ["gpio"]
components: ["binary_sensor"]
tags: ["sensor", "tilt", "angle", "switch", "digital"]
productionStatus: "active"
purchaseLinks:
  - vendor: "Amazon"
    url: "https://www.amazon.co.uk/dp/B01DKAAYK2"
  - vendor: AZ Delivery
    url: https://www.az-delivery.de/en/products/16-in-1-kit-zubehorset-fur-raspberry-pi-arduino-und-andere-mikrocontroller
references:
  - title: "Interfacing Ball Tilt Switch Sensor with Arduino"
    url: "https://lastminuteengineers.com/ball-tilt-switch-sensor-arduino-tutorial/"
dateAcquired: "2016"
status: "pending"
---

## Overview

The tilt sensor module uses a ball-type tilt switch to detect orientation changes and tilting.

The module features:
- Ball-type tilt switch mechanism
- Digital output (HIGH/LOW based on tilt)
- Simple on/off detection
- Operating voltage: 3.3V-5V
- No moving parts to wear out
- Wide sensing angle
- Quick response
- Onboard LED indicator
- Uses LM393 comparator for triggering digital output

## Configuration Notes

Supported through [GPIO Binary Sensor](https://esphome.io/components/binary_sensor/gpio/) component.