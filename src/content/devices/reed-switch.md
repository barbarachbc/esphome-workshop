---
title: 'Reed Switch'
description: 'Magnetic proximity sensor switch'
category: "sensor"
manufacturer: "Littelfuse"
model: "59165"
variants: ["59165-1-T-00-A", "57045-000"]
connectionTypes: ["gpio"]
components: ["binary_sensor"]
tags: ["magnetic", "switch", "sensor", "proximity"]
productionStatus: "active"
purchaseLinks:
  - vendor: "Mouser"
    url: "https://www.mouser.ie/ProductDetail/Littelfuse/59165-1-T-00-A?qs=X8LBAgEWIKKHNfx72tHpiw%3D%3D"
  - vendor: "Mouser"
    url: "https://www.mouser.ie/ProductDetail/Littelfuse/57045-000?qs=X8LBAgEWIKLVJq%2FbiZDkww%3D%3D"
references:
  - title: Datasheet - Reed Switch
    url: "https://www.littelfuse.com/assetdocs/littelfuse_reed_switch_59165_datasheet.pdf?assetguid=5790fb05-694c-43c9-a75c-7a9f3464843b"
  - title: Datasheet - Actuator
    url: "https://www.littelfuse.com/assetdocs/littelfuse-magnetic-actuators-datasheet?assetguid=c6e760c4-1013-4fb5-9d12-56a308d43f9f"
  - title: "Interfacing Reed Switch with Arduino"
    url: "https://lastminuteengineers.com/reed-switch-arduino-tutorial/"
status: "pending"
dateAcquired: "Nov 2024"
count: 3
---

## Overview

A reed switch is a passive electronic switching device that operates via an applied magnetic field. It consists of two ferromagnetic contacts sealed in a glass tube that close when a magnetic field is present.

The 59165 is a miniature overmolded reed switch 16.00mm x
2.40mm x 2.40mm (0.630” x 0.095” x 0.095”) with either straight
or Gull Wing leads. It has normally open contact, capable of
switching up to 200Vdc at 10W

- Two-part magnetically operated proximity switch.
- No standby power requirement
- Operates through non-ferrous materials such as wood, plastic or aluminium

57045-000 actuators

## Configuration Notes

- Requires single **GPIO** pin (with pull-up/pull-down resistor)
- Platform: [GPIO Binary Sensor](https://esphome.io/components/binary_sensor/gpio/)
- Passive device - acts as mechanical switch
- Needs external or internal pull-up/pull-down resistor
- NO type: open circuit without magnet, closed with magnet
