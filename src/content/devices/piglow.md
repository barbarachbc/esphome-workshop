---
title: 'PiGlow'
description: 'Spiral Nebula of 18 colored LEDs by Pimoroni'
category: "light"
manufacturer: "Pimoroni"
model: ""
connectionTypes: ["i2c"]
components: ["i2c", "sn3218"]
tags: ["led", "pwm", "rgb"]
productionStatus: "discontinued"
purchaseLinks:
  - vendor: "Pimoroni"
    url: "https://shop.pimoroni.com/products/piglow"
references:
  - title: Pinout
    url: "https://pinout.xyz/pinout/piglow"
  - title: Datasheet
    url: "https://www.optimusdigital.ro/ro/index.php?controller=attachment&id_attachment=1146&srsltid=AfmBOopypUBGbn19vYc4OnRSD5zhejYSHCQSr-qmXbLgvEcijGMTNoHB"
  - title: Pimoroni Github Repository
    url: "https://github.com/pimoroni/piglow"
  - title: Arduino Library
    url: "https://github.com/pimoroni/pimoroni_arduino_sn3218"
status: "unsupported"
dateAcquired: "2017"
---


## Overview

The PiGlow is a small LED board with 18 LEDs arranged in a spiral pattern. Each LED can be individually controlled via the SN3218 8-bit, 18-channel PWM LED driver.

The board features:
- 18x individually controllable LEDs
- 6 LEDs each in 3 arms (arranged in a spiral)
- 6 different colors (3 LEDs of each color)
- 8-bit PWM control per LED (256 brightness levels)
- SN3218 LED driver chip
- I2C interface (address 0x54)
- 3.3V or 5V compatible

## Configuration Notes


⚠️ **Note**: The SN3218 driver is not currently supported in ESPHome. 

SN3218 probably obsolete.
