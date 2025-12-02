---
title: "Raspberry Pi Pico W"
description: "RP2040-based microcontroller board with WiFi and Bluetooth"
category: "board"
manufacturer: "Raspberry Pi"
model: "Pico W"
connectionTypes: ["gpio", "wifi", "bluetooth"]
components: ["rp2040", "wifi", "bluetooth"]
tags: ["rp2040", "wifi", "bluetooth", "raspberry-pi", "pico", "arm-cortex-m0+"]
productionStatus: "active"
status: "pending"
references:
  - title: "Raspberry Pi Pico W Product Page"
    url: "https://www.raspberrypi.com/documentation/microcontrollers/pico-series.html#raspberry-pi-pico-w"
  - title: "Pico W Datasheet"
    url: "https://datasheets.raspberrypi.com/picow/pico-w-datasheet.pdf"
  - title: "Pinout Diagram"
    url: "https://datasheets.raspberrypi.com/picow/PicoW-A4-Pinout.pdf"
  - title: "ESPHome RP2040 Platform"
    url: "https://esphome.io/components/rp2040/"
purchaseLinks:
  - vendor: "Mouser"
    url: "https://www.mouser.ie/ProductDetail/358-SC0918"
  - vendor: "Raspberry Pi"
    url: "https://www.raspberrypi.com/products/raspberry-pi-pico/"
dateAcquired: "Oct 2024"
---

## Overview

The Raspberry Pi Pico W is a low-cost, high-performance microcontroller board with wireless connectivity. It adds WiFi and Bluetooth to the original Raspberry Pi Pico, making it ideal for IoT and connected projects. The board is based on the custom RP2040 microcontroller chip designed by Raspberry Pi.

## Hardware Features

- **Microcontroller:** RP2040 (designed by Raspberry Pi)
- **CPU:** Dual-core ARM Cortex-M0+ processor
- **Clock Speed:** Flexible clock up to 133 MHz
- **RAM:** 264KB of SRAM
- **Flash:** 2MB on-board flash memory
- **Wireless:** Infineon CYW43439 chip
  - WiFi: 802.11n, single-band (2.4 GHz)
  - WPA3 security support
  - Soft AP mode (up to 4 clients)
  - Bluetooth 5.2 (LE Central, Peripheral, and Classic)
- **GPIO Pins:** 26 multi-function GPIO pins
- **ADC:** 3 × 12-bit 500ksps Analog-to-Digital Converter channels
- **PWM:** 16 controllable PWM channels
- **Interfaces:**
  - 2 × SPI
  - 2 × I2C
  - 2 × UART
  - 8 × Programmable I/O (PIO) state machines
- **USB:** USB 1.1 with device and host support
- **Power Modes:** Low-power sleep and dormant modes
- **Temperature Sensor:** On-chip temperature sensor
- **Clock & Timers:** Accurate on-chip clock and timer
- **Programming:** Drag-and-drop programming via USB mass storage
- **Debug:** 3-pin Serial Wire Debug (SWD) header
- **Operating Voltage:** 1.8V - 5.5V (input voltage via USB or VSYS)
- **Board Dimensions:** 51mm × 21mm
- **Form Factor:** Castellated module allowing soldering to carrier boards

## Wireless Module Details

The **Infineon CYW43439** provides wireless connectivity:
- Connected to RP2040 via SPI (typically 33MHz)
- On-board antenna (licensed from ABRACON/ProAnt)
- Some pins shared due to pin limitations:
  - CLK shared with VSYS monitor
  - DIN/DOUT and IRQ share one RP2040 pin
- Commercial use license included for CYW43439 driver and BTstack

## ESPHome Support

✅ **Supported Platform:** `rp2040`

The Raspberry Pi Pico W is officially supported by ESPHome with the RP2040 platform.

### Important Notes

⚠️ **Board Compatibility:** Only the **original Raspberry Pi Pico W** with the Infineon CYW43439 chip is supported. Boards with ESP8285 or similar modules (labeled "RP2040 Pico W-2023") are **NOT** supported.

⚠️ **Development Status:** RP2040 support in ESPHome is still maturing. Some features may have limitations.

⚠️ **Antenna Placement:** For best wireless performance, keep the antenna in free space. Avoid placing metal underneath or near the antenna.

## Basic Configuration

```yaml
esphome:
  name: pico-w-device
  friendly_name: "Pico W Device"

rp2040:
  board: rpipicow

# Enable logging
logger:

# Enable Home Assistant API
api:
  encryption:
    key: !secret api_key

ota:
  - platform: esphome
    password: !secret ota_password

wifi:
  ssid: !secret wifi_ssid
  password: !secret wifi_password
  
  # Enable fallback hotspot (captive portal) in case wifi connection fails
  ap:
    ssid: "Pico-W Fallback"
    password: !secret ap_password

captive_portal:
```

## Configuration Options

### Watchdog Timer

The RP2040 has a built-in watchdog timer that can automatically reboot the device if it hangs:

```yaml
rp2040:
  board: rpipicow
  watchdog_timeout: 8388ms  # Maximum value (default)
  # Set to 0s to disable watchdog
```

### GPIO Configuration Example

