---
title: 'Knob G Click'
description: 'Rotary encoder with PCA9956B 24-channel I2C LED driver'
category: "input"
manufacturer: "MikroElektronika"
model: "MIKROE-3299"
connectionTypes: ["i2c", "gpio"]
components: ["i2c", "rotary_encoder"]
tags: ["rotary-encoder", "led-driver", "pwm", "input"]
productionStatus: "active"
purchaseLinks:
  - vendor: "MikroE"
    url: "https://www.mikroe.com/knob-g-click"
  - vendor: "Mouser" 
    url: "https://www.mouser.ie/ProductDetail/Mikroe/MIKROE-3299?qs=0lSvoLzn4L%2FvSRbTPgGhzg%3D%3D"
references:
  - title: "Product Page"
    url: "https://www.mikroe.com/knob-g-click"
  - title: "PCA9956B Datasheet"
    url: "https://download.mikroe.com/documents/datasheets/PCA9956B.pdf"
status: "unsupported"
dateAcquired: "2021"
---

## Overview

The Knob G Click is a combined rotary encoder and LED ring driver board featuring a mechanical rotary encoder and the PCA9956B 24-channel I2C-bus constant current LED driver optimized for dimming and blinking.

The module features:
- Mechanical rotary encoder with push button
- PCA9956B 8-bit 24-channel I2C LED driver
- 74HC3G14DC, a triple inverting Schmitt trigger IC, from Nexperia
- Constant current outputs: 57mA max per channel
- Group PWM and blinking control
- I2C interface (up to 1MHz)
- I2C addresses: 0x40-0x7F (configurable)

- Operating voltage: 3.3V or 5V
- MikroBUS compatible

## Configuration Notes

⚠️ **Note**: ESPHome does not have native support for PCA9956B. The rotary encoder portion can be used with standard [Rotary Encoder](https://esphome.io/components/sensor/rotary_encoder/) component, but the LED driver requires external component.

- Rotary encoder: requires 2 **GPIO** pins (A and B) + 1 for button
- LED driver: requires **I2C** interface

### I2C

Slave I2C address of the PCA9956B device can be selected by using three SMD jumpers, grouped under the ADDR label. The PCA9956B allows its slave I2C address to be selected from a wide range of 125 different values. Each of the address pins (A0 to A3) can be left floating, pulled up, pulled down and shorted to VCC or GND. However, some I2C addresses are reserved, so they should be used with care. The datasheet of the PCA9956B offers tables with resistor values for each state of the address pins and reserved I2C addresses. Knob G click uses three 0 Ω SMD jumpers to set the states of these address pins.

### Pinout

mikroBUS:

- 1: ENA (Encoder OUT A)
- 2: RST (PCA9956B Reset)
- 3: ENB (Encoder OUT B)
- 7: 3.3V
- 8, 9: GND
- 10: 5V
- 11: SDA
- 12: SCL
- 15: SW (Encoder Button OUT)
- 16: OE (Control PWM Signal)
- The rest not connected
