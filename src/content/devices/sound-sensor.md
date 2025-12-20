---
title: 'Sound Sensor Module'
description: 'Microphone sound detection sensor with digital and analog output'
category: "sensor"
manufacturer: "Generic"
model: "Sound Sensor"
connectionTypes: ["gpio", "analog"]
components: ["binary_sensor", "adc"]
tags: ["sensor", "sound", "microphone", "audio", "noise"]
productionStatus: "active"
purchaseLinks:
  - vendor: "Amazon"
    url: "https://www.amazon.co.uk/dp/B01DKAAYK2"
  - vendor: AZ Delivery
    url: https://www.az-delivery.de/en/products/16-in-1-kit-zubehorset-fur-raspberry-pi-arduino-und-andere-mikrocontroller
references:
  - title: "Interface Sound Sensor with Arduino and Control Devices With a Clap"
    url: "https://lastminuteengineers.com/sound-sensor-arduino-tutorial/"
dateAcquired: "2016"
status: "ready"
image: "/images/devices/thumbnails/sound-sensor.jpg"
lastModified: "2025-12-20"
changelog:
  - date: "2025-12-14"
    type: "updated"
    description: "Started testing"
  - date: "2025-12-20"
    type: "updated"
    description: "Finished testing"
---

## Overview

The sound sensor module detects sound intensity using an electret microphone with adjustable sensitivity.

![Photo of the sound sensor](./images/sound-sensor/sound-sensor.jpg)

The module features:

- Electret microphone capsule (CMA-6542PF)
- Both digital and analog outputs
- Digital output with adjustable threshold
- Analog output for sound level measurement
- Operating voltage: 3.3V-5V
- Adjustable sensitivity via 100K (W104) trimmer potentiometer - ([Bochen 3296](https://www.bochen-guosheng.com/product_detail/170.html))
- Frequency range: 50Hz-10kHz
- Onboard LED indicators
- Uses LM393 comparator for triggering digital output

## Configuration Notes

Supported through:

- Digital: [GPIO Binary Sensor](https://esphome.io/components/binary_sensor/gpio/) component
- Analog through [ADC](https://esphome.io/components/sensor/adc/) component

However, the circuit is pretty poorly designed for analog input 👎:

![KY-037 module schematic](./images/sound-sensor/ky-037-schematic.png)

_Schematic from:_[https://forum.arduino.cc/t/how-to-measure-high-sound-pressure-levels/1128684](https://forum.arduino.cc/t/how-to-measure-high-sound-pressure-levels/1128684)

**NOTE ⚠️**: The microphone output is not amplified and the output is very low for anything useful.
While basic configuration below is correct, it is pretty useless without additional circuit.

**NOTE ⁉️**: Why was potentiometer of 100K selected for this is also beyond me. They probably had
a pile of them when they designed the circuit is my guess. It tooke me 20+ turns to lower
the sensitivity enough for it to pick up any noise.

Power supply: 3.3V just to be on the safe side

For me, the resistance that worked was between 1.6K and 1.7K. Overall, not a great experience.
I'll need to think how to use it.

## Wiring

| KY-037 | ESP32 DevKit | Note |
| ------ | ------------ | ---- |
| + | 3V3 | |
| G | GND | |
| D0 | GPIO18 | Digital output of the sensor module |
| A0 | GPIO33 | Analog output of the sensor module |

## Basic Configuration

Basic example with [ESP32 Devkit V1](./esp32-devkit-v1.md). Can use any GPIO pin for the digital input,
in the example below that is `sensor_dpin: GPIO18`. For analog input: `sensor_apin: GPIO33` - this is ADC1
which uses GPIO32-GPIO39 on ESP32.

```yaml
esphome:
  name: my-sound-sensor

esp32:
  board: esp32dev
  framework:
    type: esp-idf

logger:

substitutions:
  sensor_dpin: GPIO18
  sensor_apin: GPIO33
  builtin_led_pin: GPIO02

binary_sensor:
  - platform: gpio
    id: sound_sensor
    pin: ${sensor_dpin}
    name: "Noise Sensor"
    device_class: sound
    on_press:
      then:
        - output.turn_on: builtin_led
    on_release:
      then:
        - output.turn_off: builtin_led


output:
  - platform: gpio
    pin: ${builtin_led_pin}
    id: builtin_led

light:
  - platform: binary
    name: "Built in LED"
    output: builtin_led

sensor:
  - platform: adc
    pin: ${sensor_apin}
    name: "Sound Sensor"
    update_interval: 100ms
```

## Other Images

Sound sensor:
![Sound sensor front photo](./images/sound-sensor/sound-sensor-front.jpg)

Sound sensor back:
![Sound sensor back photo](./images/sound-sensor/sound-sensor-back.jpg)
