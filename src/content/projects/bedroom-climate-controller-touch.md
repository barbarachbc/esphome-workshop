---
title: 'Bedroom Climate Controller with Touch Interface'
description: "A compact climate controller with OLED display and capacitive touch buttons for monitoring weather, controlling heating, and displaying indoor conditions"
difficulty: "advanced"
devices: ["beetle-esp32-c6", "sh1107-spi-oled", "touch-phat", "adafruit-neopixel"]
components: [
  "api", "ota", "wifi", "captive-portal", "logger",
  "substitutions", "globals", "script",
  "time-sntp",
  "number-template",
  "sensor-homeassistant",
  "text-sensor-homeassistant",
  "binary-sensor",
  "output-gpio",
  "light-monochromatic", "light-rgb",
  "display-ssd1306-spi",
  "font", "image",
  "i2c", "spi",
  "cap1166", "external-components"
]
tags: [
  "monitoring", "control", "heating", "weather", "temperature", "humidity",
  "touch", "oled", "capacitive-touch", "climate", "thermostat",
  "multi-page", "dashboard"
]
status: "in-progress"
changelog:
  - date: "2025-12-03"
    type: "added"
    description: "Created first version of the document"
lastModified: "2025-12-03"
---

## Project Overview

This advanced project creates a compact bedroom climate controller with a monochrome OLED display and capacitive touch interface that provides:

- 🕐 Real-time clock display with date
- 🌤️ Weather information (current temperature, forecast icon, and description)
- 🌡️ Indoor climate monitoring (temperature and humidity)
- 🔥 Advanced thermostat control with multiple preset modes (frost, eco, comfort, boost)
- 🎯 Fine-grained temperature adjustment for boost mode
- 🚗 EV battery level monitoring
- 💡 Interactive LED feedback on touch buttons
- 📄 Multi-page interface with heating control page
- 🎨 Context-aware heating status visualization

The controller integrates seamlessly with Home Assistant to provide real-time monitoring and control of your bedroom climate and displays useful ambient information.

### Reusability Note

This is an advanced project that requires custom external components and specific hardware. While functional and well-documented, it's presented as a showcase/reference implementation. The project demonstrates sophisticated touch interaction patterns, multi-page OLED interfaces, and complex climate control logic that can be adapted for your specific needs. Understanding of ESPHome, I2C/SPI protocols, and custom components is recommended.

**Note:** This project is currently in progress. The RGB LED (Neopixel) for ambient lighting and notifications will be added in a future update.

## What You'll Need

### Hardware

- 1x [DFRobot Beetle ESP32-C6](/devices/beetle-esp32-c6) - Compact ESP32-C6 development board
- 1x [SH1107 OLED Display (128x128, SPI)](/devices/sh1107-spi-oled) - Monochrome display breakout
- 1x [Pimoroni Touch pHAT](/devices/touch-phat) - 6 capacitive touch buttons with RGB LEDs (I2C)
- 1x [Adafruit NeoPixel](/devices/adafruit-neopixel) - RGB LED for ambient/notification (to be added)
- Jumper wires for connections
- USB-C cable (data capable)
- Power supply (USB charger, 5V/1A minimum)
- Optional: 3D printer for custom enclosure (design in progress)

### Wiring Connections

| Component | Pin | ESP32-C6 GPIO | Notes |
|-----------|-----|---------------|-------|
| **SPI Display (SH1107)** |
| SCK | CLK | GPIO23 | SPI Clock |
| MOSI | MOSI | GPIO22 | SPI Data Out |
| CS | CS | GPIO05 | Chip Select |
| DC | DC | GPIO07 | Data/Command |
| RST | - | (3.3V) | Reset (always high) |
| **I2C Touch pHAT (CAP1166)** |
| SDA | SDA | GPIO19 | I2C Data |
| SCL | SCL | GPIO20 | I2C Clock |
| **ESP32-C6 Built-in** |
| LED | - | GPIO15 | Built-in LED |
| BOOT | - | GPIO09 | Boot button |
| **NeoPixel (Future)** |
| DIN | DATA | (TBD) | To be determined |

**Power Notes:**
- All components use 3.3V logic level
- Touch pHAT requires 5V power supply
- Level shifting may be required depending on your specific modules

### Software

- ESPHome installed (version 2024.6.0 or later)
- Home Assistant with configured integrations:
  - Weather integration (e.g., Met.no, OpenWeatherMap)
  - Climate integration (Versatile Thermostat recommended)
  - Zigbee integration (for temperature/humidity sensor)
- USB-to-Serial drivers (if required by your system)

### Required Home Assistant Entities

This project requires the following entities in Home Assistant. You'll need to update the substitutions with your own entity IDs:

- **Climate Entity**: Thermostat/TRV with preset modes (frost, eco, comfort, boost)
  - Example: `climate.bedroom_heater` (using Versatile Thermostat integration)
  - Must support `preset_mode` attribute and `climate.set_preset_mode` action
- **Temperature Sensor**: Indoor temperature reading
  - Example: `sensor.bedroom_temperature` (Zigbee sensor)
- **Humidity Sensor**: Indoor humidity reading
  - Example: `sensor.bedroom_humidity` (Zigbee sensor)
- **Weather Integration**: Home Assistant weather entity
  - Example: `weather.forecast_home`
  - Must provide `temperature` and `temperature_unit` attributes
- **EV Battery Sensor** (optional): Electric vehicle battery level
  - Example: `sensor.car_battery_level`
- **Number Entity**: Boost preset temperature setting (if using Versatile Thermostat)
  - Example: `number.bedroom_heater_preset_boost_temp`

### Additional Files

