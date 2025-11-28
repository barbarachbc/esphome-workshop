---
title: '315MHz Wireless Transceiver'
description: '315MHz RF wireless transmitter and receiver module pair'
category: "peripheral"
manufacturer: "Generic"
model: "315MHz RF Module"
connectionTypes: ["gpio"]
components: ["remote_transmitter", "remote_receiver"]
tags: ["wireless", "rf", "315mhz", "transceiver", "radio"]
productionStatus: "active"
purchaseLinks:
  - vendor: "Amazon"
    url: "https://www.amazon.co.uk/dp/B01DKAAYK2"
  - vendor: AZ Delivery
    url: https://www.az-delivery.de/en/products/16-in-1-kit-zubehorset-fur-raspberry-pi-arduino-und-andere-mikrocontroller
references:
  - title: Usage example
    url: https://www.instructables.com/RF-315433-MHz-Transmitter-receiver-Module-and-Ardu/
dateAcquired: "2016"
status: "pending"
---

## Overview

The 315MHz wireless transceiver module enables RF communication for remote control and wireless sensor applications.

The module features:
- Operating frequency: 
    - transmitter 315MHz or 433MHz
    - receiver 315MHz-433.92MHz
- Transmitter and receiver pair
- Operating voltage: 3.5V-12V (transmitter), 5V (receiver)
- Transmission range: up to 100m (open area)
- Low power consumption - transmitter: max  Less than 40mA max , and min 9mA, receiver: ≤5.5mA max
- Simple digital interface
- ASK/OOK modulation

## Remarks

Pending testing. Can possibly use [Remote Transmitter](https://esphome.io/components/remote_transmitter/) and [Remote Receiver](https://esphome.io/components/remote_receiver/) components.

Setting up [RF Devices](https://esphome.io/guides/setting_up_rmt_devices/#remote-setting-up-rf)