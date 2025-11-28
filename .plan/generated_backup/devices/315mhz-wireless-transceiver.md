---
title: '315MHz Wireless Transceiver'
description: '315MHz RF wireless transmitter and receiver module pair'
category: "communication"
manufacturer: "Generic"
model: "315MHz RF Module"
connectionTypes: ["digital"]
components: ["remote_transmitter", "remote_receiver"]
tags: ["wireless", "rf", "315mhz", "transceiver", "radio"]
productionStatus: "active"
purchaseLinks:
  - vendor: "Amazon"
    url: "https://www.amazon.co.uk/dp/B01DKAAYK2"
references:
  - title: "ESPHome Remote Transmitter"
    url: "https://esphome.io/components/remote_transmitter.html"
  - title: "ESPHome Remote Receiver"
    url: "https://esphome.io/components/remote_receiver.html"
status: "unused"
---

## Overview

The 315MHz wireless transceiver module enables RF communication for remote control and wireless sensor applications.

The module features:
- Operating frequency: 315MHz
- Transmitter and receiver pair
- Operating voltage: 3.5V-12V (transmitter), 5V (receiver)
- Transmission range: up to 100m (open area)
- Low power consumption
- Simple digital interface
- ASK/OOK modulation
- Wide operating temperature range
- Suitable for remote controls, wireless sensors, home automation

## Configuration Notes

- Requires **GPIO pins** for data transmission/reception
- Platform: **remote_transmitter** and **remote_receiver**
- Transmitter connects to one GPIO pin
- Receiver connects to another GPIO pin
- Supports various protocols (RC Switch, etc.)
- Range depends on antenna length and environment
- Consider using 433MHz modules for better range in some regions

### Basic Configuration

```yaml
esphome:
  name: my-rf-module

esp32:
  board: esp32dev
  framework:
    type: esp-idf

remote_transmitter:
  pin: GPIO17
  carrier_duty_percent: 100%

remote_receiver:
  pin: GPIO16
  dump: all
  tolerance: 50%
  filter: 250us
  idle: 4ms
```