- Material Design Icons font file ([download from CDN](https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/7.4.47/fonts/materialdesignicons-webfont.ttf))
  - For latest version: [MaterialDesign-Webfont CDN](https://cdnjs.com/libraries/MaterialDesign-Webfont)
  - Save as `assets/materialdesignicons-webfont.ttf` in your ESPHome directory
- `weather_icon_map.h` header file (see placeholder below - link to implementation will be provided)
- CAP1166 custom component from external_components directory (see configuration)

## Project Photos

<!-- TODO: Add photos of finished device -->
_Photos of the completed climate controller will be added here once the enclosure is designed._

<!-- TODO: Add wiring diagram -->
_Detailed wiring diagram showing all connections will be added here._

## 3D Printed Enclosure

<!-- TODO: Add 3D model files and assembly instructions -->
_3D printable enclosure design is in progress. STL files and assembly instructions will be provided here._

The enclosure will house:
- ESP32-C6 board
- SH1107 OLED display (front-facing)
- Touch pHAT buttons (front-facing)
- NeoPixel LED (for ambient/notification lighting)
- USB-C access for programming and power

## Hardware Setup

This project uses multiple breakout modules that require wiring:

### DFRobot Beetle ESP32-C6

The Beetle ESP32-C6 is a compact development board based on the ESP32-C6 chip. For detailed specifications, pinout, and programming instructions, see the [Beetle ESP32-C6 device page](/devices/beetle-esp32-c6).

### SH1107 OLED Display

The SH1107 is a 128x128 monochrome OLED display connected via SPI. This breakout board provides excellent contrast and readability. For more details, see the [SH1107 SPI OLED device page](/devices/sh1107-spi-oled).

### Pimoroni Touch pHAT

The Touch pHAT provides 6 capacitive touch buttons with individual RGB LED backlighting, controlled via the CAP1166 IC over I2C. For pinout and specifications, see the [Touch pHAT device page](/devices/touch-phat).

**Important Notes:**
- This project uses a custom external component for CAP1166 support
- The Touch pHAT is designed for Raspberry Pi but works with ESP32 via I2C
- LED channels are inverted on the Touch pHAT hardware

### Adafruit NeoPixel (Future Addition)

RGB LED strip or ring for ambient lighting and notifications. See the [Adafruit NeoPixel device page](/devices/adafruit-neopixel) for details. This will be added in a future update.

## ESPHome Configuration

### Prerequisites

Before using this configuration, ensure you have:

1. **Home Assistant** with the following configured:
   - Weather integration (provides `weather.forecast_home` entity)
   - Climate entity with preset mode support
   - Indoor temperature and humidity sensors (Zigbee or other)
   - Optional: EV battery sensor integration
   - Versatile Thermostat integration (recommended) - [GitHub](https://github.com/jmcollin78/versatile_thermostat)

2. **External Component** - CAP1166 driver:
   - Located at `external_components/esphome/components/cap1166`
   - This custom component provides support for the CAP1166 capacitive touch controller
   - TODO: Link to component repository/documentation will be provided

3. **Font File** - Material Design Icons saved as `assets/materialdesignicons-webfont.ttf`

4. **Header File** - `weather_icon_map.h` (see below)

### Secrets File Setup

Create a `secrets.yaml` file in your ESPHome directory with your credentials:

```yaml
wifi_ssid: "Your_WiFi_SSID"
wifi_password: "Your_WiFi_Password"
```

For more information on using secrets in ESPHome, refer to the [ESPHome secrets documentation](https://esphome.io/guides/faq.html#how-do-i-use-secrets-yaml).

### Weather Icon Map Header File

Create a file named `weather_icon_map.h` in your ESPHome directory:

```cpp
// weather_icon_map.h
// Maps Home Assistant weather conditions to Material Design Icons
// TODO: Complete implementation will be linked here
// 
// This file should contain two maps:
// 1. weather_icon_map: Maps weather states to MDI unicode characters
// 2. weather_desc_map: Maps weather states to human-readable descriptions
//
// Example structure:
// std::map<std::string, std::string> weather_icon_map = {
//   {"sunny", "\U000F0599"},
//   {"cloudy", "\U000F0590"},
//   // ... etc
// };
```

### Main Configuration File

Create your ESPHome configuration file (e.g., `bedroom2-controller.yaml`):

```yaml
esphome:
  name: bedroom2-controller
  friendly_name: bedroom2-controller
  includes:
    - weather_icon_map.h
  # https://esphome.io/components/esphome/#on_boot
  on_boot:
    - priority: 1
      then:
      - delay: 5s
      - globals.set:
          id: my_boot_in_progress
          value: !lambda |-
            return id(my_boot_in_progress) >= 2 ? 2 : id(my_boot_in_progress);

esp32:
  variant: esp32c6

# https://esphome.io/components/logger/
logger:
  # Set to WARN to reduce log verbosity
  # Change to DEBUG for troubleshooting
  #level: WARN

# https://esphome.io/components/api/
api:
  encryption:
    key: "generate_new_key_here"  # Generate new key with: esphome config <file>

# https://esphome.io/components/ota/
ota:
  - platform: esphome
    password: "your_strong_password"

# https://esphome.io/components/wifi/
wifi:
  ssid: !secret wifi_ssid
  password: !secret wifi_password

  # Enable fallback hotspot (captive portal) in case wifi connection fails
  # https://esphome.io/components/wifi/#access-point-mode
  ap:
    ssid: "Bedroom2-Controller"
    password: "your_fallback_password"
  
  # Track connection status for boot progress
  # https://esphome.io/components/wifi/#on_connect--on_disconnect-trigger
  on_connect:
    - delay: 5s
    - globals.set:
          id: my_boot_in_progress
          value: !lambda |-
            return id(my_boot_in_progress) >= 1 ? 1 : 0;

# https://esphome.io/components/captive_portal/
captive_portal:

# https://esphome.io/components/substitutions/
substitutions:
  # Climate control entity (without climate. prefix)
  heater: bedroom_heater
  
  # EV battery level sensor (without sensor. prefix)
  car_battery_level: ev_battery_level
  
  # Indoor sensors (without sensor. prefix)
  indoor_temp: bedroom_temperature
  indoor_humid: bedroom_humidity
  
  # GPIO Pin Assignments
  builtin_led_pin: GPIO15
  boot_btn_pin: GPIO09
  clk_pin: GPIO23
  mosi_pin: GPIO22
  sda_pin: GPIO19
  scl_pin: GPIO20
  disp_cs_pin: GPIO05
  disp_dc_pin: GPIO07

# External component for CAP1166 capacitive touch controller
# https://esphome.io/components/external_components/
external_components:
  - source:
      type: local
      path: external_components/esphome/components
    components:
      - cap1166
    refresh: always

# https://esphome.io/guides/automations/#global-variables
globals:
  # Boot progress tracking: 3=starting, 2=wifi connecting, 1=HA connecting, 0=ready
  - id: my_boot_in_progress
    type: int
    restore_value: no
    initial_value: '3'
  
  # Weather data caching
  - id: my_forecast_desc
    type: std::string
    restore_value: no
    initial_value: '"Updating ..."'
  - id: my_forecast_icon
    type: std::string
    restore_value: no
    initial_value: '""'
  - id: my_outside_temp
    type: std::string
    restore_value: no
    initial_value: '"_.__C"'
  
  # UI state for heating control
  - id: selecting_heating_preset
    type: std::string
    restore_value: no
    initial_value: '""'
  - id: changing_heating_temp
    type: float
    restore_value: no
    initial_value: '0'

# https://esphome.io/guides/automations/#script-component
script:
  # Update weather display from Home Assistant weather entity
  - id: update_weather
    then:
      - globals.set:
          id: my_boot_in_progress
          # Mark as fully connected to Home Assistant
          value: '0'
      - globals.set:
          id: my_forecast_icon
          value: !lambda return weather_icon_map[id(forecast_desc).state.c_str()].c_str();
      - globals.set:
          id: my_forecast_desc
          value: !lambda return weather_desc_map[id(forecast_desc).state.c_str()].c_str();
  
  # Format and update outside temperature display
  - id: update_outside_temp
    then:
      - globals.set:
          id: my_outside_temp
          value: !lambda return str_sprintf("%.1f%s", id(outside_temperature).state, id(outside_temperature_unit).state.c_str());
  
  # Button A: Decrease temperature or select "frost" preset
  - id: a_button_click
    then:
      - if:
          condition:
            - lambda: return id(changing_heating_temp) > 0;
          then:
            # Decrease temperature in 0.5°C steps (min 15°C)
            - globals.set:
                id: changing_heating_temp
                value: !lambda |-
                  if(id(changing_heating_temp) <= 15){
                    return 15.0;
                  } else {
                    return id(changing_heating_temp) - 0.5;
                  }
          else:
            # Select "frost" preset mode
            - script.execute:
                id: change_preset
                preset: "frost"
  
  # Button D: Increase temperature or select "boost" preset
  - id: d_button_click
    then:
      - if:
          condition:
            - lambda: return id(changing_heating_temp) > 0;
          then:
            # Increase temperature in 0.5°C steps (max 28°C)
            - globals.set:
                id: changing_heating_temp
                value: !lambda |-
                  if(id(changing_heating_temp) >= 28){
                    return 28.0;
                  } else {
                    return id(changing_heating_temp) + 0.5;
                  }
          else:
            # Select "boost" preset mode
            - script.execute:
                id: change_preset
                preset: "boost"
  
  # Initiate preset change selection (shows confirmation UI)
  - id: change_preset
    parameters:
      preset: string
    then:
      - if:
          condition:
            and:
              # Only on heating page
              - display.is_displaying_page: page_heating
              # Not already in selection mode
              - lambda: return id(selecting_heating_preset) == "" && id(changing_heating_temp) <= 0;
              # Not already in this preset
              - not: 
                  text_sensor.state:
                    id: indoor_temp_preset
                    state: !lambda return preset;
          then:
            # Enter preset selection mode
            - globals.set:
                id: selecting_heating_preset
                value: !lambda return preset;
            - component.update: my_display
            # Light up forward/back LEDs to indicate confirm/cancel
            - light.turn_on: my_light_forward
            - light.turn_on: my_light_back
  
  # Accept button (forward): Confirm selection or navigate to next page
  - id: accept_button_click
    then:
      # Normal navigation mode
      - if:
          condition:
              - lambda: return id(selecting_heating_preset) == "" && id(changing_heating_temp) <= 0;
          then:
            - display.page.show_next: my_display
            - component.update: my_display
      
      # Confirm preset change
      - if:
          condition: 
            - lambda: return id(selecting_heating_preset) != "";
          then:
            - script.execute:
                id: set_indoor_preset
                preset: !lambda return id(selecting_heating_preset);
            - globals.set:
                id: selecting_heating_preset
                value: '""'
            - component.update: my_display
            - light.turn_off: my_light_forward
            - light.turn_off: my_light_back
      
      # Confirm temperature adjustment
      - if:
          condition:
            - lambda: return id(changing_heating_temp) > 0;
          then:
            - script.execute:
                id: change_preset_amount
                preset: "boost"
                set_to: !lambda return id(changing_heating_temp);
            - globals.set:
                id: changing_heating_temp
                value: '0'
            - component.update: my_display
            - light.turn_off: my_light_forward
            - light.turn_off: my_light_back
            - light.turn_off: my_light_a
            - light.turn_off: my_light_d
  
  # Cancel button (back): Cancel selection or navigate to previous page
  - id: cancel_button_click
    then:
      # Normal navigation mode
      - if:
          condition:
              - lambda: return id(selecting_heating_preset) == "" && id(changing_heating_temp) <= 0;
          then:
            - display.page.show_previous: my_display
            - component.update: my_display
      
      # Cancel preset change
      - if:
          condition:
            - lambda: return id(selecting_heating_preset) != "";
          then:
            - globals.set:
                id: selecting_heating_preset
                value: '""'
            - component.update: my_display
            - light.turn_off: my_light_forward
            - light.turn_off: my_light_back
      
      # Cancel temperature adjustment
      - if:
          condition:
            - lambda: return id(changing_heating_temp) > 0;
          then:
            - globals.set:
                id: changing_heating_temp
                value: '0'
            - component.update: my_display
            - light.turn_off: my_light_forward
            - light.turn_off: my_light_back
            - light.turn_off: my_light_a
            - light.turn_off: my_light_d
  
  # Execute preset mode change via Home Assistant
  - id: set_indoor_preset
    parameters:
      preset: string
    then:
      - homeassistant.action:
          action: climate.set_preset_mode
          data:
            entity_id: climate.${heater}
          data_template:
            preset_mode: !lambda return preset;
  
  # Adjust preset temperature setting (for boost mode)
  - id: change_preset_amount
    parameters:
      preset: string
      set_to: float
    then:
      - if:
          condition:
            - lambda: return preset == "boost";
          then: 
            - number.set:
                id: indoor_temp_preset_boost
                value: !lambda return set_to;
  
  # Long-press on Button D: Enter temperature adjustment mode
  - id: touch_d_long_click
    then:
      - if:
          condition:
              - lambda: return id(selecting_heating_preset) == "" && id(changing_heating_temp) <= 0;
          then:
              - globals.set:
                  id: changing_heating_temp
                  # Round current boost temp to nearest 0.5°C
                  value: !lambda return round(id(indoor_temp_preset_boost).state * 2.0)/2.0;
              # Light up all adjustment LEDs
              - light.turn_on: my_light_forward
              - light.turn_on: my_light_back
              - light.turn_on: my_light_a
              - light.turn_on: my_light_d

# https://esphome.io/components/text_sensor/homeassistant/
text_sensor:
  # Get temperature unit from weather entity
  - platform: homeassistant
    id: outside_temperature_unit
    entity_id: weather.forecast_home
    attribute: temperature_unit
    internal: true
    on_value: 
      then:
        - script.execute: update_outside_temp
  
  # Get weather forecast description
  - platform: homeassistant
    id: forecast_desc
    entity_id: weather.forecast_home
    internal: true
    on_value: 
      then:
        script.execute: update_weather

  # Get heating action status (heating, idle, off)
  - platform: homeassistant
    id: indoor_hvac_action
    attribute: hvac_action
    entity_id: climate.${heater}
    internal: true
  
  # Get current preset mode (frost, eco, comfort, boost)
  - platform: homeassistant
    id: indoor_temp_preset
    attribute: preset_mode
    entity_id: climate.${heater}
    internal: true

# https://esphome.io/components/number/template/
number:
  # Display timeout setting (exposed to Home Assistant)
  - platform: template
    name: Screen timeout
    optimistic: true
    id: display_timeout
    unit_of_measurement: "s"
    initial_value: 45
    restore_value: true
    min_value: 10
    max_value: 180
    step: 5
    mode: box
  
  # LED brightness control for touch buttons
  - platform: template
    name: LED Brightness
    optimistic: true
    id: led_brightness
    unit_of_measurement: "%"
    initial_value: 40
    restore_value: true
    min_value: 0
    max_value: 100
    step: 5
    icon: mdi:brightness-percent
    on_value:
      then:
        # Update all CAP1166 LED brightness
        - lambda: |-
            id(touch_phat).update_all_brightness(0, id(led_brightness).state);
  
  # EV battery level from Home Assistant
  - platform: homeassistant
    id: battery_level
    entity_id: sensor.${car_battery_level}
    internal: true
  
  # Boost preset temperature setting (Versatile Thermostat)
  - platform: homeassistant
    id: indoor_temp_preset_boost
    entity_id: number.${heater}_preset_boost_temp
    internal: true

# https://esphome.io/components/output/gpio/
output:
  - platform: gpio
    pin: ${builtin_led_pin}
    id: builtin_led

# https://esphome.io/components/sensor/homeassistant/
sensor:
  # Outside temperature from weather entity
  - platform: homeassistant
    id: outside_temperature
    attribute: temperature
    entity_id: weather.forecast_home
    internal: true
    on_value: 
      then:
        script.execute: update_outside_temp

  # Indoor temperature sensor
  - platform: homeassistant
    id: indoor_temperature
    entity_id: sensor.${indoor_temp}
    internal: true
  
  # Indoor humidity sensor
  - platform: homeassistant
    id: indoor_humidity
    entity_id: sensor.${indoor_humid}
    internal: true
  
  # Thermostat target temperature setting
  - platform: homeassistant
    id: indoor_temp_setting
    attribute: temperature
    entity_id: climate.${heater}
    internal: true

# https://esphome.io/components/time/sntp/
time:
  - platform: sntp
    id: my_time
    timezone: Europe/Dublin

# https://esphome.io/components/spi/
spi:
  clk_pin: ${clk_pin}
  mosi_pin: ${mosi_pin}

# https://esphome.io/components/i2c/
i2c:
  id: i2c_bus
  sda: ${sda_pin}
  scl: ${scl_pin}

# CAP1166 Capacitive Touch Controller (Touch pHAT)
# Custom external component
cap1166:
  - id: touch_phat
    address: 0x2C
    touch_threshold: 0x40
    allow_multiple_touches: false
    brightness_configs:
      - led_behavior: DIRECT
        max_brightness: 40%
      - led_behavior: PULSE1
        max_brightness: 40%
      - led_behavior: PULSE2
        max_brightness: 40%
      - led_behavior: BREATHE
        max_brightness: 40%

# https://esphome.io/components/binary_sensor/
binary_sensor:
  # Built-in boot button for testing
  - platform: gpio
    pin: 
      number: ${boot_btn_pin}
      inverted: true
    id: boot_btn
    on_press:
      then:
        - output.turn_on: builtin_led
    on_release:
      then:
        - output.turn_off: builtin_led
  
  # Touch button: BACK (cancel/previous)
  - platform: cap1166
    id: touch_back
    channel: 0
    on_click:
      min_length: 50ms
      max_length: 350ms
      then:
        - script.execute:
            id: cancel_button_click
  
  # Touch button: A (frost preset / decrease temp)
  - platform: cap1166
    id: touch_A
    channel: 1
    on_click:
      - min_length: 50ms
        max_length: 350ms
        then:
          - script.execute:
              id: a_button_click
  
  # Touch button: B (eco preset)
  - platform: cap1166
    id: touch_B
    channel: 2
    on_click:
      min_length: 50ms
      max_length: 350ms
      then:
        - script.execute:
            id: change_preset
            preset: "eco"
  
  # Touch button: C (comfort preset)
  - platform: cap1166
    id: touch_C
    channel: 3
    on_click:
      min_length: 50ms
      max_length: 350ms
      then:
        - script.execute:
            id: change_preset
            preset: "comfort"
  
  # Touch button: D (boost preset / increase temp / long-press for temp adjust)
  - platform: cap1166
    id: touch_D
    channel: 4
    on_click:
      # Short press: boost or increase
      - min_length: 50ms
        max_length: 350ms
        then:
          - script.execute:
              id: d_button_click
      # Long press: enter temp adjustment mode
      - min_length: 350ms
        max_length: 2000ms
        then:
          - script.execute:
              id: touch_d_long_click
  
  # Touch button: FORWARD (accept/next)
  - platform: cap1166
    id: touch_forward
    channel: 5
    on_click:
      min_length: 50ms
      max_length: 350ms
      then:
        - script.execute:
            id: accept_button_click

# https://esphome.io/components/light/
light:
  # Built-in LED
  - platform: binary
    name: "Built in LED"
    output: builtin_led
  
  # Touch pHAT LEDs (channels are inverted on hardware)
  - id: my_light_forward
    platform: cap1166
    internal: true
    channel: 0
    led_behavior: PULSE2
  - id: my_light_d
    platform: cap1166
    name: "Light D"
    channel: 1
    led_behavior: DIRECT
  - id: my_light_c
    name: "Light C"
    platform: cap1166
    channel: 2
    led_behavior: DIRECT
  - id: my_light_b
    platform: cap1166
    name: "Light B"
    channel: 3
    led_behavior: DIRECT
  - id: my_light_a
    platform: cap1166
    name: "Light A"
    channel: 4
    led_behavior: DIRECT
  - id: my_light_back
    platform: cap1166
    internal: true
    channel: 5
    led_behavior: PULSE2

# https://esphome.io/components/font/
font:
  # Monochrome display (1 bit per pixel, no antialiasing)
  - id: value_med
    file:
      type: gfonts
      family: Montserrat
    size: 14
    bpp: 1
  - id: value_small
    file:
      type: gfonts
      family: Montserrat
    size: 10
    bpp: 1
  - id: value_large
    file:
      type: gfonts
      family: Montserrat
      weight: bold
    size: 20
    bpp: 1
  - id: mdi_small
    file: assets/materialdesignicons-webfont.ttf
    size: 24
    bpp: 1
    glyphs: [
      "\U000F1A71", # snowflake-thermometer (frost)
      "\U000F032A", # leaf (eco)
      "\U000F04B9", # sofa (comfort)
      "\U000F14DE", # rocket-launch (boost)
      "\U000F0C52", # checkbox-outline (confirm)
      "\U000F0158", # close-box-outline (cancel)
      "\U000F0704", # plus-box-outline (increase)
      "\U000F06F2", # minus-box-outline (decrease)
    ]
  - id: mdi_med
    file: assets/materialdesignicons-webfont.ttf
    size: 32
    bpp: 1
    glyphs: [
      "\U000F1807", # fire-circle (heating active)
      "\U000F0E1B", # car-back (EV)
    ]
  - id: mdi_large
    file: assets/materialdesignicons-webfont.ttf
    size: 48
    bpp: 1
    glyphs: [
      "\U000F0594", # clear-night
      "\U000F0590", # cloudy
      "\U000F0F2F", # exceptional
      "\U000F0591", # fog
      "\U000F0592", # hail
      "\U000F0593", # lightning
      "\U000F067E", # lightning-rainy
      "\U000F0595", # partlycloudy
      "\U000F0596", # pouring
      "\U000F0597", # rainy
      "\U000F0598", # snowy
      "\U000F067F", # snowy-rainy
      "\U000F0599", # sunny
      "\U000F059D", # windy
      "\U000F059E", # windy-variant
      "\U000F14E4", # sunny-off
      
      # Preset mode icons (large for confirmation screen)
      "\U000F1A71", # snowflake-thermometer (frost)
      "\U000F032A", # leaf (eco)
      "\U000F04B9", # sofa (comfort)
      "\U000F14DE", # rocket-launch (boost)
    ]

# https://esphome.io/components/image/
image:
  - id: boot_logo
    type: BINARY
    file: mdi:home-automation
    resize: 80x80

# https://esphome.io/components/display/ssd1306_spi/
display:
  - platform: ssd1306_spi
    id: my_display
    model: "SH1107 128x128"
    cs_pin: ${disp_cs_pin}
    dc_pin: ${disp_dc_pin}
    rotation: 180
    update_interval: 1s
    pages: 
      # Page 1: Information Display (weather, time, EV battery)
      - id: page_info
        lambda: |-
          // Show boot screen while starting up
          if (id(my_boot_in_progress) > 0) {
            if(id(my_boot_in_progress)>1)
            {
                it.printf(it.get_width()/2, 114, id(value_large), COLOR_ON, TextAlign::CENTER, "Starting ...");
            }else {
                it.printf(it.get_width()/2, 114, id(value_large), COLOR_ON, TextAlign::CENTER, "Connecting");
            }
            it.image(it.get_width()/2, 50, id(boot_logo), ImageAlign::CENTER);
            return;
          }

          // Display time and date
          if (id(my_time).now().is_valid()) {
            it.strftime(it.get_width()/2, 14, id(value_large), COLOR_ON, TextAlign::CENTER, "%I:%M %p", id(my_time).now());
            it.strftime(it.get_width()/2, 114, id(value_med), COLOR_ON, TextAlign::CENTER, "%a, %e %b", id(my_time).now());
          }

          // Weather icon and info
          it.printf(4, 27, id(mdi_large), COLOR_ON, id(my_forecast_icon).c_str());
          it.printf(90, 27, id(value_small), COLOR_ON, TextAlign::TOP_CENTER, id(my_forecast_desc).c_str());
          it.printf(4, 76, id(value_large), COLOR_ON, id(my_outside_temp).c_str());

          // EV battery level
          it.printf(96, 42, id(mdi_med), COLOR_ON, TextAlign::TOP_CENTER, "\U000F0E1B");
          it.printf(96, 76, id(value_med), COLOR_ON, TextAlign::TOP_CENTER, "%.0f%%", id(battery_level).state);
      
      # Page 2: Heating Control (temperature, humidity, preset modes)
      - id: page_heating
        lambda: |-
          // Show boot screen while starting up
          if (id(my_boot_in_progress) > 0) {
            it.printf(it.get_width()/2, 114, id(value_large), COLOR_ON, TextAlign::CENTER, "Connecting");
            it.image(it.get_width()/2, 50, id(boot_logo), ImageAlign::CENTER);
            return;
          }

          // Preset mode definitions and icons
          const std::string presets[] = {
            "frost", "eco", "comfort", "boost"
          };

          const std::string icons[] = {
            "\U000F1A71", "\U000F032A", "\U000F04B9", "\U000F14DE"
          };
            
          // MAIN VIEW: Normal heating control display
          if(id(selecting_heating_preset) == "" && id(changing_heating_temp) <= 0){
            // Time display in top-right
            if (id(my_time).now().is_valid()) {
              it.strftime(it.get_width() - 2, 2, id(value_med), COLOR_ON, TextAlign::TOP_RIGHT, "%I:%M %p", id(my_time).now());
            }
            
            // Heating status indicator (top-left)
            auto heating_is_on = id(indoor_hvac_action).state == "heating";
            auto current_temp_preset = id(indoor_temp_preset).state;
            if(heating_is_on){
              it.printf(4, 12, id(mdi_med), COLOR_ON, "\U000F1807");
            }
            
            // Indoor temperature (large, left side)
            it.printf(4, 52, id(value_large), COLOR_ON, "%.1f%s", id(indoor_temperature).state, id(outside_temperature_unit).state.c_str());
            // Indoor humidity (below temperature)
            it.printf(4, 76, id(value_med), COLOR_ON, "%.0f%%", id(indoor_humidity).state);

            // Target temperature (right side)
            it.printf(it.get_width() - 4, 52, id(value_med), COLOR_ON, TextAlign::TOP_RIGHT, "%.1f%s", id(indoor_temp_setting).state, id(outside_temperature_unit).state.c_str());
            // Current preset mode (below target)
            it.printf(it.get_width() - 4, 76, id(value_med), COLOR_ON, TextAlign::TOP_RIGHT, current_temp_preset.c_str());

            // Show preset mode icons at bottom
            const int icon_size = 24;
            auto y = it.get_height() - icon_size;

            for(auto i = 0; i<4; i++){
              auto is_selected = current_temp_preset == presets[i];
              auto x = 2 + icon_size*i + 9*i;
              auto invert_icon = false;

              // Highlight selected preset
              if(is_selected){
                if(heating_is_on){
                  // Filled box if heating is active
                  invert_icon = true;
                  it.filled_rectangle(x, y-1, icon_size+1, icon_size+1);
                }else{
                  // Outline if not heating
                  it.rectangle(x, y-1, icon_size+1, icon_size+1);
                }
              }
              it.printf(x, y, id(mdi_small), invert_icon ? COLOR_OFF : COLOR_ON, icons[i].c_str());
            }
          } 
          // CONFIRMATION VIEW: Changing preset mode
          else if(id(selecting_heating_preset) != ""){
            bool is_selected = false;
            for(auto i = 0; i<4; i++){
              if(id(selecting_heating_preset) != presets[i]){
                continue;
              }
              is_selected = true;
              
              // Show large icon for selected preset
              it.printf(it.get_width()/2, it.get_height()/2, id(mdi_large), COLOR_ON, TextAlign::BOTTOM_CENTER, icons[i].c_str());
              
              // Confirmation text
              it.printf(it.get_width()/2, it.get_height()-48, id(value_med), COLOR_ON, TextAlign::TOP_CENTER, "Set the mode to:");
              it.printf(it.get_width()/2, it.get_height()-24, id(value_med), COLOR_ON, TextAlign::TOP_CENTER, "%s ?", id(selecting_heating_preset).c_str());
              break;
            }

            if(is_selected){
              // Cancel icon (left)
              it.printf(0, it.get_height() - 28, id(mdi_small), COLOR_ON, TextAlign::TOP_LEFT, "\U000F0158");
              // Confirm icon (right)
              it.printf(it.get_width(), it.get_height() - 28, id(mdi_small), COLOR_ON, TextAlign::TOP_RIGHT, "\U000F0C52");
            }

            // Clear selection if invalid
            if(!is_selected){
              id(selecting_heating_preset) = "";
            }
          } 
          // ADJUSTMENT VIEW: Changing boost temperature
          else if(id(changing_heating_temp) > 0){
            // Show boost icon
            it.printf(it.get_width()/2, it.get_height()/2, id(mdi_large), COLOR_ON, TextAlign::BOTTOM_CENTER, "\U000F14DE");
            // Show temperature value being adjusted
            it.printf(it.get_width()/2, it.get_height()-48, id(value_large), COLOR_ON, TextAlign::TOP_CENTER, "%.1f", id(changing_heating_temp));

            // Cancel icon (left)
            it.printf(0, it.get_height() - 28, id(mdi_small), COLOR_ON, TextAlign::TOP_LEFT, "\U000F0158");
            // Confirm icon (right)
            it.printf(it.get_width(), it.get_height() - 28, id(mdi_small), COLOR_ON, TextAlign::TOP_RIGHT, "\U000F0C52");

            // Decrease icon (bottom-left)
            it.printf(4, it.get_height() - 2, id(mdi_small), COLOR_ON, TextAlign::TOP_LEFT, "\U000F06F2");
            // Increase icon (bottom-right)
            it.printf(it.get_width() - 4, it.get_height() - 2, id(mdi_small), COLOR_ON, TextAlign::TOP_RIGHT, "\U000F0704");
          }
```

## Configuration Breakdown

### Substitutions

The configuration uses substitutions to make it easy to adapt to your Home Assistant setup. **Update these with your own entity IDs:**

```yaml
substitutions:
  heater: bedroom_heater                # Climate entity (without climate. prefix)
  car_battery_level: ev_battery_level   # EV battery sensor (without sensor. prefix)
  indoor_temp: bedroom_temperature      # Indoor temp sensor (without sensor. prefix)
  indoor_humid: bedroom_humidity        # Indoor humidity sensor (without sensor. prefix)
```

### Boot Progress Tracking

The `my_boot_in_progress` global variable tracks the device startup stages:
- **3**: ESP32 starting up
- **2**: WiFi connecting
- **1**: Home Assistant API connecting
- **0**: Fully connected and ready

This provides clear feedback during startup on the display.

### Climate Control Integration

This configuration is designed to work with the **Versatile Thermostat** custom integration for Home Assistant. Versatile Thermostat provides:
- Multiple preset modes (frost, eco, comfort, boost)
- Individual temperature settings per preset
- Advanced heating strategies
- Comprehensive automation support

**Important:** If you're using a different climate integration, you may need to adjust:
- Preset mode names in scripts
- The `indoor_temp_preset_boost` number entity reference
- Preset mode cycling logic

### Touch Button Functions

#### Information Page (page_info):
- **FORWARD**: Navigate to heating page
- **BACK**: (No function)

#### Heating Page (page_heating):

**Normal Mode:**
- **FORWARD**: Navigate to info page
- **BACK**: Navigate to info page (same as forward, only 2 pages)
- **Button A**: Select "frost" preset
- **Button B**: Select "eco" preset
- **Button C**: Select "comfort" preset
- **Button D (short press)**: Select "boost" preset
- **Button D (long press)**: Enter temperature adjustment mode for boost

**Preset Confirmation Mode:**
- **FORWARD**: Confirm preset change
- **BACK**: Cancel preset change
- **Buttons A-D**: No function

**Temperature Adjustment Mode:**
- **FORWARD**: Confirm new temperature
- **BACK**: Cancel temperature change
- **Button A**: Decrease by 0.5°C (min 15°C)
- **Button D**: Increase by 0.5°C (max 28°C)
- **Buttons B, C**: No function

### LED Feedback

The Touch pHAT LEDs provide visual feedback:
- **Normal mode**: LEDs off
- **Preset confirmation**: Forward and Back LEDs pulsing
- **Temperature adjustment**: Forward, Back, A, and D LEDs lit

LED brightness can be adjusted via the "LED Brightness" number entity (0-100%).

### Display Pages

#### Page 1: Information Display
- Current time (12-hour format with AM/PM)
- Current date (day, date, month)
- Weather icon and description
- Outside temperature
- EV battery level with car icon

#### Page 2: Heating Control
- Current time (top-right)
- Heating active indicator (top-left, only when heating)
- Indoor temperature (large, left side)
- Indoor humidity (below temperature)
- Target temperature setting (right side)
- Current preset mode name (below target)
- Preset mode icons at bottom (highlighted when active)

### Weather Integration

This project assumes you have a working weather integration in Home Assistant, typically configured as `weather.forecast_home`. The configuration retrieves:
- Current temperature (from `temperature` attribute)
- Temperature unit (C or F)
- Weather condition (for icon mapping)

## Installation Steps

### 1. Prepare Hardware

1. Wire all components according to the wiring table above
2. Double-check all connections before powering on
3. Verify Touch pHAT has 5V power supply
4. Ensure all I2C and SPI connections are correct

### 2. Prepare Files

1. **Download Material Design Icons font:**
   - Direct link: https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/7.4.47/fonts/materialdesignicons-webfont.ttf
   - Save as `assets/materialdesignicons-webfont.ttf` in your ESPHome directory

2. **Create `weather_icon_map.h`** header file (placeholder provided in configuration section)
   - TODO: Full implementation will be linked here

3. **Obtain CAP1166 external component**:
   - Place in `external_components/esphome/components/cap1166/`
   - TODO: Link to component repository will be provided

4. **Create `secrets.yaml`** with WiFi credentials

### 3. Update Configuration

1. Modify the `substitutions` section with your Home Assistant entity IDs
2. Generate new API encryption key:
   ```bash
   esphome config bedroom2-controller.yaml
   ```
3. Set secure OTA and fallback hotspot passwords
4. Adjust timezone in `time` component if not in Europe/Dublin

### 4. Validate and Flash

```powershell
# Validate configuration
esphome config bedroom2-controller.yaml

# Compile and upload via USB (first time)
esphome run bedroom2-controller.yaml
```

Select the COM port when prompted. After initial flash, use OTA updates.

### 5. Add to Home Assistant

The device should auto-discover:

1. Go to **Settings → Devices & Services**
2. Find "bedroom2-controller" in discovered devices
3. Click **Configure** and enter API encryption key

### 6. Verify Operation

Check that:
- Display shows boot screen then connects
- Time and weather information appear on info page
- Indoor temperature and humidity display on heating page
- Touch buttons respond (LEDs light up when pressed)
- Preset icons show current heating mode
- Page navigation works (forward/back buttons)

## Troubleshooting

### Display Not Working

**Problem:** Screen stays blank or shows no output

**Solutions:**
1. Verify SPI wiring (CLK, MOSI, CS, DC pins)
2. Check display model is "SH1107 128x128"
3. Verify CS and DC pin assignments match your wiring
4. Try different `rotation` values (0, 90, 180, 270)
5. Check display power supply (3.3V)
6. Test with simpler display code first

### Touch Buttons Not Responding

**Problem:** Touch pHAT doesn't register touches

**Solutions:**
1. Verify I2C wiring (SDA: GPIO19, SCL: GPIO20)
2. Check Touch pHAT has 5V power
3. Verify I2C address is 0x2C (check with I2C scanner)
4. Adjust `touch_threshold` value (try 0x30-0x50 range)
5. Check CAP1166 external component is properly installed
6. Look for I2C errors in ESPHome logs

### LEDs Not Lighting

**Problem:** Touch pHAT LEDs don't respond

**Solutions:**
1. Verify I2C communication is working (touch should work first)
2. Check LED brightness setting (increase to 100% for testing)
3. Note that channels are inverted on Touch pHAT hardware
4. Test individual lights from Home Assistant
5. Verify `led_behavior` settings are correct

### Weather Not Updating

**Problem:** Weather information shows "Updating..." or old data

**Solutions:**
1. Verify `weather.forecast_home` entity exists in Home Assistant
2. Check Home Assistant API connection is active
3. Ensure `weather_icon_map.h` file exists and is correctly formatted
4. Check ESPHome logs for script execution errors
5. Test weather entity in Home Assistant Developer Tools

### Heating Control Not Working

**Problem:** Preset changes don't affect thermostat

**Solutions:**
1. Verify climate entity ID is correct in substitutions
2. Check climate entity supports `preset_mode` attribute
3. Ensure preset modes match your climate integration
4. Test `climate.set_preset_mode` manually in Home Assistant
5. Check for Home Assistant action errors in ESPHome logs
6. Verify Versatile Thermostat integration is installed and configured

### Boot Screen Stays Forever

**Problem:** Display stuck on "Connecting" screen

**Solutions:**
1. Check WiFi credentials in `secrets.yaml`
2. Verify Home Assistant API is reachable
3. Check API encryption key matches Home Assistant
4. Look for connection errors in ESPHome logs
5. Try restarting Home Assistant
6. Verify network connectivity

### Temperature Adjustment Not Working

**Problem:** Long-press on Button D doesn't enter adjustment mode

**Solutions:**
1. Verify you're on the heating page (page 2)
2. Check `indoor_temp_preset_boost` number entity exists
3. Ensure you're not already in selection mode
4. Increase long-press duration threshold if needed
5. Check lambda logic in `touch_d_long_click` script

### I2C Communication Errors

**Problem:** Logs show I2C errors or device not found

**Solutions:**
1. Check wiring: SDA and SCL not swapped
2. Verify pull-up resistors on I2C lines (Touch pHAT has built-in)
3. Try reducing I2C bus speed (add `frequency: 100kHz` to i2c config)
4. Check for loose connections
5. Use I2C scanner to detect devices
6. Ensure only one device uses 0x2C address

## Customization Ideas

### Add More Entity Monitoring

Display additional sensors on the information page:

```yaml
# In sensor section, add:
- platform: homeassistant
  id: power_usage
  entity_id: sensor.home_power
  on_value:
    then:
      - component.update: my_display

# In display page_info lambda, add:
it.printf(64, 90, id(value_med), COLOR_ON, TextAlign::CENTER, 
          "%.1fW", id(power_usage).state);
```

### Customize Preset Modes

Modify preset names and add/remove modes:

```yaml
# In page_heating lambda, change presets array:
const std::string presets[] = {
  "away", "eco", "comfort", "boost"  // Changed "frost" to "away"
};

# Update icon mapping:
const std::string icons[] = {
  "\U000F0E1B", "\U000F032A", "\U000F04B9", "\U000F14DE"  // Different icon for "away"
};

# Update button assignments in binary_sensor section
```

### Add Third Display Page

Create a settings or additional info page:

```yaml
display:
  - platform: ssd1306_spi
    pages:
      - id: page_info
        # ... existing ...
      - id: page_heating
        # ... existing ...
      - id: page_settings
        lambda: |-
          it.printf(64, 10, id(value_med), COLOR_ON, TextAlign::CENTER, "Settings");
          it.printf(64, 40, id(value_small), COLOR_ON, TextAlign::CENTER, 
                    "Screen timeout: %.0fs", id(display_timeout).state);
          it.printf(64, 60, id(value_small), COLOR_ON, TextAlign::CENTER, 
                    "LED brightness: %.0f%%", id(led_brightness).state);
```

### Change Display Update Rate

For smoother animations or reduced power consumption:

```yaml
display:
  - platform: ssd1306_spi
    update_interval: 500ms  # Update twice per second (default is 1s)
```

### Adjust Touch Sensitivity

If touches are too sensitive or not sensitive enough:

```yaml
cap1166:
  - id: touch_phat
    touch_threshold: 0x30  # Lower = more sensitive (try 0x20-0x50)
```

### Add Haptic Feedback

If you add a buzzer or vibration motor:

```yaml
# Add output for buzzer
output:
  - platform: gpio
    pin: GPIOX  # Your buzzer pin
    id: buzzer

# In each button on_click, add:
- output.turn_on: buzzer
- delay: 50ms
- output.turn_off: buzzer
```

### Customize LED Behaviors

Change LED animation patterns:

```yaml
cap1166:
  brightness_configs:
    - led_behavior: BREATHE  # Options: DIRECT, PULSE1, PULSE2, BREATHE
      max_brightness: 60%
    # ... etc
```

### Add NeoPixel Ambient Lighting

When NeoPixel is added:

```yaml
# Add light component
light:
  - platform: neopixel
    pin: GPIOX
    num_leds: 8
    id: ambient_light
    name: "Ambient Light"
    
# Add effects
effects:
  - pulse:
  - random:

# In scripts, control the LED:
- light.turn_on:
    id: ambient_light
    brightness: 50%
    red: 100%
    green: 50%
    blue: 0%
```

## Future Enhancements

This project documentation will be updated with:

1. **Complete `weather_icon_map.h` Implementation** - Link to full weather icon mapping code
2. **CAP1166 External Component** - Link to component repository and documentation
3. **NeoPixel Integration** - Add RGB LED for ambient lighting and notifications
4. **3D Enclosure Design** - STL files and assembly instructions
5. **Wiring Diagram** - Visual diagram showing all connections
6. **Photos and Videos** - Real-world implementation showcase
7. **Advanced UI Animations** - Smooth transitions and visual effects
8. **Multi-zone Climate Control** - Extend to control multiple rooms

## Known Limitations

- Only two display pages (can be extended)
- Monochrome display (no color)
- Requires external CAP1166 component (not yet in ESPHome core)
- Touch pHAT designed for Raspberry Pi (requires careful wiring)
- Depends on Home Assistant for all entity data
- No on-device historical data or graphing
- RGB LED (NeoPixel) not yet implemented
- 3D enclosure design in progress

## Learn More

### Device Documentation
- [DFRobot Beetle ESP32-C6](/devices/beetle-esp32-c6)
- [SH1107 OLED Display](/devices/sh1107-spi-oled)
- [Pimoroni Touch pHAT](/devices/touch-phat)
- [Adafruit NeoPixel](/devices/adafruit-neopixel)

### ESPHome Component Reference
- [SSD1306 Display Component](https://esphome.io/components/display/ssd1306)
- [I2C Bus](https://esphome.io/components/i2c)
- [SPI Bus](https://esphome.io/components/spi)
- [Binary Sensor](https://esphome.io/components/binary_sensor/)
- [Home Assistant Sensor](https://esphome.io/components/sensor/homeassistant)
- [Scripts](https://esphome.io/guides/automations#script-component)
- [Globals](https://esphome.io/guides/automations#global-variables)

### Related Projects
- [Info Panel with ESP32 2.8" Display](/projects/info-panel-28) - Similar project with LVGL touchscreen

## Contributing

Found an issue or have an improvement? Please contribute back to help others!

This project is actively in development. Check back for updates including:
- NeoPixel RGB LED integration
- 3D enclosure files
- Complete weather icon mapping
- Additional photos and wiring diagrams
