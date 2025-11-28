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
  - vendor: AZ Delivery
    url: https://www.az-delivery.de/en/products/16-in-1-kit-zubehorset-fur-raspberry-pi-arduino-und-andere-mikrocontroller
references:
  - title: "How Soil Moisture Sensor Works and Interface it with Arduino"
    url: "https://lastminuteengineers.com/soil-moisture-sensor-arduino-tutorial/"
dateAcquired: "2016"
status: "pending"
---

## Overview

The YL-69 soil moisture sensor measures soil water content using resistive sensing between two probes.

The module features:
- Two-probe resistive sensor
- Analog voltage output
- Operating voltage: 3.3V-5V
- Uses LM393 comparator for triggering digital output

## Configuration Notes

Probably supported through [GPIO Binary Sensor](https://esphome.io/components/binary_sensor/gpio/) component. And analog through [ADC](https://esphome.io/components/sensor/adc/)