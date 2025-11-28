---
title: 'W5500 Ethernet Module'
description: 'Hardwired TCP/IP Ethernet controller with SPI interface'
category: "network"
manufacturer: "WIZnet"
model: "W5500"
variants: ["USR-ES1", "W5500 Mini"]
connectionTypes: ["spi", "ethernet"]
components: ["spi", "ethernet"]
tags: ["ethernet", "network", "tcp-ip", "spi"]
productionStatus: "active"
purchaseLinks:
  - vendor: "AliExpress"
    url: "https://www.aliexpress.com/item/1005005973848878.html"
references:
  - title: "ESPHome Ethernet"
    url: "https://esphome.io/components/ethernet.html"
  - title: "W5500 Datasheet"
    url: "https://www.wiznet.io/product-item/w5500/"
status: "unused"
---

## Overview

The W5500 is a hardwired TCP/IP embedded Ethernet controller that provides an easy Internet connection to embedded systems. The USR-ES1 and W5500 Mini modules are compact breakout boards featuring this chip.

The module features:
- Hardwired TCP/IP protocols: TCP, UDP, ICMP, IPv4, ARP, IGMP, PPPoE
- 8 independent hardware sockets simultaneously
- SPI interface (up to 80MHz)
- Internal 32KB memory for TX/RX buffers
- Power down mode and wake-on-LAN
- Operating voltage: 3.3V
- RJ45 connector with integrated magnetics
- Auto-negotiation (10/100Mbps)
- Auto MDI/MDIX
- Link and activity LEDs

## Configuration Notes

- Requires **SPI** interface
- Platform: **ethernet** with type **W5500**
- More reliable than WiFi for stationary devices
- Lower power than WiFi
- Requires physical cable connection
- Typical pins: CS, SCK, MISO, MOSI, RST (optional), INT (optional)

### Basic Configuration

```yaml
esphome:
  name: my-w5500

esp32:
  board: esp32dev
  framework:
    type: esp-idf

spi:
  clk_pin: GPIO18
  mosi_pin: GPIO23
  miso_pin: GPIO19

ethernet:
  type: W5500
  clk_pin: GPIO18
  mosi_pin: GPIO23
  miso_pin: GPIO19
  cs_pin: GPIO5
  interrupt_pin: GPIO35
  reset_pin: GPIO14
```
