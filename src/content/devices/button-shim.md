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

status: "unused"
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

TODO: review

⚠️ **Note**: While ESPHome has TCA9554 support, the specific TCA9554A variant may require verification or an external component. The APA102 LED is supported via SPI LED strip platforms.

- Requires **I2C**, i2c_id is optional, but i2c component is required.
- I2C address: **0x3F** (TCA9554A I/O expander)
- The RGB LED uses the **APA102** protocol (requires DATA and CLOCK pins)
- Buttons are connected through the I/O expander
- Platform: **tca9554** for I/O expander, **spi_led_strip** or **light.fastled_spi** for the RGB LED

### Basic Configuration

Example configuration:

```yaml
esphome:
  name: my-button-shim

esp32:
  board: esp32dev
  framework:
    type: esp-idf

i2c:
  sda: GPIO21
  scl: GPIO22
  scan: true

# TCA9554A I/O Expander for buttons
tca9554:
  - id: button_expander
    address: 0x3F

# Button inputs
binary_sensor:
  - platform: gpio
    name: "Button A"
    pin:
      tca9554: button_expander
      number: 0
      mode: INPUT
      inverted: true
    on_press:
      - logger.log: "Button A pressed"
      
  - platform: gpio
    name: "Button B"
    pin:
      tca9554: button_expander
      number: 1
      mode: INPUT
      inverted: true
    on_press:
      - logger.log: "Button B pressed"
      
  - platform: gpio
    name: "Button C"
    pin:
      tca9554: button_expander
      number: 2
      mode: INPUT
      inverted: true
    on_press:
      - logger.log: "Button C pressed"
      
  - platform: gpio
    name: "Button D"
    pin:
      tca9554: button_expander
      number: 3
      mode: INPUT
      inverted: true
    on_press:
      - logger.log: "Button D pressed"
      
  - platform: gpio
    name: "Button E"
    pin:
      tca9554: button_expander
      number: 4
      mode: INPUT
      inverted: true
    on_press:
      - logger.log: "Button E pressed"

# RGB LED (APA102)
spi:
  clk_pin: GPIO18
  mosi_pin: GPIO23

light:
  - platform: spi_led_strip
    id: button_shim_led
    name: "Button SHIM LED"
    chipset: APA102
    num_leds: 1
    rgb_order: BGR
    data_rate: 1MHz
```

### Advanced Configuration with Actions

Example showing button actions controlling the LED:

```yaml
binary_sensor:
  - platform: gpio
    name: "Button A"
    pin:
      tca9554: button_expander
      number: 0
      mode: INPUT
      inverted: true
    on_press:
      - light.turn_on:
          id: button_shim_led
          brightness: 100%
          red: 100%
          green: 0%
          blue: 0%
          
  - platform: gpio
    name: "Button B"
    pin:
      tca9554: button_expander
      number: 1
      mode: INPUT
      inverted: true
    on_press:
      - light.turn_on:
          id: button_shim_led
          brightness: 100%
          red: 0%
          green: 100%
          blue: 0%
          
  - platform: gpio
    name: "Button C"
    pin:
      tca9554: button_expander
      number: 2
      mode: INPUT
      inverted: true
    on_press:
      - light.turn_on:
          id: button_shim_led
          brightness: 100%
          red: 0%
          green: 0%
          blue: 100%
          
  - platform: gpio
    name: "Button D"
    pin:
      tca9554: button_expander
      number: 3
      mode: INPUT
      inverted: true
    on_press:
      - light.turn_on:
          id: button_shim_led
          brightness: 100%
          red: 100%
          green: 100%
          blue: 100%
          
  - platform: gpio
    name: "Button E"
    pin:
      tca9554: button_expander
      number: 4
      mode: INPUT
      inverted: true
    on_press:
      - light.turn_off: button_shim_led
```

## Hardware Details

### Button Layout

The 5 buttons are labeled A, B, C, D, and E from left to right when looking at the board with the LED on the left side.

### RGB LED

The single RGB LED is an APA102 (also known as DotStar), which uses a two-wire SPI-like protocol for communication.

## Troubleshooting

- **Buttons not responding**: Verify I2C wiring and that the TCA9554A appears at address 0x3F in the I2C scan
- **LED not working**: Check SPI wiring (CLK and MOSI/DATA pins) and verify the APA102 chipset configuration
- **Wrong button presses detected**: Try adjusting the `inverted` parameter on the button pins
- **Buttons triggering multiple times**: Add debounce filters to the binary_sensor configuration

