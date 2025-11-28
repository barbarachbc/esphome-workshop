---
title: 'Vibration Sensor Module'
description: 'SW-420 vibration detection sensor module'
category: "sensor"
manufacturer: "Generic"
model: "SW-420"
connectionTypes: ["gpio"]
components: ["binary_sensor"]
tags: ["sensor", "vibration", "shock", "sw-420", "digital"]
productionStatus: "active"
purchaseLinks:
  - vendor: "Amazon"
    url: "https://www.amazon.co.uk/dp/B01DKAAYK2"
  - vendor: AZ Delivery
    url: https://www.az-delivery.de/en/products/16-in-1-kit-zubehorset-fur-raspberry-pi-arduino-und-andere-mikrocontroller
references:
  - title: "Vibration Sensor Module"
    url: "https://docs.sunfounder.com/projects/ultimate-sensor-kit/en/latest/components_basic/04-component_vibration.html"
dateAcquired: "2016"
status: "pending"
---

## Overview

The vibration sensor module uses the SW-420 motion sensor to detect vibration, shock, and movement.

The module features:
- SW-420 vibration sensor chip
- Digital output (HIGH when vibration detected)
- Adjustable sensitivity via potentiometer
- Operating voltage: 3.3V-5V
- Quick response time
- Non-directional vibration detection
- Onboard LED indicator
- Uses LM393 comparator for triggering digital output

## Configuration Notes

Supported through [GPIO Binary Sensor](https://esphome.io/components/binary_sensor/gpio/) component.