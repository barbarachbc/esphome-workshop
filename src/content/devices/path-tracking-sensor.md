---
title: 'Path Tracking Sensor Module'
description: 'Infrared line tracking sensor for path following'
category: "sensor"
manufacturer: "Generic"
model: "IR Line Tracking"
connectionTypes: ["gpio"]
components: ["binary_sensor"]
tags: ["sensor", "tracking", "line", "infrared", "ir", "digital"]
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

The path tracking sensor module uses infrared light to detect dark lines on light surfaces or vice versa.

The module features:
- Infrared LED transmitter and receiver
- Digital output (HIGH on white surface, LOW on black line)
- Detection distance: 2-60mm (adjustable)
- Operating voltage: 3.3V-5V
- Adjustable sensitivity via potentiometer
- Fast response time
- Onboard LED indicators
- Uses LM393 comparator for triggering digital output

## Line tracking module
IR light reflection switch, useful for obstacle avoidance or line following on models that move around
the floor. An obstacle in front of the sender/receiver diodes will cause the ‘out’ pin to be pulled
low(active low). A pot allows adjustment of the circuit’s sensitivity. The detection distance can be up
to approximately 1 cm

## Configuration Notes

Probably supported through [GPIO Binary Sensor](https://esphome.io/components/binary_sensor/gpio/) component.