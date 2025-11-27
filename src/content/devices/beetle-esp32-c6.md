---
title: "Beetle ESP32-C6"
description: "DFRobot Beetle ESP32-C6 Development Board"
category: "board"
chip: "ESP32-C6"
specs:
  - "WiFi 6 (2.4 GHz)"
  - "Bluetooth 5.3 (LE)"
  - "USB-C"
  - "4MB Flash"
connectionTypes: ["gpio", "i2c", "spi", "uart", "pwm", "analog"]
image: "/images/devices/beetle-esp32-c6.jpg"
purchaseLinks:
  - vendor: "DFRobot"
    url: "https://www.dfrobot.com/product-2673.html"
  - vendor: "Amazon"
    url: "https://www.amazon.com/s?k=beetle+esp32-c6"
---

# Beetle ESP32-C6

The DFRobot Beetle ESP32-C6 is a compact development board based on the ESP32-C6 chip, featuring WiFi 6 and Bluetooth 5.3 connectivity in a small form factor.

## Features

- **Compact Design**: Ultra-small size perfect for space-constrained projects
- **Modern Connectivity**: WiFi 6 (802.11ax) and Bluetooth 5.3 with LE support
- **USB-C Interface**: Easy programming and power via USB Type-C
- **Low Power**: Excellent power efficiency with multiple sleep modes
- **Rich Peripherals**: GPIO, I2C, SPI, UART, ADC, PWM support

## Technical Specifications

| Specification | Details |
|--------------|---------|
| **Microcontroller** | ESP32-C6 (RISC-V 32-bit) |
| **Flash Memory** | 4MB |
| **WiFi** | 802.11ax (WiFi 6), 2.4 GHz |
| **Bluetooth** | Bluetooth 5.3, BLE |
| **GPIO Pins** | Multiple digital I/O pins |
| **ADC** | 12-bit SAR ADC |
| **Operating Voltage** | 3.3V |
| **Input Voltage** | 5V via USB-C |
| **Dimensions** | ~20mm x 25mm |

## ESPHome Configuration

```yaml
esphome:
  name: beetle-esp32-c6
  friendly_name: Beetle ESP32-C6

esp32:
  board: esp32-c6-devkitc-1
  framework:
    type: esp-idf

# Enable logging
logger:

# Enable Home Assistant API
api:
  encryption:
    key: "your-encryption-key"

ota:
  - platform: esphome
    password: "your-ota-password"

wifi:
  ssid: !secret wifi_ssid
  password: !secret wifi_password
  
  # Enable fallback hotspot
  ap:
    ssid: "Beetle-ESP32-C6"
    password: "fallback-password"

# Web server (optional)
web_server:
  port: 80
```

## Pin Reference

The Beetle ESP32-C6 provides access to various GPIO pins. Refer to the board's pinout diagram for specific pin assignments.

### Common Pin Mappings

- **I2C**: GPIO6 (SDA), GPIO7 (SCL)
- **SPI**: GPIO12 (MOSI), GPIO13 (MISO), GPIO11 (CLK)
- **UART**: GPIO16 (TX), GPIO17 (RX)
- **ADC**: GPIO0-GPIO4 support analog input

## Example Projects

- [Weather Station with BME280](/projects/weather-station-bme280)

## Compatible Components

- [I2C Bus](/components/i2c) - For connecting I2C sensors and displays
- [Sensor Component](/components/sensor) - For various sensor integrations
- Temperature and humidity sensors (BME280, DHT22, etc.)
- OLED displays (SSD1306, etc.)
- Motion sensors and other peripherals

## Programming

### Initial Setup

1. Connect the Beetle ESP32-C6 to your computer via USB-C
2. Install ESPHome if not already installed
3. Create your configuration file
4. Compile and upload

### First Flash

For the first flash, you may need to put the device into download mode:

1. Hold the BOOT button
2. Press and release the RESET button
3. Release the BOOT button
4. Upload your firmware

### OTA Updates

After the initial flash with WiFi configured, subsequent updates can be done wirelessly via OTA.

## Power Considerations

The Beetle ESP32-C6 can be powered via:

- **USB-C**: 5V power supply
- **Battery**: Connect to battery pins (check polarity)
- **3.3V Pin**: Direct 3.3V regulated power

## Troubleshooting

### Device Not Recognized

- Ensure proper USB-C cable (data capable, not charge-only)
- Install CH340 or CP2102 drivers if needed
- Check Device Manager (Windows) for port recognition

### WiFi Connection Issues

- Verify WiFi credentials in secrets.yaml
- Ensure 2.4 GHz network (WiFi 6 backward compatible)
- Check signal strength and router compatibility

### Upload Failures

- Try manual boot mode entry
- Reduce upload speed in platformio_options
- Check USB cable quality and connection

## Additional Resources

- [ESPHome ESP32 Platform Documentation](https://esphome.io/components/esp32.html)
- [DFRobot Product Page](https://www.dfrobot.com/product-2673.html)
- ESP32-C6 Technical Documentation

## Notes

- The ESP32-C6 uses a RISC-V architecture (not Xtensa like older ESP32 models)
- ESP-IDF framework is recommended for ESP32-C6 support
- WiFi 6 features provide improved performance and efficiency
- Lower power consumption compared to older ESP32 variants
