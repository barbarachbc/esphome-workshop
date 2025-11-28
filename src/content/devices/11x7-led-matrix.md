---
title: '11x7 LED Matrix Breakout'
description: '11x7 white LED matrix, individually addressable by Pimoroni'
category: "display"
manufacturer: "Pimoroni"
model: "PIM442"
connectionTypes: ["i2c"]
components: ["i2c", "display", "is31fl3731"]
tags: ["led", "matrix", "monochrome", "display"]
productionStatus: "active"
purchaseLinks:
  - vendor: "Pimoroni"
    url: "https://shop.pimoroni.com/products/11x7-led-matrix-breakout?variant=21791690752083"

references:
  - title: Datasheet
    url: "https://www.lumissil.com/assets/pdf/core/IS31FL3731_DS.pdf"
  - title: Github Python Library
    url: "https://github.com/pimoroni/matrix11x7-python"
  - title: Feature Request
    url: "https://github.com/esphome/feature-requests/issues/2245"

status: "unsupported"
---

## Overview

The 11x7 LED Matrix Breakout is a grid of 77 individually controllable bright white LEDs driven by the IS31FL3731 matrix LED driver chip.

The board features:
- 11x7 (77 total) bright white LEDs
- IS31FL3731 LED driver chip
- 8-bit PWM control per LED (256 brightness levels)
- I2C interface (address 0x75, or 0x77 with trace cut)
- 3.3V or 5V compatible
- Integrated power regulator

## Configuration Notes

TODO: review all of this

⚠️ **Note**: The IS31FL3731 driver is not currently supported in ESPHome. You will need to use an external component to control this device.

- Requires **I2C**, i2c_id is optional, but i2c component is required.
- Default I2C address: **0x75** (can be changed to 0x77 by cutting a trace on the board)
- Uses the **IS31FL3731** LED matrix driver
- Each LED has independent brightness control with 8-bit PWM
- Perfect for displaying text, graphics, or animations

### Basic Configuration

Example configuration as a display:

```yaml
esphome:
  name: my-led-matrix

esp32:
  board: esp32dev
  framework:
    type: esp-idf

i2c:
  sda: GPIO21
  scl: GPIO22
  scan: true

display:
  - platform: is31fl3731
    id: led_matrix_11x7
    address: 0x75
    width: 11
    height: 7
    lambda: |-
      it.print(0, 0, id(my_font), "HI");
      
font:
  - file: "gfonts://Roboto"
    id: my_font
    size: 8
```

### Scrolling Text Configuration

Display scrolling messages:

```yaml
display:
  - platform: is31fl3731
    id: led_matrix_11x7
    address: 0x75
    width: 11
    height: 7
    update_interval: 50ms
    lambda: |-
      static int x_offset = 11;
      it.print(x_offset, 0, id(my_font), "Hello World!");
      x_offset--;
      if (x_offset < -100) x_offset = 11;

font:
  - file: "gfonts://Roboto"
    id: my_font
    size: 8
```

### Animation Configuration

Create simple animations:

```yaml
display:
  - platform: is31fl3731
    id: led_matrix_11x7
    address: 0x75
    width: 11
    height: 7
    update_interval: 100ms
    lambda: |-
      static int frame = 0;
      it.rectangle(frame % 11, 0, 3, 3);
      frame++;
```

## Display Dimensions

- Width: 11 LEDs
- Height: 7 LEDs
- Total LEDs: 77
- Pixel pitch: ~2.5mm

The relatively small display is ideal for short messages, icons, or simple graphics.

## Troubleshooting

- **Matrix not responding**: Verify I2C wiring and that the device appears at address 0x75 (or 0x77) in the I2C scan
- **Text too large**: Use smaller fonts (size 6-8 works well for this display)
- **Uneven brightness**: Check power supply and ensure adequate current capacity
- **I2C address conflict**: If using multiple devices, cut the address selection trace to change to 0x77
