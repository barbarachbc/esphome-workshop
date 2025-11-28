---
title: 'Obstacle Avoidance Sensor'
description: 'Infrared obstacle detection and avoidance sensor module'
category: "sensor"
manufacturer: "Generic"
model: "IR Obstacle Sensor"
connectionTypes: ["gpio"]
components: ["binary_sensor"]
tags: ["sensor", "obstacle", "infrared", "ir", "proximity", "digital"]
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

The obstacle avoidance sensor module uses infrared light to detect objects and obstacles at close range.

The module features:
- Infrared transmitter and receiver
- Digital output (LOW when obstacle detected)
- Detection distance: 2-30cm (adjustable via potentiometer)
- Operating voltage: 3.3V-5V
- Detection angle: ~35 degrees
- Adjustable sensitivity
- Fast response time
- Onboard LED indicators (power and detection)
- Uses LM393 comparator for triggering digital output

## Obstacle avoidance sensor module
IR-reflection sensor, useful for obstacle avoidance applications. When an obstacle is in front of the IR
sender/receiver the ‘Out’ pin is switched low (active low). The circuit sensitivity can be adjusted with a
pot. The obstacle detection distance can be adjusted up to approximately 7cm. An enable (EN) jumper
can be fitted for continuous operation. Removal of the EN jumper allows an external logic signal (at
the EN pin) to switch the detector on and off (low = active, high = off)

## Configuration Notes

Probably supported through [GPIO Binary Sensor](https://esphome.io/components/binary_sensor/gpio/) component.