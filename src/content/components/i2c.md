---
title: "I2C Bus"
description: "Inter-Integrated Circuit communication bus for connecting multiple devices"
category: "platform"
esphomeComponent: "i2c"
documentation: "https://esphome.io/components/i2c.html"
requiresHardware: false
tags: ["communication", "bus", "platform"]
---

## Overview

I2C (Inter-Integrated Circuit) is a synchronous, multi-master, multi-slave, packet-switched, single-ended, serial communication bus. In simpler terms, it's a way to connect multiple devices (sensors, displays, etc.) to your microcontroller using just two wires.

## How I2C Works

I2C uses two lines:
- **SDA (Serial Data)** - Data line for sending/receiving information
- **SCL (Serial Clock)** - Clock line to synchronize communication

Each device on the I2C bus has a unique 7-bit address (0x00 to 0x7F), allowing you to connect up to 127 devices on the same two wires.

## ESPHome Configuration

### Basic Setup

```yaml
i2c:
  sda: GPIO21  # Default for ESP32
  scl: GPIO22  # Default for ESP32
  scan: true   # Scan for devices at startup
  frequency: 400kHz  # Optional: Bus speed (default 100kHz)
```

### ESP8266 Example

```yaml
i2c:
  sda: GPIO4   # D2 on NodeMCU
  scl: GPIO5   # D1 on NodeMCU
  scan: true
```

### Multiple I2C Buses

Some microcontrollers support multiple I2C buses:

```yaml
i2c:
  - id: bus_a
    sda: GPIO21
    scl: GPIO22
    scan: true
    
  - id: bus_b
    sda: GPIO25
    scl: GPIO26
    scan: true

# Then reference the bus in your sensors
sensor:
  - platform: bme280
    i2c_id: bus_a
    address: 0x76
    # ... rest of config
    
  - platform: bh1750
    i2c_id: bus_b
    address: 0x23
    # ... rest of config
```

## Common Configuration Options

### scan: true/false
When enabled, ESPHome will scan the I2C bus at startup and log all detected device addresses. Very helpful for debugging!

```
[D][i2c:070]: Results from i2c bus scan:
[D][i2c:076]: Found device at address 0x23
[D][i2c:076]: Found device at address 0x76
```

### frequency
Controls the I2C bus speed:
- **100kHz** - Standard mode (default)
- **400kHz** - Fast mode (recommended for most uses)
- **1MHz** - Fast mode plus (not all devices support)

```yaml
i2c:
  sda: GPIO21
  scl: GPIO22
  frequency: 400kHz  # Faster communication
```

## Hardware Requirements

### Pull-up Resistors

I2C requires pull-up resistors on both SDA and SCL lines (typically 4.7kΩ for 100kHz or 2.2kΩ for 400kHz). 

Most breakout boards include these, but if you're connecting bare chips or having communication issues, you may need to add external pull-ups:

```
3.3V ----[4.7kΩ]---- SDA ---- [Devices]
3.3V ----[4.7kΩ]---- SCL ---- [Devices]
```

### Voltage Levels

⚠️ **Important:** Most I2C devices use 3.3V logic. If mixing 5V and 3.3V devices, use a level shifter to avoid damaging components.

## Supported Devices

Many ESPHome components use I2C:

**Sensors:**
- BME280 (temperature, humidity, pressure)
- BH1750 (light)
- ADS1115 (ADC)
- TSL2561 (light)
- SHT31 (temperature, humidity)
- VL53L0X (distance)

**Displays:**
- SSD1306 OLED
- SH1106 OLED
- LCD with I2C adapter

**I/O Expanders:**
- PCF8574
- MCP23017

**Others:**
- PCA9685 (PWM driver)
- DS3231 (RTC)

## Troubleshooting

### Device Not Detected

1. **Check wiring:**
   - SDA and SCL not swapped
   - Common ground between all devices
   - Secure connections

2. **Verify power:**
   - Device is powered (3.3V or 5V as required)
   - Adequate current available
   - Stable voltage (no brownouts)

3. **Check address:**
   - Use `scan: true` to see detected addresses
   - Verify device address matches configuration
   - Check if address is configurable (e.g., via jumpers)

4. **Pull-up resistors:**
   - Ensure pull-ups are present
   - Try different resistor values (2.2kΩ - 10kΩ)
   - Too many devices? May need stronger pull-ups

### Intermittent Communication

1. **Wire length:**
   - Keep I2C wires short (<30cm for 400kHz)
   - Use twisted or shielded cables for longer runs
   - Reduce frequency for long wires

2. **Interference:**
   - Route I2C away from power lines
   - Add capacitors near devices (0.1µF)
   - Use separate power for noisy components

3. **Bus speed:**
   - Try lowering frequency to 100kHz
   - Some devices don't support fast mode

### Address Conflicts

If two devices have the same I2C address:
- Use multiple I2C buses (if available)
- Check if address is selectable (many chips have address pins)
- Use I2C multiplexer (TCA9548A)

## Best Practices

✅ **Do:**
- Enable `scan: true` during development
- Use 400kHz frequency for better performance
- Keep wires short and tidy
- Add decoupling capacitors (0.1µF) near each device
- Document addresses used in comments

❌ **Don't:**
- Mix 3.3V and 5V without level shifters
- Use wire runs longer than 1m at high speeds
- Add multiple pull-ups on the same bus (one set is enough)
- Hot-plug I2C devices while powered

## Example: Multiple Sensors

```yaml
i2c:
  sda: GPIO21
  scl: GPIO22
  scan: true
  frequency: 400kHz

sensor:
  # BME280 at 0x76
  - platform: bme280
    temperature:
      name: "Temperature"
    humidity:
      name: "Humidity"
    pressure:
      name: "Pressure"
    address: 0x76
    update_interval: 60s
    
  # BH1750 at 0x23
  - platform: bh1750
    name: "Illuminance"
    address: 0x23
    update_interval: 10s
    
  # ADS1115 at 0x48
  - platform: ads1115
    address: 0x48
    continuous_mode: true
    voltage_0:
      name: "Analog Input 0"
```

## Advanced: I2C Multiplexing

For many devices or address conflicts, use a TCA9548A multiplexer:

```yaml
i2c:
  sda: GPIO21
  scl: GPIO22
  
tca9548a:
  - address: 0x70
    id: multiplex1
    channels:
      - bus_id: multiplex1_chan0
        channel: 0
      - bus_id: multiplex1_chan1
        channel: 1

sensor:
  # Two BME280 sensors with same address on different channels
  - platform: bme280
    i2c_id: multiplex1_chan0
    address: 0x76
    # ... config
    
  - platform: bme280
    i2c_id: multiplex1_chan1
    address: 0x76
    # ... config
```

## Common I2C Addresses

Quick reference for popular devices:
- **0x23** - BH1750
- **0x27** - LCD with PCF8574
- **0x38** - PCF8574A
- **0x3C** - SSD1306 OLED (common)
- **0x3D** - SSD1306 OLED (alternate)
- **0x48-0x4B** - ADS1115
- **0x68** - MPU6050, DS3231 RTC
- **0x76** - BME280, BMP280 (common)
- **0x77** - BME280, BMP280 (alternate)
