---
title: '0.96" SPI Colour LCD by Pimoroni'
description: '0.96" SPI Colour LCD (160x80) Breakout'
category: "display"
manufacturer: "Pimoroni"
model: '0.96" SPI Colour LCD'
connectionTypes: ["spi"]
components: ["spi", "display", "st7735"]
tags: ["display", "lcd", "tft", "rgb", "spi", "st7735"]
productionStatus: "active"
purchaseLinks:
  - vendor: "Pimoroni"
    url: "https://shop.pimoroni.com/products/0-96-spi-colour-lcd-160x80-breakout?variant=21414301630547"
status: "pending"
dateAcquired: "Jan 2022"
---

## Overview

The 0.96" SPI Colour LCD is a compact, high-quality color display from Pimoroni. Its small form factor makes it ideal for embedded projects, wearables, and space-constrained applications.

Display specifications:
- 160x80 pixels (~190 PPI)
- 10.8x21.7mm active area
- 400cd/m2 luminance
- 800:1 contrast ratio
- 160° viewing angle (horizontal and vertical)
- ST7735S driver chip
- 4-wire SPI interface
- Full color display (RGB)
- 3.3V compatible

## Configuration Notes

- Requires **SPI**, spi_id is optional, but spi component is required.
- Platform: **st7735**
- cs_pin, dc_pin, and reset_pin are required - can be any available GPIO
- **Backlight control** is optional but recommended for power management

### Basic Configuration

Example here is for [esp32-devkit-v1](./esp32-devkit-v1)
Adjust based on your board.

```yaml
esphome:
  name: pimoroni-display

esp32:
  board: esp32dev
  framework:
    type: arduino

substitutions:
  clk_pin: GPIO18
  mosi_pin: GPIO23
  disp_cs_pin: GPIO05
  disp_dc_pin: GPIO04
  disp_reset_pin: GPIO16
  backlight_pin: GPIO17

display:
  - platform: st7735
    id: pimoroni_lcd
    model: "INITR_MINI160X80"
    cs_pin: ${disp_cs_pin}
    dc_pin: ${disp_dc_pin}
    reset_pin: ${disp_reset_pin}
    rotation: 0
    show_test_card: true

spi:
  clk_pin: ${clk_pin}
  mosi_pin: ${mosi_pin}

# Optional: Backlight control
output:
  - platform: ledc
    pin: ${backlight_pin}
    id: backlight_pwm

light:
  - platform: monochromatic
    output: backlight_pwm
    name: "Display Backlight"
    restore_mode: ALWAYS_ON
```

### Advanced Configuration with Graphics

To add text and graphics, uncomment the lambda section and define fonts:

```yaml
font:
  - file: "gfonts://Roboto"
    id: roboto_16
    size: 16
  - file: "gfonts://Roboto"
    id: roboto_12
    size: 12

display:
  - platform: st7735
    id: pimoroni_lcd
    model: "INITR_MINI160X80"
    cs_pin: ${disp_cs_pin}
    dc_pin: ${disp_dc_pin}
    reset_pin: ${disp_reset_pin}
    rotation: 0
    lambda: |-
      // Draw a rectangle border
      it.rectangle(0, 0, it.get_width(), it.get_height(), red);
      
      // Display text
      it.print(80, 20, id(roboto_16), blue, TextAlign::CENTER, "Pimoroni");
      it.print(80, 50, id(roboto_12), green, TextAlign::CENTER, "0.96\" LCD");
```

## Troubleshooting

- **Display fails to initialize**: Verify SPI wiring (MOSI, CLK, CS) and ensure the correct model is specified.
- **Wrong colors or inverted display**: Try adjusting the `model` parameter or add `invert_colors: true` if supported.
- **Blank display**: Check that the reset pin is correctly connected and that power supply is stable (3.3V).
- **Rotated display**: Adjust the `rotation` parameter (0, 90, 180, or 270 degrees).
- **Display dimensions incorrect**: The ST7735 driver supports various screen sizes. Ensure you're using the correct model variant for 160x80 resolution.

## Pin Connections

Typical Pimoroni breakout pinout:
- **VCC** → 3.3V
- **GND** → Ground
- **CS** → Chip Select (any GPIO)
- **SCK** → SPI Clock
- **MOSI** → SPI Data Out
- **DC** → Data/Command select (any GPIO)
- **BL** → Backlight control (optional, any GPIO with PWM)
- **RST** → Reset (any GPIO)

Note: The breakout does not have MISO (SPI input) as the display is write-only.
