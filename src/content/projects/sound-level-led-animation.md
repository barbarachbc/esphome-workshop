---
title: "Sound Level Display"
description: "Measure sound levels in a room and display animations on an RGB LED matrix based on the detected levels."
difficulty: "intermediate"
devices: ["esp8266-d1-mini", "sound-sensor", "unicorn-phat"]
components: ["wifi", "api", "adc", "light", "neopixelbus"]
tags: ["sound", "led", "animation", "rgb", "matrix", "microphone"]
status: "idea"
changelog:
  - date: "2025-12-14"
    type: "added"
    description: "Started as an idea"
lastModified: "2025-12-14"
---

## Project Overview

This project aims to create a sound-reactive LED matrix that visualizes the sound levels in a room.
Using a sound sensor module and an RGB LED matrix (Unicorn pHAT), the device will display dynamic animations
that change based on the detected sound intensity.

### Features

- 🎵 Measure sound levels in real-time using a sound sensor
- 🌈 Display dynamic animations on an RGB LED matrix
- 📡 WiFi-enabled for remote monitoring and control
- 🔌 Powered via USB

### Reusability Note

This project is a fun and interactive way to visualize sound levels. It can be adapted for other types of
sensors or displays, making it a versatile starting point for sound-reactive projects.

## What You'll Need

### Hardware

- 1x [ESP8266 D1 Mini](/devices/esp8266-d1-mini)
- 1x [Sound Sensor Module](/devices/sound-sensor)
- 1x [Unicorn pHAT RGB LED Matrix](/devices/unicorn-phat)
- 1x USB cable (data capable)
- 1x Power supply (USB charger, 5V/1A minimum)

### Software

- [ESPHome installed](https://esphome.io/guides/getting_started_hassio/)
- Home Assistant (optional, for integration)

## Future Improvement Ideas

- Add different animation modes based on sound frequency
- Integrate with Home Assistant for sound level logging
- Add a microphone for more precise sound detection

## Status

This project is currently in the "idea" stage. The next steps involve setting up the hardware,
configuring ESPHome, and designing the LED animations.
