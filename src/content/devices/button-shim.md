---
title: 'Button SHIM'
description: '5 buttons and RGB LED using i2c I/O expander by Pimoroni'
category: "input"
manufacturer: "Pimoroni"
model: ""
connectionTypes: ["i2c"]
components: ["i2c", "tca9554", "light", "binary_sensor"]
tags: ["buttons", "input", "led", "rgb", "io-expander"]
productionStatus: "discontinued"
purchaseLinks:
  - vendor: "Pimoroni"
    url: "https://shop.pimoroni.com/products/button-shim"
references:
  - title: Pinout
    url: https://pinout.xyz/pinout/button_shim
  - title: External Component Repository
    url: "https://github.com/barbarachbc/esphomecomponents"
  - title: Datasheet
    url: "https://www.ti.com/lit/ds/symlink/tca9554a.pdf"
  - title: Pimoroni Github Repository
    url: "https://github.com/pimoroni/button-shim"

status: "testing"
dateAcquired: "2017"
---


## Overview

The Button SHIM is a compact board featuring 5 tactile buttons and a single RGB LED, designed to sit on top of a Raspberry Pi GPIO header but also works with other boards.

The board features:
- 5x tactile, right-angle push buttons (A, B, C, D, E)
- Single RGB LED (APA102)
- TCA9554A I/O expander for button inputs
- I2C interface (address 0x3F)
- 3.3V or 5V compatible

## Configuration Notes

⚠️ **Note**: While ESPHome has [TCA9555](https://esphome.io/components/tca9555/) support, TCA9554 and TCA9554A are not supported because the I2C register addresses are different.

⚠️ **Note**: Check out [PCA9554A](https://esphome.io/components/pca9554/) support. Check if external component is necessary.

✅ External component available (by me 🙂)

The APA102 LED is supported via [SPI LED strip](https://esphome.io/components/light/spi_led_strip/) platform, however, needs to use "software" SPI because it has to use TCA9554 outputs.
