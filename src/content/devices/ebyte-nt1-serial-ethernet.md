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
status: "unsupported"
dateAcquired: "Feb 2024"
---

## Overview

The EBYTE NT1/NT1-B is a serial to Ethernet converter module that bridges TTL/UART serial communication with Ethernet networks. It supports various protocols including Modbus TCP/RTU gateway, MQTT, and dynamic IP configuration.


## Remarks

⚠️ **Note**: This module acts as a transparent serial-to-Ethernet bridge. From ESPHome perspective, you would typically communicate via UART, and the module handles Ethernet conversion independently.

The idea with this was to use it as a "remote" serial port.