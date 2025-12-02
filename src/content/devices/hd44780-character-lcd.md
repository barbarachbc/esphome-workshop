---
title: 'HD44780 Character LCD Display'
description: 'Character-based LCD display with HD44780 controller'
category: "display"
manufacturer: "Generic"
model: "HD44780"
connectionTypes: ["i2c", "gpio"]
components: ["i2c", "display", "lcd_pcf8574", "lcd_gpio"]
tags: ["display", "lcd", "character", "text", "hd44780", "i2c", "pcf8574"]
productionStatus: "active"
purchaseLinks:
  - vendor: "Amazon UK"
    url: "https://www.amazon.co.uk/AZDelivery-HD44780-Display-Characters-including/dp/B0822QV8HK/?th=1"
  - vendor: "Amazon UK (16x2)"
    url: "https://www.amazon.co.uk/dp/B07CQG6CMT?th=1"
references:
  - title: "ESPHome LCD Display Component"
    url: "https://esphome.io/components/display/lcd_display/"
  - title: "HD44780U Datasheet"
    url: "https://www.sparkfun.com/datasheets/LCD/HD44780.pdf"
  - title: "Character Set Reference"
    url: "https://user-images.githubusercontent.com/1550668/173113487-9c98e866-8ee4-4a3c-a83f-61fe62057c5f.png"
  - title: "Custom Character Generator"
    url: "https://omerk.github.io/lcdchargen/"
status: "pending"
---

## Overview

The HD44780 is a character-based LCD display controller that has become the de facto standard for simple text displays. These displays show individual characters in a fixed grid pattern (not pixel-addressable) and are commonly available in various sizes such as 16x2, 20x4, and 8x2 configurations.

Display features:
- Character-based display (not pixel-addressable)
- Common sizes: 16x2, 20x4, 8x2, 20x2, 40x2
- HD44780 or compatible controller chip
- Multiple character sets available:
  - HD44780UA00: English-Japanese (katakana, Greek letters, math symbols)
  - HD44780UA02: English-European (Greek, Cyrillic, Western European)
  - Custom manufacturer-specific character sets
- 8 user-definable custom characters
- Built-in backlight (usually blue or green)
- Operating voltage: 5V (display logic), 3.3V compatible with I2C module
- Adjustable contrast via potentiometer

## Connection Methods

### Method 1: I2C via PCF8574 Module (Recommended)

Most modern HD44780 displays come with a PCF8574 I2C adapter board soldered or plugged onto the back. This method is **highly recommended** as it only requires 2 data wires (SDA/SCL) plus power.

**Advantages:**
- Only 2 data pins required (I2C)
- Simpler wiring
- Less GPIO pins used
- Most common configuration

**Pin connections:**
- VCC → 5V (or 3.3V depending on module)
- GND → Ground
- SDA → I2C SDA pin
- SCL → I2C SCL pin

### Method 2: Direct GPIO Connection

Connect the LCD directly to GPIO pins without an I2C adapter. Requires 4-8 data pins plus control pins.

**Advantages:**
- Faster refresh rate
- Better for LCD menus and interactive displays
- No additional I2C module needed

**Disadvantages:**
- Uses 6-10 GPIO pins
- More complex wiring

## Configuration Notes

### I2C Configuration (lcd_pcf8574)

- Platform: **lcd_pcf8574**
- Requires **I2C** component
- Default I2C address: **0x27** or **0x3F** (varies by manufacturer)
- Common dimensions: `16x2`, `20x4`, `20x2`, `8x2`
- Backlight control available via software

### GPIO Configuration (lcd_gpio)

- Platform: **lcd_gpio**
- Can operate in 4-bit mode (4 data pins) or 8-bit mode (8 data pins)
- Requires enable_pin (E) and rs_pin (RS)
- rw_pin (R/W) is optional - can be tied to GND for write-only mode
- Faster refresh than I2C method

## Example Configurations

### Basic I2C Configuration (16x2 Display)

```yaml
esphome:
  name: lcd-display

esp32:
  board: esp32dev

# I2C Bus
i2c:
  sda: GPIO21
  scl: GPIO22
  scan: true
  id: i2c_bus

# LCD Display
display:
  - platform: lcd_pcf8574
    dimensions: 16x2
    address: 0x27
    lambda: |-
      it.print("Hello World!");
      it.print(0, 1, "ESPHome LCD");
```

### I2C Configuration with Sensor Display (20x4)

```yaml
# I2C Bus
i2c:
  sda: GPIO21
  scl: GPIO22

# Example sensor
sensor:
  - platform: dht
    pin: GPIO4
    temperature:
      name: "Temperature"
      id: temp_sensor
    humidity:
      name: "Humidity"
      id: humidity_sensor
    update_interval: 60s

# Time component for clock
time:
  - platform: homeassistant
    id: esptime

# LCD Display
display:
  - platform: lcd_pcf8574
    dimensions: 20x4
    address: 0x27
    update_interval: 1s
    lambda: |-
      // Line 1: Title
      it.print(0, 0, "  Weather Station");
      
      // Line 2: Temperature
      it.printf(0, 1, "Temp: %.1f C", id(temp_sensor).state);
      
      // Line 3: Humidity
      it.printf(0, 2, "Humidity: %.0f%%", id(humidity_sensor).state);
      
      // Line 4: Time
      it.strftime(0, 3, "Time: %H:%M:%S", id(esptime).now());
```

### GPIO Direct Connection (16x2, 4-bit mode)

