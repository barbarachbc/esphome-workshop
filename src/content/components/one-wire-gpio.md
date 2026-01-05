---
title: "1-Wire Bus Support"
description: "Support for devices using 1-Wire bus over GPIO"
category: "one-wire"
esphomeComponent: "gpio"
documentation: "https://esphome.io/components/one_wire/gpio/"
relatedProjects: []
relatedDevices: ["ds18b20-temp-sensor"]
tags: ["bus", "temperature", "onewire"]
lastModified: "2026-01-05"
---

## Overview

Software implementaton of 1-Wire bus.

- **NOTE ⚠️:** Has to use internal GPIO that supports input and output because it is a bi-directional bus.
It cannot use external components for this - like expanders.
- Requires one 4.7K pull up resistor on the GPIO used for the bus. See [DS18B20](/devices/ds18b20-temp-sensor)
for wire-up.
