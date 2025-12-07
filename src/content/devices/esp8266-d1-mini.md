---
title: "ESP8266 D1 Mini"
description: "Compact ESP8266 development board with built-in WiFi"
category: "board"
manufacturer: "DiyMore"
model: "NodeMCU"
connectionTypes: ["gpio"]
tags: ["wifi", "esp8266"]
productionStatus: "NRND"
status: "ready"
references:
  - title: ESP8266 Pinout Reference
    url: https://randomnerdtutorials.com/esp8266-pinout-reference-gpios/
purchaseLinks:
  - vendor: Amazon
    url: "https://www.amazon.co.uk/diymore-ESP8266-NodeMCU-ESP8266-12F-CH340G/dp/B0C3LSHHQY?th=1"
dateAcquired: "Oct 2024"
count: 3
#image: "/images/devices/"
lastModified: "2025-12-06"
---

## Overview

The DiyMore NodeMCU (similar to Wemos D1 Mini) is a compact ESP8266-based development board with built-in WiFi capabilities. It features the ESP8266MOD (ESP-12F) module.

## Test Status

- ✅ [Basic Config](#basic-configuration) + Internal LED
- [ ] GPIO
- [ ] UART
- [ ] SPI
- [ ] I2C
- [ ] I2S
- [ ] PWM
- [ ] IR
- [ ] ADC

## Hardware Features

- **Module:** ESP8266MOD (ESP-12F)
- **CPU:** ESP8266EX single-core, 80MHz
- **RAM:** 80KB
- **Flash:** 4MB
  - W25Q32FV 32Mbit Serial Nor Flash (NRND)
- **USB-to-UART:** CH340G
- **GPIO Pins:** 17 available on the module, not on the board
- **WiFi:** 802.11 b/g/n
- **ADC:** 10-bit (1 channel)
- **PWM:** Multiple channels
- **SPI:** Hardware SPI
- **I2C:** Software-implemented
- **I2S:** Interfaces with DMA
- **UART:** 1 interface
- **Operating Voltage:** 3.3V
- **Input Voltage:** 5V (via USB or VIN)

## Additional Hardware Features

- Reset button (cannot be used for anything else)
- Built-in LED on GPIO02 (active low/inverted)

## Board Pinout

The D1 Mini has a compact pinout with the following main pins:

### Power Pins
- **3.3V** - 3.3V output
- **5V** - 5V from USB or input
- **GND** - Ground pins

### GPIO Pins
- **D0** - GPIO16 (wake from deep sleep)
- **D1** - GPIO5 (I2C SCL)
- **D2** - GPIO4 (I2C SDA)
- **D3** - GPIO0 (Flash/Boot mode)
- **D4** - GPIO2 (Built-in LED, boot mode pin)
- **D5** - GPIO14 (SPI CLK)
- **D6** - GPIO12 (SPI MISO)
- **D7** - GPIO13 (SPI MOSI)
- **D8** - GPIO15 (SPI CS, boot mode pin)
- **RX** - GPIO3 (UART RX)
- **TX** - GPIO1 (UART TX)
- **A0** - ADC0 (Analog input, 0-3.3V)

## Basic Configuration

Basic configuration with built-in LED control.

```yaml
esphome:
  name: my-d1-mini

esp8266:
  board: d1_mini

output:
  - platform: gpio
    pin: GPIO02
    id: builtin_led
    inverted: true

light:
  - platform: binary
    name: "Built in LED"
    output: builtin_led
```

## Important Notes

⚠️ **Boot Mode Pins:** GPIO0, GPIO2, and GPIO15 affect boot mode. Be careful when connecting peripherals to these pins.

⚠️ **GPIO Limitations:** 
- GPIO6-11 are connected to flash (don't use)
- GPIO16 can only be used for GPIO read/write, no special functions
- Only one ADC channel available

⚠️ **I2C:** I2C is implemented in software, so any GPIO can be used, but D1 (GPIO5) and D2 (GPIO4) are the default pins.

⚠️ **Current Limitations:** The 3.3V pin can supply limited current. For power-hungry peripherals, use external power.

## Troubleshooting

**Board won't flash:**
- Try holding the reset button while connecting USB
- Check CH340 drivers are installed
- Try a different USB cable (must support data)

**WiFi issues:**
- ESP8266 only supports 2.4GHz WiFi networks

**Random resets:**
- Check power supply (needs stable 5V, 500mA+)
- The ESP8266 can draw significant current spikes during WiFi transmission

