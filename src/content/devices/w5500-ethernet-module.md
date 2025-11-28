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
  - title: "W5500 Datasheet"
    url: "https://www.mouser.com/catalog/specsheets/Wiznet_W5500_DS_1%200%205.pdf"
status: "pending"
dateAcquired: "Feb 2024"
count: 2
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
- Platform: [**ethernet**](https://esphome.io/components/ethernet/) with type **W5500**
- More reliable than WiFi for stationary devices
- Lower power than WiFi
- Requires physical cable connection
- Typical pins: CS, SCK, MISO, MOSI, RST (optional), INT (optional)

