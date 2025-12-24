---
title: 'DS18B20 Digital Temperature Sensor'
description: '1-Wire digital temperature sensor'
category: "sensor"
manufacturer: "Analog"
model: "DS18B20+"
connectionTypes: ["onewire"]
components: ["sensor", "dallas-temp"]
tags: ["sensor", "temperature", "ds18b20", "digital", "onewire"]
productionStatus: "active"
purchaseLinks:
    - vendor: "Farnell"
      url: "https://ie.farnell.com/analog-devices/ds18b20/temperature-sensor-0-5deg-c-to/dp/2515553"
references:
    - title: "Datasheet"
      url: "https://www.analog.com/media/en/technical-documentation/data-sheets/DS18B20.pdf?ADICID=SYND_WW_P682800_PF-spglobal"
    - title: "ESPHome 1-Wire Bus"
      url: "https://esphome.io/components/one_wire/"
    - title: "ESPHome Dallas Temperature Sensor"
      url: "https://esphome.io/components/sensor/dallas_temp/"
status: "pending"
dateAcquired: "2021"
lastModified: "2025-12-24"
---

## Overview

The DS18B20 is a popular digital temperature sensor that communicates over a 1-Wire bus that has a very good
accuracy (±0.5°C). I got this as a 3 pin THT component, so not a module.

Features:

- ±0.5°C Accuracy from -10°C to +85°C
- Programmable Resolution from 9 Bits to 12 Bits
- No External Components Required (well, a resistor is required for 1-Wire Bus)
- 1-Wire interface
- Unique 64-bit serial code
- 3.3V or 5V compatible

## Test Status

- [ ] Basic Configuration

## Wire-up

| DS18B20 | ESP32 DEVKIT | Notes |
| ------- | ------------ | ----- |
| GND (#1) | GND | |
| Vdd (#3) | 3.3V | |
| DQ (#2) | Any GPIO | Has to have 4.7K pullup resistor connected to 3.3V |

- Component Pinout
![DS18B20 pinout diagram](./images/ds18b20-temp-sensor/pinout.png)
- Wiring Up With MCU
![DS18B20 wiring up with MCU diagram](./images/ds18b20-temp-sensor/wiring-up-1-wire.png)
