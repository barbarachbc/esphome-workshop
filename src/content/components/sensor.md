---
title: "Sensor Component"
description: "Base component for all sensor types that report numerical values"
category: "sensor"
esphomeComponent: "sensor"
documentation: "https://esphome.io/components/sensor/index.html"
requiresHardware: true
relatedDevices: ["bme280", "esp32-devkit-v1"]
tags: ["measurement", "data", "monitoring"]
---

## Overview

The `sensor` component in ESPHome is the base for all components that report numerical measurements. Sensors provide read-only data like temperature, humidity, power consumption, distance, etc.

Sensors differ from binary sensors (on/off states) in that they report continuous numerical values with units of measurement.

## Basic Configuration

Every sensor has a basic structure:

```yaml
sensor:
  - platform: [sensor_type]
    name: "Friendly Name"
    id: sensor_id
    unit_of_measurement: "°C"
    accuracy_decimals: 2
    device_class: "temperature"
    state_class: "measurement"
    update_interval: 60s
```

## Common Configuration Options

### name
The friendly name shown in Home Assistant and logs.

```yaml
sensor:
  - platform: bme280
    temperature:
      name: "Living Room Temperature"
```

### id
Internal identifier for referencing in automations and templates.

```yaml
sensor:
  - platform: bme280
    temperature:
      id: living_temp
      name: "Temperature"
```

### unit_of_measurement
The unit displayed with the value (°C, %, W, lux, etc.). This is automatically set by most platforms but can be overridden.

### accuracy_decimals
Number of decimal places to round to (default depends on sensor).

```yaml
sensor:
  - platform: bme280
    temperature:
      name: "Temperature"
      accuracy_decimals: 1  # Shows 23.5°C instead of 23.52°C
```

### device_class
Helps Home Assistant display the correct icon and UI. Common values:
- `temperature`
- `humidity`
- `pressure`
- `illuminance`
- `power`
- `energy`
- `voltage`
- `current`

### state_class
For Home Assistant statistics and graphs:
- `measurement` - Instantaneous value
- `total_increasing` - Cumulative value that only increases
- `total` - Cumulative value that can increase or decrease

### update_interval
How often to read the sensor (default varies by platform).

```yaml
sensor:
  - platform: bme280
    temperature:
      name: "Temperature"
      update_interval: 30s  # Update every 30 seconds
```

## Filters

Filters process sensor values before they're published. They're extremely powerful for data manipulation.

### Basic Filters

**Offset** - Add or subtract a fixed value:
```yaml
sensor:
  - platform: bme280
    temperature:
      name: "Temperature"
      filters:
        - offset: -2.5  # Calibration adjustment
```

**Multiply** - Scale the value:
```yaml
sensor:
  - platform: adc
    pin: GPIO34
    name: "Battery Voltage"
    filters:
      - multiply: 2.0  # Voltage divider compensation
```

**Sliding Window Moving Average** - Smooth noisy data:
```yaml
sensor:
  - platform: adc
    pin: GPIO34
    name: "Analog Reading"
    filters:
      - sliding_window_moving_average:
          window_size: 10
          send_every: 10
```

**Exponential Moving Average** - Weighted smoothing:
```yaml
filters:
  - exponential_moving_average:
      alpha: 0.1
      send_every: 1
```

**Delta** - Only publish if change exceeds threshold:
```yaml
sensor:
  - platform: bme280
    temperature:
      name: "Temperature"
      filters:
        - delta: 0.5  # Only send if changed by 0.5°C or more
```

**Throttle** - Limit update frequency:
```yaml
filters:
  - throttle: 60s  # Maximum once per minute
```

**Heartbeat** - Ensure regular updates:
```yaml
filters:
  - heartbeat: 300s  # Send value every 5 minutes even if unchanged
```

**Debounce** - Wait for value to stabilize:
```yaml
filters:
  - debounce: 1s  # Wait 1 second after change before sending
```

### Advanced Filters

**Lambda** - Custom processing with C++ code:
```yaml
sensor:
  - platform: bme280
    pressure:
      name: "Pressure"
      filters:
        # Convert Pa to hPa
        - lambda: return x / 100.0;
```

**Calibrate Linear** - Map input to output range:
```yaml
sensor:
  - platform: adc
    pin: GPIO34
    name: "Distance"
    filters:
      - calibrate_linear:
          - 0.0 -> 0.0
          - 1.0 -> 100.0
          - 3.3 -> 500.0
```

**Clamp** - Limit values to range:
```yaml
filters:
  - clamp:
      min_value: 0
      max_value: 100
      ignore_out_of_range: true
```

### Chaining Filters

Filters are applied in order:

```yaml
sensor:
  - platform: adc
    pin: GPIO34
    name: "Processed Sensor"
    filters:
      - multiply: 3.3              # Convert ADC to voltage
      - calibrate_linear:           # Map to real-world value
          - 0.0 -> 0.0
          - 3.3 -> 100.0
      - sliding_window_moving_average:  # Smooth
          window_size: 5
      - delta: 1.0                  # Only if changed significantly
      - heartbeat: 60s              # But at least every minute
```

