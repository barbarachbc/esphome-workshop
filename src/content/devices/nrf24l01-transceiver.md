---
title: 'NRF24L01 2.4GHz Wireless RF Transceiver'
description: '2.4GHz wireless RF transceiver module for long-range communication'
category: "peripheral"
manufacturer: "Nordic Semiconductor"
model: "NRF24L01"
connectionTypes: ["spi"]
components: []
tags: ["wireless", "rf", "2.4ghz", "transceiver", "radio", "spi"]
productionStatus: "obsolete"
purchaseLinks:
  - vendor: "Gleanntronics"
    url: "https://gleanntronics.ie/en/products/nrf24l01-ism-2-4-2-5-ghz-transceiver-module-35.html"
  - vendor: "Amazon"
    url: "https://www.amazon.co.uk/AZDelivery-NRF24L01-wireless-Arduino-ESP8266/dp/B06XJN417D/?th=1"
references:
  - title: "Pinout Diagram"
    url: "https://www.usinainfo.com.br/1029407-infografico/nrf24l01-transceptor-wireless-24ghz.jpg"
  - title: "Arduino Tutorial - How To Mechatronics"
    url: "https://howtomechatronics.com/tutorials/arduino/arduino-wireless-communication-nrf24l01-tutorial/"
  - title: "IoT Home Automation Example"
    url: "https://www.hackster.io/TMRh20/iot-home-automation-w-nrf24l01-raspberry-pi-9ee904"
dateAcquired: "Jan 2024"
status: "unsupported"
---

## Overview

The NRF24L01 is a highly integrated, ultra-low power 2.4GHz transceiver module designed for wireless communication applications. It's one of the most popular RF modules for Arduino and microcontroller projects due to its low cost, ease of use, and excellent range.

The module features:
- Operating frequency: 2.4 - 2.5GHz ISM band
- Data rates: 250Kbps / 1Mbps / 2Mbps (configurable)
- Maximum output power: 0dBm
- Operating voltage: 1.9V - 3.6V (module power)
- Maximum operating current: 12.3mA (transmitting)
- Standby current: 22µA
- Logic inputs: 5V tolerant
- Communication range: Up to 100m in open space (standard version)
- 125 independent channels
- Up to 6 addresses per channel (multi-device network capability)
- SPI interface for communication
- Built-in CRC error detection
- Automatic retransmission
- Low power consumption ideal for battery-powered projects

## Module Variations

### Standard NRF24L01
- On-board PCB antenna
- Compact size
- Range: ~100m in open space
- Most common and affordable version

### NRF24L01+ with External Antenna
- SMA connector for external antenna
- Duck antenna included
- Better range and signal quality
- Range: ~300-500m with good antenna

### NRF24L01+ PA/LNA
- Power Amplifier (PA) and Low-Noise Amplifier (LNA)
- External antenna with SMA connector
- Significantly improved range
- Range: Up to 1000m in open space
- Higher power consumption
- Requires stable power supply

## Pinout

The NRF24L01 has 8 pins:

| Pin | Name | Description |
|-----|------|-------------|
| 1 | GND | Ground (0V) |
| 2 | VCC | Power supply (1.9V - 3.6V) - **Use 3.3V** |
| 3 | CE | Chip Enable (digital input) - Activates RX/TX mode |
| 4 | CSN | Chip Select Not (SPI chip select, active low) |
| 5 | SCK | SPI Clock (SPI clock input) |
| 6 | MOSI | SPI Data Input (Master Out Slave In) |
| 7 | MISO | SPI Data Output (Master In Slave Out) |
| 8 | IRQ | Interrupt Request (output, optional - can detect events) |

## Configuration Notes

- Requires **SPI** interface for communication
- **Not directly supported in ESPHome** - No native component available
- Can be used with custom components or external libraries
- **Important:** Module requires 3.3V power supply (VCC pin)
- Logic pins are 5V tolerant, can interface with 5V microcontrollers
- **Highly recommended:** Use 10µF - 100µF decoupling capacitor across VCC and GND
- Power supply noise is a common issue - external power supply may be needed
- CE and CSN pins can be connected to any GPIO pins
- SPI pins must be connected to hardware SPI pins of the microcontroller
- IRQ pin is optional but useful for interrupt-driven communication
- Keep modules at least 1m apart during initial testing to ensure stable communication

## ESPHome Limitations

⚠️ **Note:** The NRF24L01 is not currently supported by ESPHome's built-in components. To use this module with ESPHome, you would need to:

1. Create a custom component using the [RF24 Arduino library](https://github.com/tmrh20/RF24/)
2. Use ESPHome's [custom component](https://esphome.io/custom/custom_component.html) framework
3. Consider alternative ESPHome-compatible RF modules like:
   - ESP-NOW (built into ESP32/ESP8266)
   - 433MHz RF modules with `remote_transmitter`/`remote_receiver`
   - LoRa modules

## Hardware Connections (ESP32 Example)

If implementing as a custom component:

```yaml
# Example SPI configuration (not for NRF24L01 directly)
spi:
  clk_pin: GPIO18    # SCK
  mosi_pin: GPIO23   # MOSI
  miso_pin: GPIO19   # MISO

# CE and CSN would be defined in custom component
# CE -> GPIO4 (example)
# CSN -> GPIO5 (example)
```

## Typical Use Cases

- **Wireless sensor networks**: Multiple sensors communicating with a central hub
- **RC control**: Remote control for robots, drones, RC cars
- **Home automation**: Wireless switches, sensors, and controllers
- **Point-to-point communication**: Between two microcontrollers
- **Mesh networks**: Using RF24Network or RF24Mesh libraries
- **Low-power IoT devices**: Battery-powered sensors with long range

## Power Supply Notes

The NRF24L01 is sensitive to power supply quality:

1. **Always use a decoupling capacitor** (10µF to 100µF) as close as possible to the module's VCC/GND pins
2. The 3.3V output from many microcontrollers may not provide sufficient current during transmission
3. Consider using an external 3.3V voltage regulator (like AMS1117-3.3V) powered from 5V
4. Connect all grounds together (module, microcontroller, external power supply)
5. Poor power supply is the #1 cause of communication issues

## Arduino Library Support

For Arduino/ESP32 development (outside ESPHome):
- **RF24 Library**: [github.com/tmrh20/RF24](https://github.com/tmrh20/RF24/)
- **RF24Network**: For mesh networking capabilities
- **RF24Mesh**: For dynamic mesh networks
- Widely documented with extensive examples

## Troubleshooting

Common issues and solutions:

1. **No communication**: 
   - Check power supply and add decoupling capacitor
   - Verify SPI pin connections
   - Separate modules by at least 1 meter initially
   - Use external 3.3V power supply

2. **Intermittent connection**:
   - Power supply noise (add larger capacitor)
   - Modules too close together (move apart)
   - Antenna orientation (try different positions)

3. **Short range**:
   - Check power supply voltage (should be 3.3V)
   - Increase PA level in code
   - Consider PA/LNA version for longer range
   - Check for obstacles and interference

4. **Garbled data**:
   - Check baud rate settings
   - Verify data structure matches on TX and RX
   - Check for power supply issues
