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
- On-board PCB antenna

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

## ESPHome Limitations

⚠️ **Note:** The NRF24L01 is not currently supported by ESPHome's built-in components.