---
title: 'DHT11 Temperature and Humidity Sensor'
description: 'Digital temperature and humidity sensor module'
category: "sensor"
manufacturer: "Generic"
model: "DHT11"
connectionTypes: ["gpio"]
components: ["dht", "sensor"]
tags: ["sensor", "temperature", "humidity", "dht11", "digital"]
productionStatus: "active"
purchaseLinks:
  - vendor: "Amazon"
    url: "https://www.amazon.co.uk/dp/B01DKAAYK2"
references:
  - title: "ESPHome DHT"
    url: "https://esphome.io/components/sensor/dht.html"
status: "unused"
---

## Overview

The DHT11 is a basic, low-cost digital temperature and humidity sensor with a calibrated digital signal output.

The module features:
- Temperature range: 0-50°C (±2°C accuracy)
- Humidity range: 20-80% RH (±5% accuracy)
- Single-wire digital interface
- Operating voltage: 3.3V-5V
- Sampling rate: 1Hz (once per second)
- Low power consumption
- Long-term stability
- Easy to interface
- Suitable for weather stations, HVAC, environmental monitoring

## Configuration Notes

- Requires **GPIO** pin for data communication
- Platform: **dht**
- Model: **DHT11**
- Single-wire communication protocol
- Slow update rate (1Hz maximum)
- Built-in pull-up resistor on most modules
- Consider DHT22 for better accuracy and range

### Basic Configuration

```yaml
esphome:
  name: my-dht11-sensor

esp32:
  board: esp32dev
  framework:
    type: esp-idf

sensor:
  - platform: dht
    pin: GPIO27
    model: DHT11
    temperature:
      name: "Temperature"
    humidity:
      name: "Humidity"
    update_interval: 10s
```
