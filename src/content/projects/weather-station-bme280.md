---
title: "Weather Station with BME280"
description: "Build a complete weather station using ESP32 and BME280 sensor to monitor temperature, humidity, and pressure"
difficulty: "beginner"
devices: ["esp32-devkit-v1", "bme280"]
components: ["i2c", "sensor"]
tags: ["weather", "monitoring", "temperature", "humidity", "pressure"]
---

## Project Overview

This beginner-friendly project creates a complete weather station that monitors:
- 🌡️ Temperature
- 💧 Humidity
- 🔽 Barometric Pressure

The data is sent to Home Assistant for display, graphing, and automation triggers.

## What You'll Need

### Hardware
- 1x ESP32 DevKit V1 board
- 1x BME280 sensor breakout board
- 4x jumper wires (female-to-female recommended)
- 1x USB cable (data capable)
- 1x Power supply (USB charger or computer)

### Software
- ESPHome installed
- Home Assistant (optional, but recommended)
- USB-to-Serial drivers (CH340 or CP2102, depending on your ESP32)

## Wiring Diagram

Connect the BME280 to the ESP32:

```
BME280          ESP32 DevKit V1
------          ---------------
VIN   --------> 3.3V
GND   --------> GND
SCL   --------> GPIO22 (Default I2C Clock)
SDA   --------> GPIO21 (Default I2C Data)
```

### Wiring Notes

- ✅ Use the **3.3V pin** on the ESP32 (not 5V) for best compatibility
- ✅ Keep wires **short** (under 15cm) for reliable I2C communication
- ✅ BME280 breakout boards typically have built-in pull-up resistors
- ✅ Double-check connections before powering on

⚠️ **Important:** Don't swap SDA and SCL - this is a common mistake!

## ESPHome Configuration

Create a new ESPHome device with this configuration:

```yaml
esphome:
  name: weather-station
  friendly_name: Weather Station

esp32:
  board: esp32dev
  framework:
    type: arduino

# Enable logging
logger:

# Enable Home Assistant API
api:
  encryption:
    key: !secret weather_station_api_key

ota:
  password: !secret weather_station_ota_password

wifi:
  ssid: !secret wifi_ssid
  password: !secret wifi_password
  
  # Enable fallback hotspot in case wifi connection fails
  ap:
    ssid: "Weather-Station Fallback"
    password: "fallback12345"

# Configure I2C bus
i2c:
  sda: GPIO21
  scl: GPIO22
  scan: true  # This will help verify the sensor is detected
  frequency: 400kHz

# BME280 Sensor Configuration
sensor:
  - platform: bme280
    temperature:
      name: "Temperature"
      id: bme280_temperature
      oversampling: 16x
      filters:
        - sliding_window_moving_average:
            window_size: 10
            send_every: 10
    pressure:
      name: "Pressure"
      id: bme280_pressure
      filters:
        - lambda: return x / 100.0;  # Convert Pa to hPa
    humidity:
      name: "Humidity"
      id: bme280_humidity
      oversampling: 16x
      filters:
        - sliding_window_moving_average:
            window_size: 10
            send_every: 10
    address: 0x76
    update_interval: 60s
    
  # WiFi Signal Strength
  - platform: wifi_signal
    name: "WiFi Signal"
    update_interval: 60s
    
  # Uptime sensor
  - platform: uptime
    name: "Uptime"
    
  # Calculate Dew Point
  - platform: template
    name: "Dew Point"
    lambda: |-
      float temp = id(bme280_temperature).state;
      float humidity = id(bme280_humidity).state;
      float a = 17.27;
      float b = 237.7;
      float alpha = ((a * temp) / (b + temp)) + log(humidity/100.0);
      return (b * alpha) / (a - alpha);
    unit_of_measurement: "°C"
    device_class: "temperature"
    icon: "mdi:water"
    update_interval: 60s

# Status LED (optional - uses built-in LED)
status_led:
  pin:
    number: GPIO2
    inverted: false
```

## Secrets File

Create a `secrets.yaml` file in your ESPHome directory:

```yaml
wifi_ssid: "Your_WiFi_SSID"
wifi_password: "Your_WiFi_Password"
weather_station_api_key: "generate_a_random_32_character_key_here"
weather_station_ota_password: "choose_a_secure_password"
```

## Installation Steps

### 1. Prepare Your ESP32

1. Install USB drivers if needed (CH340 or CP2102)
2. Connect ESP32 to computer via USB
3. Verify the port is detected (check Device Manager on Windows, or `ls /dev/tty*` on Linux/Mac)

### 2. Flash ESPHome

```bash
# Install ESPHome (if not already installed)
pip install esphome

# Validate the configuration
esphome config weather-station.yaml

# Compile and upload
esphome run weather-station.yaml
```

Select the USB port when prompted. The first flash must be done via USB.

### 3. Verify I2C Connection

After flashing, check the ESPHome logs for:

```
[D][i2c:070]: Results from i2c bus scan:
[D][i2c:076]: Found device at address 0x76
```

If you see this, the BME280 is detected! If not, check your wiring.

### 4. Monitor the Output

You should see readings in the logs:

```
[D][sensor:094]: 'Temperature': Got value 23.45°C
[D][sensor:094]: 'Humidity': Got value 45.32%
[D][sensor:094]: 'Pressure': Got value 1013.25hPa
```

