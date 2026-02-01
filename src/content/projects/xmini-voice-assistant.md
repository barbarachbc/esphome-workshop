---
title: "Voice Assistant"
description: "Voice Assistant Using XMini-C3 Board"
difficulty: "beginner"
devices: ["xmini-c3"]
components: ["i2c", "display-ssd1306-i2c", "binary-sensor-gpio", "light-esp32-rmt-led-strip",
            "output-gpio", "audio-dac-es8311", "i2s-audio", "speaker-i2s-audio",
            "microphone-i2s-audio", "media-player-speaker", "api", "ota-esphome", "wifi",
            "button-factory-reset", "voice-assistant", "script", "switch-template", "select-template",
            "micro-wake-word", "image"]
tags: ["assistant", "sound", "led", "microphone", "display"]
status: "in-progress"
changelog:
  - date: "2026-01-28"
    type: "added"
    description: "Initial file added as an idea"
  - date: "2026-01-30"
    type: "updated"
    description: "Completed initial setup and tested with Home Assistant"
lastModified: "2026-02-01"
---

## Project Overview

A simple voice assistant built with the Xmini-C3 board, featuring a microphone, speaker, and OLED display.
The device uses on-device wake word detection and connects to Home Assistant Cloud for voice processing,
enabling hands-free control of smart home devices.

### Features

- 🎤 Built-in I2S microphone (ES8311 DAC) for voice commands
- 🔊 I2S audio speaker for voice responses and announcements
- 📺 OLED display (SSD1306) showing assistant status icons
- 🌈 RGB LED status indicator with various effects (listening, processing, error states)
- 🎯 On-device wake word detection (supports "Okay Nabu", "Hey Mycroft", "Hey Jarvis")
- ⏲️ Timer support with audio notifications
- 🔘 Physical button for stopping the alarm timer and factory reset
- 🔌 Powered via USB-C

## Progress

- ✅ Set up on-device wake word detection
- ✅ Configure Home Assistant Cloud voice pipeline
- ✅ Test voice commands (lights, timers)
- [ ] Future improvements (see below)

### Future Improvement Ideas

- Add more display pages showing additional information
- Implement custom LED effects for different states
- Add local voice processing option (instead of cloud)
  - Local pipeline
- Volume control adjustments

### Reusability Note

This project uses the Xmini-C3 board which has built-in I2S audio components. If using a different ESP32
board, you'll need to add external audio hardware. The configuration is straightforward with minimal
customization needed - mostly updating WiFi credentials and API keys in your secrets file.

## What You'll Need

### Hardware

- 1x [Xmini-C3](/devices/xmini-c3) - ESP32-C3 board with built-in I2S audio (ES8311 DAC, microphone, speaker)
- 1x USB-C cable (data capable for programming)
- 1x Power supply (USB charger, 5V/1A minimum)

### Software

- [ESPHome installed](https://esphome.io/guides/getting_started_hassio/)
- Home Assistant with Cloud subscription (for voice processing)
- Home Assistant Voice Assistant configured

## Setup Instructions

1. **Flash the device** - Use the provided YAML configuration to flash your Xmini-C3
1. **Configure secrets** - Set your WiFi credentials and API encryption keys
1. **Add to Home Assistant** - The device should auto-discover via ESPHome integration
1. **Configure Voice Pipeline** - In Home Assistant, set up your preferred voice assistant pipeline
1. **Expose Entities to Voice Assistant** - Select some entities you want configured by the voice
assistant. Less entities selected - faster the assistant. Possibly add aliases for easier control
1. **Test wake word** - Say "Okay Nabu" (or other configured wake words) to trigger the assistant
1. **Try commands** - Test with simple commands like "Turn on the lights" or "Set a timer"

## How It Works

- **Wake Word Detection**: Runs locally on the device using micro wake word models (configurable)
- **Voice Processing**: Audio sent to Home Assistant Cloud for speech-to-text and intent recognition
- **Feedback**: RGB LED and OLED display show current state (idle, listening, processing, speaking)
- **Button Control**: Press the boot button to cancel the timer notification or hold 10s for factory reset

## Status

This project is **completed** and working. The voice assistant successfully:

- Detects wake words locally on the device
- Responds to voice commands via Home Assistant Cloud
- Controls lights and other smart home devices
- Handles timers with audio notifications
- Provides visual feedback via LED display

There's significant room for improvement in terms of customization, additional features, and local
processing options.

## Acknowledgments

Configuration inspired by the
[M5Stack Atom Echo voice assistant](https://github.com/esphome/wake-word-voice-assistants/blob/main/m5stack-atom-echo/m5stack-atom-echo.yaml)
from the ESPHome wake word voice assistants repository. It is actually mostly the copy of it with configuration
specific for Xmini.

### Main Configuration File

If you're using
[ESPHome Device Builder](https://www.esphome.io/guides/getting_started_hassio/#installing-esphome-device-builder)
create your _New Device_. Or if you're using
[command line](https://www.esphome.io/guides/getting_started_command_line/) create your yaml file
(e.g. `xmini-voice-assistant.yaml`)
Then use the following file as a guide (details on how to customize it are below).

Download the full configuration: [xmini-voice-assistant.yaml](/files/src/xmini-voice-assistant/xmini-voice-assistant.yaml)

<!-- astro-embed: /files/src/xmini-voice-assistant/xmini-voice-assistant.yaml -->