```yaml
# Example with various GPIO components
binary_sensor:
  - platform: gpio
    pin:
      number: GPIO15
      mode:
        input: true
        pullup: true
    name: "Button"

switch:
  - platform: gpio
    pin: GPIO16
    name: "Relay"

sensor:
  - platform: adc
    pin: GPIO26  # ADC0
    name: "Analog Sensor"
    update_interval: 60s
    
  - platform: internal_temperature
    name: "Pico W Temperature"
    update_interval: 60s

light:
  - platform: monochromatic
    output: pwm_output
    name: "LED"

output:
  - platform: rp2040_pwm
    id: pwm_output
    pin: GPIO17
    frequency: 1000 Hz
```

### I2C Example

```yaml
i2c:
  sda: GPIO4
  scl: GPIO5
  scan: true
  frequency: 400kHz

sensor:
  - platform: bme280
    temperature:
      name: "BME280 Temperature"
    pressure:
      name: "BME280 Pressure"
    humidity:
      name: "BME280 Humidity"
    address: 0x76
    update_interval: 60s
```

### SPI Example

```yaml
spi:
  clk_pin: GPIO2
  mosi_pin: GPIO3
  miso_pin: GPIO4

# Example with SPI device
display:
  - platform: st7735
    cs_pin: GPIO5
    dc_pin: GPIO6
    reset_pin: GPIO7
    lambda: |-
      it.print(0, 0, id(font), "Hello Pico W!");
```

## GPIO Pinout

The Raspberry Pi Pico W has 26 multi-function GPIO pins (GPIO0-GPIO28, with GPIO23-25 used internally):

### Usable GPIO Pins
- **GPIO0 - GPIO22**: General purpose I/O
- **GPIO26 - GPIO28**: ADC-capable pins (ADC0, ADC1, ADC2)

### Special Function Pins
- **GPIO0-GPIO1**: UART0 (TX, RX) or I2C0 (SDA, SCL) or SPI0
- **GPIO2-GPIO5**: SPI0 or I2C1 or UART1
- **GPIO6-GPIO9**: SPI0 or I2C0 or UART1
- **GPIO10-GPIO15**: SPI1 or I2C1 or UART1
- **GPIO16-GPIO21**: SPI0 or I2C0 or UART0
- **GPIO26-GPIO28**: ADC0, ADC1, ADC2 (analog inputs)

### Reserved/Internal Pins
- **GPIO23**: Wireless chip control (used by CYW43439)
- **GPIO24**: Wireless chip data (used by CYW43439)
- **GPIO25**: Connected to on-board LED (**not directly accessible**)
- **GPIO29**: Used for VSYS voltage monitoring

### ADC Reference
- **ADC0** - GPIO26
- **ADC1** - GPIO27
- **ADC2** - GPIO28
- **ADC3** - Internal (VSYS/3 voltage monitoring via GPIO29)

## On-Board LED

⚠️ **Important:** The on-board LED on the Pico W is **NOT** connected to GPIO25 like on the non-wireless Pico. It's controlled by the CYW43439 wireless chip and requires special handling.

```yaml
# On-board LED control (requires custom implementation)
# Standard GPIO control of GPIO25 will NOT work on Pico W
```

## Power Supply

- **VSYS (pin 39)**: Main power input (1.8V - 5.5V)
- **VBUS (pin 40)**: USB power input (5V when USB connected)
- **3V3 (pin 36)**: 3.3V output from on-board regulator
- **3V3_EN (pin 37)**: Enable pin for 3.3V regulator
- **GND**: Multiple ground pins available

### Power Consumption
- **Active (WiFi)**: ~80-100mA typical
- **Sleep modes**: Can reduce to microamps in dormant mode

## Programming Methods

### Method 1: USB Mass Storage (BOOTSEL)
1. Hold down BOOTSEL button while connecting USB
2. Device appears as USB mass storage "RPI-RP2"
3. Drag and drop `.uf2` firmware file
4. Device automatically reboots and runs new firmware

### Method 2: ESPHome OTA Updates
Once initially flashed with ESPHome:
```bash
esphome run pico-w-device.yaml
```

## PIO (Programmable I/O)

The RP2040 features 8 PIO state machines that can implement custom peripherals:
- Can emulate various interfaces (SD Card, VGA, etc.)
- High-speed I/O operations
- Custom protocol implementation
- Advanced use cases beyond standard ESPHome

## Temperature Sensor

The RP2040 has a built-in temperature sensor:

```yaml
sensor:
  - platform: internal_temperature
    name: "Internal Temperature"
    update_interval: 60s
```

## Known Limitations

1. **On-board LED control**: Requires special handling via wireless chip
2. **ESPHome maturity**: Some features still in development
3. **WiFi power consumption**: Can be higher than low-power ESP32 modes
4. **Bluetooth support**: May have limited ESPHome integration
5. **Some shared pins**: Wireless chip shares some internal pins

## Troubleshooting

### Device not appearing in mass storage mode
- Ensure BOOTSEL button is held **before** connecting USB
- Try different USB cable (must support data, not just power)
- Try different USB port

### WiFi connection issues
- Verify antenna has clear space (no metal nearby)
- Check 2.4GHz WiFi settings (5GHz not supported)
- Ensure WPA2/WPA3 security settings are compatible

### Upload failures
- Press and hold BOOTSEL button during upload
- Use USB mass storage method for initial flash
- Check USB cable quality

### GPIO not working
- Verify pin is not reserved (GPIO23-25 are used internally)
- Check for pin conflicts with SPI/I2C/UART assignments
- Consult pinout diagram for alternate functions

## Variants

- **Pico W**: Standard version with castellated edges
- **Pico WH**: Same as Pico W but with pre-soldered headers
- **Pico 2 W**: Newer version with RP2350 chip (not supported by ESPHome)
