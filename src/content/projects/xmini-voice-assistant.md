---
title: "Voice Assistant"
description: "Voice Assistant Using XMini-C3 Board"
difficulty: "beginner"
devices: ["xmini-c3"]
components: ["i2c", "display-ssd1306-i2c", "binary-sensor-gpio", "light-esp32-rmt-led-strip",
            "network", "output-gpio", "audio-dac-es8311", "i2s-audio", "speaker-i2s-audio",
            "microphone-i2s-audio", "media-player-speaker"]
tags: ["assistant", "sound", "led", "microphone", "display"]
status: "idea"
changelog:
  - date: "2026-01-28"
    type: "added"
    description: "Started as an idea"
lastModified: "2026-01-29"
---

## Project Overview

A simple voice assistant built with the XMini-C3 board, featuring a microphone, speaker, and OLED display.
The device connects to Home Assistant to provide voice control for smart home devices using micro wake word detection.

### Features

- 🎤 Built-in microphone for voice commands
- 🔊 I2S audio speaker for voice responses
- 📺 OLED display showing status and visual feedback
- 🌈 RGB LED for status indication
- 📡 WiFi-enabled for Home Assistant integration
- 🔌 Powered via USB-C

## Progress

- [ ] Initial Board Configuration with wake word detection
- [ ] Add Voice Assistant Configuration
- [ ] Test voice assistant pipeline with Home Assistant
- [ ] Add visual feedback to OLED display

### Reusability Note

## What You'll Need

### Hardware

- 1x [Xmini C3](/devices/xmini-c3)
- 1x USB cable (data capable)
- 1x Power supply (USB charger, 5V/1A minimum)

### Software

- [ESPHome installed](https://esphome.io/guides/getting_started_hassio/)
- Home Assistant

## Future Improvement Ideas

## Status

This project is currently in the "idea" stage. The next steps involve completing ESPHome configuration
and configuring Home Assistant to use it as voice assistant.

Most of the voice assistant code inspired by: m5stack-atom-echo
[voice assistant](https://github.com/esphome/wake-word-voice-assistants/blob/main/m5stack-atom-echo/m5stack-atom-echo.yaml)
<!--
### Main Configuration File

If you're using
[ESPHome Device Builder](https://www.esphome.io/guides/getting_started_hassio/#installing-esphome-device-builder)
create your _New Device_. Or if you're using
[command line](https://www.esphome.io/guides/getting_started_command_line/) create your yaml file
(e.g. `xmini-voice-assistant.yaml`)
Then use the following file as a guide (details on how to customize it are below).

Download the full configuration: [xmini-voice-assistant.yaml](/files/src/xmini-voice-assistant/xmini-voice-assistant.yaml)

<! -- astro-xembed: /files/src/xmini-voice-assistant/xmini-voice-assistant.yaml -->
