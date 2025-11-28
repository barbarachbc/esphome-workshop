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
status: "unsupported"
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

TODO: review all; SN3218 probably also obsolete

⚠️ **Note**: The SN3218 driver is not currently supported in ESPHome. You will need to use an external component to control this device.

- Requires **I2C**, i2c_id is optional, but i2c component is required.
- I2C address: **0x54** (fixed)
- Platform: **sn3218**
- Each of the 18 LEDs can be controlled individually

### Basic Configuration

Example configuration:

```yaml
esphome:
  name: my-piglow

esp32:
  board: esp32dev
  framework:
    type: esp-idf

i2c:
  sda: GPIO21
  scl: GPIO22
  scan: true

light:
  - platform: sn3218
    id: piglow
    address: 0x54
    num_channels: 18
    update_interval: 16ms
    # Define individual LED outputs
    channels:
      - channel: 0
        id: led_0
      - channel: 1
        id: led_1
      - channel: 2
        id: led_2
      # Add remaining channels as needed (0-17)
```

### Advanced Configuration with Effects

```yaml
light:
  - platform: sn3218
    id: piglow
    address: 0x54
    num_channels: 18
    channels:
      - channel: 0
        id: led_0
        default_transition_length: 500ms
        effects:
          - pulse:
              name: "Pulse"
              transition_length: 1s
              update_interval: 1s
```

## LED Layout

The PiGlow has LEDs arranged in 3 arms with 6 LEDs each:
- Each arm contains LEDs of 6 different colors
- Colors: Red, Orange, Yellow, Green, Blue, White
- LEDs are numbered 0-17

Refer to the [pinout diagram](https://pinout.xyz/pinout/piglow) for the exact LED positions and channel assignments.

## Troubleshooting

- **LEDs not lighting**: Verify I2C wiring (SDA/SCL) and that the device appears at address 0x54 in the I2C scan
- **Flickering LEDs**: Try adjusting the `update_interval` parameter
- **Power issues**: Ensure adequate power supply when driving multiple LEDs at high brightness

