---
title: 'Rotary Encoder'
description: 'Mechanical rotary encoder for input control'
category: "input"
manufacturer: "Generic"
model: "KY-040"
variants: ["KY-040", "EC11", "Incremental Encoder"]
connectionTypes: ["gpio"]
components: ["rotary_encoder", "binary_sensor"]
tags: ["encoder", "input", "knob", "dial"]
productionStatus: "active"
status: "pending"
dateAcquired: "Jan 2025"
---

## Overview

A rotary encoder is an electromechanical device that converts rotational position or motion into digital signals. The most common types for hobbyist use are incremental encoders like the KY-040 and EC11.

The module features:
- Incremental quadrature output
- Detent positions (clicks) for tactile feedback
- Push button switch (on most modules)
- CLK and DT output pins (A and B channels)
- Operating voltage: 3.3V-5V
- No external pull-up resistors needed (most modules)
- 360° endless rotation
- Typical resolution: 20 detents/rotation
- Debouncing may be required in software

## Configuration Notes

- Requires 2 **GPIO** pins for encoder (CLK/A and DT/B)
- Optional: 1 **GPIO** pin for push button (SW)
- Platform: [**rotary_encoder**](https://esphome.io/components/sensor/rotary_encoder/)
- Software debouncing recommended
- Can track position or detect rotation direction
- Min/max value constraints can be set
