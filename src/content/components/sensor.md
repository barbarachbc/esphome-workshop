---
title: "Sensor Component"
description: "Base component for all sensor types that report numerical values"
category: "sensor"
esphomeComponent: "sensor"
documentation: "https://esphome.io/components/sensor/index.html"

relatedDevices: ["esp32-devkit-v1"]
tags: ["measurement", "data", "monitoring"]
---

## Overview

The `sensor` component in ESPHome is the base for all components that report numerical measurements. Sensors provide read-only data like temperature, humidity, power consumption, distance, etc.

Sensors differ from binary sensors (on/off states) in that they report continuous numerical values with units of measurement.

## Related Devices

- [JC2432W328C ESP32 2.8" Display](/devices/jc2432w328c) - Displays sensor data from Home Assistant
- [DFRobot Beetle ESP32-C6](/devices/beetle-esp32-c6) - Displays temperature, humidity, and other sensor readings

## Integration with Home Assistant

Sensors automatically appear in Home Assistant when using the API component.

The sensor will:
- Show in Home Assistant with the icon
- Be graphable in history
- Be usable in automations
- They can be excluded from integration with Home Assistant if marked internal
- To Appear in Home Assistant they need to have a name

