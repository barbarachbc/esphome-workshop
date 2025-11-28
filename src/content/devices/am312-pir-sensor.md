---
title: 'AM312 PIR Sensor'
description: 'Mini PIR motion sensor module with low power consumption'
category: "sensor"
manufacturer: "Generic"
model: "AM312"
connectionTypes: ["gpio"]
components: ["binary_sensor"]
tags: ["pir", "motion", "sensor", "infrared"]
productionStatus: "active"
purchaseLinks:
  - vendor: "AliExpress"
    url: "https://www.aliexpress.com/item/1005005140420875.html"
    color: "AM312"
status: "pending"
dateAcquired: "Aug 2025"
---

## Overview

The AM312 is a miniature PIR (Passive Infrared) motion sensor module designed for automatic human body detection with very low power consumption.

Product Features:
- Repeatable trigger mode: that is, after the induction output is high, in the delay period, if the body in its induction range of activities, the output will remain high until the delay after the person to become Low level.  (Ie, the sensing module automatically detects a delay period after each activity of the human body, and takes the last active time as the starting point for the delay time).

Technical Parameters:
- Operating voltage: DC 2.7-12V;
- Static power consumption: <0.1mA;
- Delay time: 2 seconds;
- Block time: 2 seconds;
- Trigger mode: repeatable;
- Sensing range: ≤ 100 degrees cone angle, 3-5 meters; (according to the specific lens)
- PCB Dimensions: 10mm * 8mm
- Module lens: small lens

## Configuration Notes

Pinout:
1) VCC
2) VOUT
3) GND

## Remarks

Probably supported through [GPIO Binary Sensor](https://esphome.io/components/binary_sensor/gpio/) component.