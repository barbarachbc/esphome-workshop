---
title: 'YL-69 Soil Moisture Sensor'
description: 'Resistive soil moisture detection sensor with analog output'
category: "sensor"
manufacturer: "Generic"
model: "YL-69"
connectionTypes: ["analog"]
components: ["adc", "sensor"]
tags: ["sensor", "soil", "moisture", "humidity", "yl-69", "analog"]
productionStatus: "active"
purchaseLinks:
  - vendor: "Amazon"
    url: "https://www.amazon.co.uk/dp/B01DKAAYK2"
references:
  - title: "ESPHome ADC Sensor"
    url: "https://esphome.io/components/sensor/adc.html"
status: "unused"
---

## Overview

The YL-69 soil moisture sensor measures soil water content using resistive sensing between two probes.

The module features:
- Two-probe resistive sensor
- Analog voltage output
- Operating voltage: 3.3V-5V
- Compact probe design
- Easy to use with ADC
- Suitable for plant monitoring, irrigation systems, agriculture
- Corrosion-resistant probes (with coating)
- Low power consumption

## Configuration Notes

- Requires **ADC** (Analog-to-Digital Converter)
- Platform: **adc**
- Output voltage inversely proportional to moisture (higher voltage = drier soil)
- Probes may corrode over time if constantly powered
- Consider power cycling to extend probe life
- Calibration needed for specific soil types
- Readings affected by soil composition and salinity

### Basic Configuration

```yaml
esphome:
  name: my-soil-sensor

esp32:
  board: esp32dev
  framework:
    type: esp-idf

sensor:
  - platform: adc
    pin: GPIO32
    id: soil_moisture
    name: "Soil Moisture"
    update_interval: 60s
    attenuation: 11db
    filters:
      - calibrate_linear:
          - 3.3 -> 0.0
          - 1.0 -> 100.0
      - lambda: return max(0.0f, min(100.0f, x));
    unit_of_measurement: "%"
```
