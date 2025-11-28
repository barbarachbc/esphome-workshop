---
title: 'EBYTE NT1 Serial to Ethernet'
description: 'TTL/UART to Ethernet converter with Modbus gateway support'
category: "communication"
manufacturer: "EBYTE"
model: "NT1-B / NT1"
connectionTypes: ["uart", "ethernet"]
components: ["uart"]
tags: ["ethernet", "serial", "uart", "modbus", "gateway"]
productionStatus: "active"
purchaseLinks:
  - vendor: "AliExpress"
    url: "https://www.aliexpress.com/item/1005003882507376.html"
references:
  - title: "Product Page"
    url: "https://www.ebyte.com"
status: "unused"
---

## Overview

The EBYTE NT1/NT1-B is a serial to Ethernet converter module that bridges TTL/UART serial communication with Ethernet networks. It supports various protocols including Modbus TCP/RTU gateway, MQTT, and dynamic IP configuration.

The module features:
- TTL serial (UART) to RJ45 Ethernet conversion
- 10/100Mbps Ethernet
- Modbus TCP to Modbus RTU gateway
- MQTT protocol support
- TCP Server/Client modes
- UDP mode support
- Dynamic IP (DHCP) and static IP
- Web-based configuration
- Serial baud rates: 600-230400 bps
- Operating voltage: 3.3V or 5V (check variant)
- Low power consumption
- RJ45 connector
- Compact design

## Configuration Notes

⚠️ **Note**: This module acts as a transparent serial-to-Ethernet bridge. From ESPHome perspective, you would typically communicate via UART, and the module handles Ethernet conversion independently.

- Connects via **UART** to ESP32/ESP8266
- Can be used to extend UART communication over Ethernet
- Useful for Modbus RTU to Modbus TCP conversion
- Configuration typically done via web interface or AT commands
- Can enable remote serial device control
- Transparent to ESPHome - appears as serial device

### Basic Configuration

```yaml
esphome:
  name: my-serial-ethernet

esp32:
  board: esp32dev
  framework:
    type: esp-idf

uart:
  id: uart_bus
  tx_pin: GPIO17
  rx_pin: GPIO16
  baud_rate: 9600

# The NT1 module handles Ethernet connection independently
# You communicate with it via UART as if it were a serial device
```
