---
title: "ESP32 DevKit V1"
description: "Popular ESP32 development board with built-in WiFi and Bluetooth"
category: "board"
manufacturer: "Espressif"
model: "ESP32-WROOM-32"
connectionTypes: ["gpio", "i2c", "spi", "uart", "pwm", "analog"]
tags: ["wifi", "bluetooth", "microcontroller", "esp32"]
status: "unused"
---

## Overview

The ESP32 DevKit V1 is one of the most popular development boards for ESPHome projects. It features the ESP32-WROOM-32 module with built-in WiFi and Bluetooth capabilities, making it perfect for IoT applications.

## Specifications

- **Microcontroller:** ESP32-WROOM-32
- **CPU:** Dual-core Tensilica LX6 @ 240MHz
- **RAM:** 520KB SRAM
- **Flash:** 4MB
- **WiFi:** 802.11 b/g/n
- **Bluetooth:** v4.2 BR/EDR and BLE
- **Operating Voltage:** 3.3V
- **Input Voltage:** 5V (via USB or VIN)
- **GPIO Pins:** 30 (some with special functions)
- **ADC:** 18 channels, 12-bit
- **PWM:** 16 channels
- **I2C:** 2 interfaces
- **SPI:** 3 interfaces
- **UART:** 3 interfaces

## Pinout

The ESP32 DevKit V1 has 38 pins in total:

### Power Pins
- **3.3V** - 3.3V output (max 500mA)
- **5V** - 5V output from USB (when powered via USB)
- **GND** - Ground pins (multiple)
- **VIN** - Input voltage (5-12V)
- **EN** - Enable pin (reset when pulled low)

### GPIO Pins
- **GPIO0-GPIO39** - General purpose I/O
  - GPIO34-39 are input-only
  - GPIO6-11 are connected to flash (don't use)
  - Some pins have boot mode constraints (GPIO0, GPIO2, GPIO12, GPIO15)

### Special Function Pins
- **Touch Sensors:** GPIO0, GPIO2, GPIO4, GPIO12-15, GPIO27, GPIO32-33
- **ADC1:** GPIO32-39
- **ADC2:** GPIO0, GPIO2, GPIO4, GPIO12-15, GPIO25-27
- **I2C:** Any GPIO (commonly GPIO21=SDA, GPIO22=SCL)
- **SPI:** Any GPIO (commonly GPIO23=MOSI, GPIO19=MISO, GPIO18=SCK)

## Usage with ESPHome

### Basic Configuration

```yaml
esphome:
  name: my-esp32
  platform: ESP32
  board: esp32dev

wifi:
  ssid: "Your_WiFi_SSID"
  password: "Your_WiFi_Password"

api:
  encryption:
    key: "your_api_key"

ota:
  password: "your_ota_password"

logger:
```

### GPIO Example

```yaml
# Control an LED on GPIO2
output:
  - platform: gpio
    pin: GPIO2
    id: led_output

light:
  - platform: binary
    name: "Onboard LED"
    output: led_output
```

## Important Notes

⚠️ **Boot Mode Pins:** Be careful with GPIO0, GPIO2, GPIO12, and GPIO15 during boot. These affect boot mode selection.

⚠️ **Input-Only Pins:** GPIO34-39 can only be used as inputs and don't have internal pull-up/pull-down resistors.

⚠️ **ADC2 Limitation:** ADC2 pins cannot be used when WiFi is active.

⚠️ **Strapping Pins:** Some pins are used during boot and may cause issues if connected to certain peripherals.

## Common Uses

- Home automation controllers
- Sensor hubs
- Smart switches and dimmers
- Weather stations
- Environmental monitors
- IoT gateways

## Troubleshooting

**Board won't flash:**
- Hold the BOOT button while connecting USB
- Try a different USB cable (must support data)
- Check that CH340/CP2102 drivers are installed

**WiFi connection issues:**
- Ensure 2.4GHz WiFi (ESP32 doesn't support 5GHz)
- Check signal strength
- Verify credentials

**Random resets:**
- Check power supply (needs stable 5V, 500mA+)
- Add capacitors near power pins if using long wires
- Avoid connecting high-current devices directly

## Where to Buy

Available from most electronics retailers including Amazon, AliExpress, and local electronics stores. Look for genuine Espressif modules for best reliability.