## On Value Triggers

Execute automations when sensor values change:

### on_value
Triggered every time a new value is received:

```yaml
sensor:
  - platform: bme280
    temperature:
      name: "Temperature"
      id: temp_sensor
      on_value:
        then:
          - if:
              condition:
                lambda: 'return x > 25.0;'
              then:
                - switch.turn_on: fan
```

### on_value_range
Triggered when value enters or exits a range:

```yaml
sensor:
  - platform: bme280
    temperature:
      name: "Temperature"
      on_value_range:
        - above: 30.0
          then:
            - logger.log: "Temperature high!"
            - switch.turn_on: fan
        - below: 20.0
          then:
            - logger.log: "Temperature low!"
            - switch.turn_off: fan
```

### on_raw_value
Triggered before filters are applied:

```yaml
sensor:
  - platform: adc
    pin: GPIO34
    name: "ADC"
    on_raw_value:
      then:
        - logger.log:
            format: "Raw ADC: %.3f"
            args: ['x']
```

## Template Sensors

Create virtual sensors calculated from other values:

### Basic Template

```yaml
sensor:
  - platform: template
    name: "Feels Like Temperature"
    lambda: |-
      float temp = id(temperature).state;
      float humidity = id(humidity).state;
      // Simplified feels-like calculation
      return temp + (humidity - 50) * 0.1;
    unit_of_measurement: "°C"
    device_class: "temperature"
    update_interval: 60s
```

### Combining Multiple Sensors

```yaml
sensor:
  - platform: bme280
    temperature:
      id: temp
      name: "Temperature"
    humidity:
      id: humid
      name: "Humidity"
      
  # Calculate dew point
  - platform: template
    name: "Dew Point"
    lambda: |-
      float t = id(temp).state;
      float h = id(humid).state;
      float a = 17.27;
      float b = 237.7;
      float alpha = ((a * t) / (b + t)) + log(h / 100.0);
      return (b * alpha) / (a - alpha);
    unit_of_measurement: "°C"
    device_class: "temperature"
```

### State-Based Templates

```yaml
sensor:
  - platform: template
    name: "System Status"
    lambda: |-
      if (id(temp).state > 50) return 2;  // Critical
      if (id(temp).state > 35) return 1;  // Warning
      return 0;  // OK
    update_interval: 10s
```

## Sensor Automations Examples

### Alert on High Value

```yaml
sensor:
  - platform: bme280
    temperature:
      name: "Temperature"
      id: temperature
      on_value_range:
        - above: 28.0
          then:
            - homeassistant.event:
                event: esphome.high_temperature
                data:
                  temperature: !lambda 'return id(temperature).state;'
```

### Hysteresis Control

```yaml
sensor:
  - platform: bme280
    temperature:
      name: "Temperature"
      id: temp
      on_value:
        then:
          - if:
              condition:
                # Turn on at 26°C, off at 24°C
                lambda: |-
                  if (x > 26.0) return true;
                  if (x < 24.0) return false;
                  return id(cooling_active);
              then:
                - globals.set:
                    id: cooling_active
                    value: 'true'
                - switch.turn_on: cooler
              else:
                - globals.set:
                    id: cooling_active
                    value: 'false'
                - switch.turn_off: cooler

globals:
  - id: cooling_active
    type: bool
    initial_value: 'false'
```

## Performance Tips

1. **Update Interval:** Don't poll sensors faster than needed. Most environmental sensors don't need sub-second updates.

2. **Filters:** Use `delta` and `throttle` filters to reduce network traffic and Home Assistant database size.

3. **Moving Averages:** Smooth noisy sensors instead of sending every fluctuation.

4. **Heartbeat:** For slowly-changing values, use `heartbeat` to ensure Home Assistant knows the device is alive.

## Best Practices

✅ **Do:**
- Use meaningful names
- Set appropriate `device_class` for Home Assistant integration
- Apply calibration offsets when needed
- Use filters to reduce noise and network traffic
- Add `id` when referencing in automations

❌ **Don't:**
- Poll sensors too frequently (wastes power and network)
- Forget units of measurement
- Skip calibration for precision applications
- Use raw ADC values without filtering

## Common Sensor Platforms

- **ADC:** Analog-to-digital converter readings
- **DHT:** DHT11/DHT22 temperature and humidity
- **BME280:** Temperature, humidity, pressure
- **BH1750:** Light intensity
- **Ultrasonic:** Distance measurement
- **Pulse Counter:** Frequency/pulse counting
- **WiFi Signal:** RSSI
- **Uptime:** Device runtime
- **Template:** Calculated values

## Integration with Home Assistant

Sensors automatically appear in Home Assistant when using the API component:

```yaml
api:
  encryption:
    key: "your_key"

sensor:
  - platform: bme280
    temperature:
      name: "Living Room Temperature"
      # Appears in HA as: sensor.living_room_temperature
```

The sensor will:
- Show in Home Assistant with the icon
- Be graphable in history
- Be usable in automations
- Appear in energy dashboard (if applicable)
- Support long-term statistics (with `state_class`)