```yaml
display:
  - platform: lcd_gpio
    dimensions: 16x2
    data_pins:
      - GPIO12  # D4
      - GPIO13  # D5
      - GPIO14  # D6
      - GPIO15  # D7
    enable_pin: GPIO25  # E
    rs_pin: GPIO26      # RS
    # rw_pin can be omitted and tied to GND
    lambda: |-
      it.print("Direct GPIO");
      it.print(0, 1, "Connection");
```

### Configuration with Backlight Control

```yaml
display:
  - platform: lcd_pcf8574
    id: my_lcd
    dimensions: 16x2
    address: 0x27
    lambda: |-
      it.print("Hello World!");

binary_sensor:
  - platform: gpio
    pin: GPIO4
    name: "Motion Sensor"
    on_press:
      then:
        - binary_sensor.template.publish:
            id: backlight
            state: ON
        - binary_sensor.template.publish:
            id: backlight
            state: OFF
            
  - platform: template
    id: backlight
    filters:
      - delayed_off: 30s
    on_press:
      then:
        - lambda: |-
            id(my_lcd).backlight();
    on_release:
      then:
        - lambda: |-
            id(my_lcd).no_backlight();
```

### Custom Characters Example

```yaml
display:
  - platform: lcd_pcf8574
    dimensions: 16x2
    address: 0x27
    user_characters:
      # Heart symbol
      - position: 0
        data:
          - 0b00000
          - 0b01010
          - 0b11111
          - 0b11111
          - 0b01110
          - 0b00100
          - 0b00000
          - 0b00000
      # Degree symbol
      - position: 1
        data:
          - 0b00110
          - 0b01001
          - 0b01001
          - 0b00110
          - 0b00000
          - 0b00000
          - 0b00000
          - 0b00000
    lambda: |-
      it.print("Temp: 23");
      it.print("\x01");  // Degree symbol
      it.print("C \x08"); // Heart (position 0 or 8 both work)
```

## Backlight Control

### I2C Version (lcd_pcf8574)
- Software controlled via `it.backlight()` and `it.no_backlight()`
- Jumper on PCF8574 board must be closed for backlight control
- Can be controlled in lambda or via automations

### GPIO Version (lcd_gpio)
- Hardware controlled via transistor switch
- Connect BLA (pin 15) to Vcc through transistor
- Connect BLK (pin 16) to GND
- Backlight can draw significant current - use transistor, not MCU pin directly

## Rendering Commands

All rendering happens in the `lambda` section:

```yaml
lambda: |-
  // Print at position (column, row)
  it.print(0, 0, "Hello");
  
  // Print with formatting
  it.printf(0, 1, "Temp: %.1f", id(sensor).state);
  
  // Print time
  it.strftime(0, 2, "%H:%M:%S", id(esptime).now());
  
  // Clear display
  it.clear();
  
  // Backlight control (I2C only)
  it.backlight();
  it.no_backlight();
```

## Finding I2C Address

If your display doesn't respond, try scanning for the I2C address:

```yaml
i2c:
  sda: GPIO21
  scl: GPIO22
  scan: true  # Will log all detected I2C addresses
```

Common addresses:
- **0x27** (most common)
- **0x3F** (alternative)
- **0x20** - **0x27** (possible range)

## Troubleshooting

### Display shows nothing
1. **Check contrast potentiometer** on the PCF8574 board or LCD itself - turn it clockwise/counterclockwise
2. Verify power connections (5V and GND)
3. Check I2C address (use `scan: true` in I2C config)
4. Ensure PCF8574 jumper is in correct position

### Backlight works but no text
- Adjust contrast potentiometer - it might be set too low
- Verify the LCD is receiving proper initialization commands

### Wrong I2C address
- Use `i2c: scan: true` to detect the correct address
- Try common addresses: 0x27, 0x3F, 0x20-0x27

### Garbled characters
- Check wiring connections (especially data pins in GPIO mode)
- Verify correct dimensions in configuration (e.g., 16x2 vs 20x4)
- Check for loose connections

### Display freezes
- Check power supply - insufficient current can cause issues
- Verify I2C wiring isn't too long (keep under 30cm for reliability)
- Add pull-up resistors to I2C lines if needed (4.7kΩ)

## Pin Reference

### Standard HD44780 Pins (without I2C module)
1. **VSS** - Ground
2. **VDD** - Power +5V
3. **V0/VEE** - Contrast adjustment (to potentiometer)
4. **RS** - Register Select
5. **R/W** - Read/Write (can tie to GND for write-only)
6. **E** - Enable
7-10. **D0-D3** - Data pins (not used in 4-bit mode)
11-14. **D4-D7** - Data pins (used in 4-bit and 8-bit modes)
15. **A/BLA** - Backlight Anode (+)
16. **K/BLK** - Backlight Cathode (-)

### PCF8574 I2C Module Pins
- **GND** - Ground
- **VCC** - Power (3.3V or 5V depending on module)
- **SDA** - I2C Data
- **SCL** - I2C Clock

## Additional Features

### LCD Menu Support
The `lcd_gpio` platform supports the [LCD Menu component](https://esphome.io/components/display_menu/lcd_menu) for creating interactive menus with navigation.

## Hardware Notes

- **Salvaged displays**: Work perfectly fine if not damaged - these are very robust
- **Contrast adjustment**: Essential for visibility - small potentiometer on back
- **Power**: Most require 5V, but 3.3V I2C signals work fine with PCF8574 module
- **Backlight current**: Can be 100mA+ depending on display size
- **Operating temperature**: Usually 0°C to 50°C
- **Lifespan**: Very long - can last decades with proper care