## Home Assistant Integration

### Automatic Discovery

If you have the ESPHome integration in Home Assistant, your weather station will be automatically discovered:

1. Go to **Settings → Devices & Services**
2. Look for "Discovered" notification
3. Click **Configure** on the weather station
4. Enter the API encryption key from your secrets file

### Manual Addition

If automatic discovery doesn't work:

1. Go to **Settings → Devices & Services**
2. Click **Add Integration**
3. Search for "ESPHome"
4. Enter the IP address or hostname: `weather-station.local`
5. Enter the API encryption key

### Creating a Dashboard Card

Add this to your dashboard:

```yaml
type: entities
title: Weather Station
entities:
  - entity: sensor.temperature
    name: Temperature
  - entity: sensor.humidity
    name: Humidity
  - entity: sensor.pressure
    name: Pressure
  - entity: sensor.dew_point
    name: Dew Point
  - entity: sensor.wifi_signal
    name: Signal Strength
```

Or use a more visual card:

```yaml
type: vertical-stack
cards:
  - type: weather-forecast
    entity: weather.home
  - type: horizontal-stack
    cards:
      - type: sensor
        entity: sensor.temperature
        graph: line
        name: Temperature
      - type: sensor
        entity: sensor.humidity
        graph: line
        name: Humidity
      - type: sensor
        entity: sensor.pressure
        graph: line
        name: Pressure
```

## Troubleshooting

### BME280 Not Detected

**Problem:** I2C scan doesn't show device at 0x76

**Solutions:**
1. Check wiring (especially SDA/SCL not swapped)
2. Try address 0x77 in configuration
3. Verify BME280 is powered (check with multimeter: should show 3.3V)
4. Test with a different BME280 board (could be defective)
5. Add external 4.7kΩ pull-up resistors on SDA and SCL

### Readings Seem Wrong

**Problem:** Temperature/humidity values are incorrect

**Solutions:**
1. Allow sensor to stabilize (wait 10-15 minutes)
2. Move sensor away from ESP32 (it generates heat)
3. Use calibration offsets:
   ```yaml
   temperature:
     filters:
       - offset: -2.5  # Adjust based on comparison with known accurate sensor
   ```
4. Ensure good airflow around the sensor
5. Keep sensor away from direct sunlight or heat sources

### WiFi Connection Issues

**Problem:** ESP32 won't connect to WiFi

**Solutions:**
1. Verify SSID and password in secrets.yaml
2. Make sure you're using 2.4GHz WiFi (ESP32 doesn't support 5GHz)
3. Check WiFi signal strength (move closer to router)
4. Try the fallback AP: connect to "Weather-Station Fallback"
5. Check router logs for connection attempts

### Random Disconnections

**Problem:** Device keeps disconnecting

**Solutions:**
1. Use a quality power supply (at least 500mA)
2. Add a capacitor (100µF) across the power pins
3. Keep USB cable length under 1.5m
4. Check for WiFi interference
5. Lower the I2C frequency to 100kHz

## Customization Ideas

### Add More Sensors

Extend your weather station:

```yaml
sensor:
  # Add a light sensor (BH1750)
  - platform: bh1750
    name: "Illuminance"
    address: 0x23
    update_interval: 30s
    
  # Add UV sensor
  - platform: adc
    pin: GPIO34
    name: "UV Index"
    # ... configuration
```

### Create Automations

**Turn on fan when hot:**
```yaml
automation:
  - alias: "High Temperature Fan"
    trigger:
      platform: numeric_state
      entity_id: sensor.temperature
      above: 28
    action:
      service: switch.turn_on
      target:
        entity_id: switch.bedroom_fan
```

**Notify on rapid pressure drop (storm warning):**
```yaml
automation:
  - alias: "Pressure Drop Alert"
    trigger:
      platform: numeric_state
      entity_id: sensor.pressure
      below: 1000
    action:
      service: notify.mobile_app
      data:
        message: "Storm warning! Pressure dropping rapidly."
```

### Display on OLED Screen

Add a local display:

```yaml
display:
  - platform: ssd1306_i2c
    model: "SSD1306 128x64"
    address: 0x3C
    lambda: |-
      it.printf(0, 0, id(font), "Temp: %.1f°C", id(bme280_temperature).state);
      it.printf(0, 16, id(font), "Hum:  %.1f%%", id(bme280_humidity).state);
      it.printf(0, 32, id(font), "Pres: %.0fhPa", id(bme280_pressure).state);

font:
  - file: "fonts/arial.ttf"
    id: font
    size: 12
```

## Next Steps

Once you have the basic weather station working:

1. ✅ Add an enclosure (3D printed or weatherproof box)
2. ✅ Mount outdoors for accurate weather monitoring
3. ✅ Add solar power for remote placement
4. ✅ Integrate with Home Assistant automations
5. ✅ Add more sensors (rain, wind, UV)
6. ✅ Create historical graphs and trends
7. ✅ Set up alerts for extreme conditions

## Learn More

- [ESP32 DevKit V1 Details](/devices/esp32-devkit-v1)
- [BME280 Sensor Guide](/devices/bme280)
- [I2C Bus Configuration](/components/i2c)
- [Sensor Component Reference](/components/sensor)

## Contributing

Found an issue or have an improvement? Please contribute back to help others!
