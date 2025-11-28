---
title: 'SR602 PIR Sensor'
description: 'Mini PIR motion sensor with adjustable sensitivity'
category: "sensor"
manufacturer: "Generic"
model: "SR602"
connectionTypes: ["gpio"]
components: ["binary_sensor"]
tags: ["pir", "motion", "sensor", "infrared"]
productionStatus: "active"
purchaseLinks:
  - vendor: "AliExpress"
    url: "https://www.aliexpress.com/item/1005005140420875.html"
    color: "SR602"
status: "pending"
dateAcquired: "Aug 2025"
---

## Overview

The SR602 is a compact PIR (Passive Infrared) motion sensor module with adjustable sensitivity and very low power consumption.

The module features:
- Pyroelectric human body infrared sensor module, model: SR-602
- Sensing distance: up to 5 meters; recommended 0-3.5M.
- Output: high level, H=3.3V, L=0V
- Power supply DC: 3.3V-15V
- Quiescent current: 20uA

Features and uses:

This module has high sensitivity, fast response, small static power consumption, small size, easy to install, and is installed.

The lens, the pin header has been soldered, and the power supply is provided without debugging. Can be used for body sensor lights, alarms, security, Access control on-demand imaging, automatic equipment for agriculture, forestry and mining.

Key points:

-  The high level time of the output of this product is adjustable, 2.5 seconds to 1 hour, the output time set at the factory. It is 2.5 seconds, and you can change one chip resistor if you need to change it. Please read the resistance value corresponding to the typical delay time.
- Blocking time, 2 seconds, not adjustable.
- The factory is defined as repeatable trigger and cannot be changed.
- The supply voltage of this module is 3.3V to 15V, and the limit voltage is 2.8V to 18V.
-  Module output timing is: output high level for 2 seconds after power-on, then go low, enter standby status. If the delay time is changed, the time when the module outputs a high level after power-on will increase accordingly, which can be understood as
The startup time after entering the normal working state after the electric power will increase.

## Configuration Notes

- Requires single **GPIO** pin
- Digital output: HIGH (3.3V) when motion detected, LOW when idle
- Sensitivity can be adjusted via on-board resistor/jumper
- Very compact - suitable for space-constrained projects

Supported through [GPIO Binary Sensor](https://esphome.io/components/binary_sensor/gpio/) 