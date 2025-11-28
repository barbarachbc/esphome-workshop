---
title: 'HC-SR501 PIR Motion Sensor'
description: 'Passive infrared motion detection sensor module'
category: "sensor"
manufacturer: "Generic"
model: "HC-SR501"
connectionTypes: ["gpio"]
components: ["binary_sensor"]
tags: ["sensor", "pir", "motion", "infrared", "hc-sr501"]
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

The HC-SR501 PIR sensor detects motion by measuring changes in infrared radiation from moving warm objects.

The module features:
- Pyroelectric infrared sensor
- Detection range: up to 7 meters
- Detection angle: ~110 degrees
- Operating voltage: 4.5V-20V (typically 5V)
- Output: HIGH (3.3V) when motion detected
- Adjustable delay time: 0.3s-200s (Time Delay Adjust)
- Adjustable sensitivity (Sensitivity Adjust)
- Repeatable/non-repeatable trigger modes (Trigger Selection Jumper)

## Operation

If motion detected PIR sets output high for the set time delay. After time delay elapses, output is set low for about 3 seconds. During this time no motion will be detected. After 3 seconds, PIR will detect motion again.

- **Single Mode Trigger** - the time delay starts immediately when motion is first detected. Output will be high just for this time delay.
- **Repeatable Trigger** - Each detected motion resets the time delay, so the output will be HIGH all the while the motion is detected and then plus the delay time.

## Remarks

Probably supported through [GPIO Binary Sensor](https://esphome.io/components/binary_sensor/gpio/) component.