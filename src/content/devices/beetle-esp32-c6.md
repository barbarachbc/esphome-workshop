---
title: "Beetle ESP32-C6"
description: "DFRobot Beetle ESP32-C6 Development Board"
category: "board"
manufacturer: "DFRobot"
model: "Beetle ESP32 C6"
connectionTypes: ["gpio"]
tags: ["wifi", "bluetooth", "zigbee", "matter", "thread", "esp32", "esp32c6"]
productionStatus: "active"
#image: "/images/devices/beetle-esp32-c6.jpg"
references:
  - title: Wiki
    url: "https://wiki.dfrobot.com/SKU_DFR1117_Beetle_ESP32_C6"
  - title: Pinout
    url: "https://wiki.dfrobot.com/SKU_DFR1117_Beetle_ESP32_C6#Pin%20Diagram"
purchaseLinks:
  - vendor: "DFRobot"
    url: "https://www.dfrobot.com/product-2778.html"
status: "unused"
---

## Overview

The DFRobot Beetle ESP32-C6 is a compact development board based on the ESP32-C6 chip, featuring WiFi 6 and Bluetooth 5.3 connectivity in a small form factor. It also features Zigbee 3.0 and Thread 1.3.

## Additonal Hardware features:
- LED GPIO15
- Boot Button GPIO9


### Basic Configuration

Basic configuration with built in button and LED.

```yaml
esphome:
  name: my-esp32c6

esp32:
  variant: esp32c6

output:
  - platform: gpio
    pin: GPIO15
    id: builtin_led

light:
  - platform: binary
    name: "Built in LED"
    output: builtin_led

binary_sensor:
  - platform: gpio
    pin: 
      number: GPIO09
      inverted: true
    id: boot_btn
    on_press:
      then:
        - output.turn_on: builtin_led
    on_release:
      then:
        - output.turn_off: builtin_led
```

## Features

- **Compact Design**: Ultra-small size perfect for space-constrained projects
- **Modern Connectivity**: WiFi 6 (802.11ax) and Bluetooth 5.3 with LE support
- **USB-C Interface**: Easy programming and power via USB Type-C
- **Low Power**: Excellent power efficiency with multiple sleep modes
- **Peripherals**:
   - Digital I/O x13
   - LED PWM 6 Channel
   - SPI x1
   - UART x3 (LP UART x1)
   - I2C x2 (LP I2C x1)
   - I2S x1
   - IR Transceiver: transmit channel x2, receive channel x2
   - 1 × 12-bit SAR ADC, 7 Channel
   - DMA Controller: transmit channel x3, receive channel x3


## Pin Reference

The Beetle ESP32-C6 provides access to various GPIO pins. Refer to the board's pinout diagram for specific pin assignments.

### Common Pin Mappings

- **I2C**: GPIO6 (SDA), GPIO7 (SCL)
- **SPI**: GPIO12 (MOSI), GPIO13 (MISO), GPIO11 (CLK)
- **UART**: GPIO16 (TX), GPIO17 (RX)
- **ADC**: GPIO0-GPIO4 support analog input

## Power Considerations

The Beetle ESP32-C6 can be powered via:

- **USB-C**: 5V power supply
- **Battery**: Connect to battery pins (check polarity)
- **3.3V Pin**: Direct 3.3V regulated power

## Notes

- The ESP32-C6 uses a RISC-V architecture (not Xtensa like older ESP32 models)
- ESP-IDF framework is recommended for ESP32-C6 support
- WiFi 6 features provide improved performance and efficiency
- Lower power consumption compared to older ESP32 variants
