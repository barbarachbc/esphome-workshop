---
title: "SSD1306 OLED Display"
description: "Monochrome OLED display with I2C/SPI interface, commonly available in 0.96\" and 1.3\" sizes"
category: "display"
manufacturer: "Solomon Systech"
model: "SSD1306"
connectionTypes: ["i2c", "spi"]
tags: ["display", "oled", "screen", "monochrome"]
purchaseLinks:
  - vendor: "Adafruit"
    url: "https://www.adafruit.com/product/326"
  - vendor: "SparkFun"
    url: "https://www.sparkfun.com/products/14532"
status: "unused"
---

## Overview

The SSD1306 is a popular monochrome OLED (Organic Light-Emitting Diode) display controller that drives 128x64 or 128x32 pixel displays. These displays are commonly available in 0.96" and 1.3" sizes and are perfect for showing sensor readings, status information, or simple graphics in ESPHome projects.

OLED displays are self-illuminating (no backlight needed), have excellent contrast, wide viewing angles, and consume very little power.

## Specifications

- **Controller:** SSD1306
- **Resolution:** 
  - 128x64 pixels (most common)
  - 128x32 pixels (smaller variant)
- **Display Size:**
  - 0.96 inch (128x64)
  - 1.3 inch (128x64)
  - 0.91 inch (128x32)
- **Color:** Monochrome (white, blue, or yellow)
- **Interface:** I2C or SPI (depends on module)
- **Operating Voltage:** 3.3V - 5V (most modules have voltage regulators)
- **Power Consumption:**
  - Typical: 20-30mA (all pixels on)
  - Sleep mode: <10µA
- **Viewing Angle:** >160°
- **Contrast Ratio:** >2000:1
- **Operating Temperature:** -40°C to +85°C

## Common Variants

### I2C Modules (Most Popular)

**4-Pin I2C:**
- **GND** - Ground
- **VCC** - Power (3.3V or 5V)
- **SCL** - I2C clock
- **SDA** - I2C data

**Default I2C Address:** 0x3C (some modules use 0x3D)

### SPI Modules

**7-Pin SPI:**
- **GND** - Ground
- **VCC** - Power
- **D0/SCK** - SPI clock
- **D1/MOSI** - SPI data
- **RES/RST** - Reset
- **DC** - Data/Command select
- **CS** - Chip select

SPI modules are faster but require more GPIO pins.

## Pinout (I2C)

For the most common 4-pin I2C modules:

```
Display Pin    ESP32 Pin
-----------    ---------
GND            GND
VCC            3.3V (or 5V if module has regulator)
SCL            GPIO22 (default I2C clock)
SDA            GPIO21 (default I2C data)
```

## Usage with ESPHome

### Basic I2C Configuration

```yaml
i2c:
  sda: GPIO21
  scl: GPIO22
  scan: true

font:
  - file: "fonts/arial.ttf"
    id: font1
    size: 12
  - file: "fonts/arial.ttf"
    id: font2
    size: 20

display:
  - platform: ssd1306_i2c
    model: "SSD1306 128x64"
    address: 0x3C
    lambda: |-
      it.print(0, 0, id(font1), "Hello World!");
```

### Display with Sensor Data

```yaml
sensor:
  - platform: bme280
    temperature:
      name: "Temperature"
      id: temp
    humidity:
      name: "Humidity"
      id: humid
    address: 0x76
    update_interval: 10s

display:
  - platform: ssd1306_i2c
    model: "SSD1306 128x64"
    address: 0x3C
    update_interval: 1s
    lambda: |-
      // Title
      it.printf(64, 0, id(font2), TextAlign::TOP_CENTER, "Weather");
      
      // Temperature
      it.printf(0, 24, id(font1), "Temp:");
      it.printf(128, 24, id(font1), TextAlign::TOP_RIGHT, "%.1f°C", id(temp).state);
      
      // Humidity
      it.printf(0, 40, id(font1), "Humid:");
      it.printf(128, 40, id(font1), TextAlign::TOP_RIGHT, "%.1f%%", id(humid).state);
      
      // Line separator
      it.line(0, 20, 128, 20);
```

### SPI Configuration

```yaml
spi:
  clk_pin: GPIO18
  mosi_pin: GPIO23

display:
  - platform: ssd1306_spi
    model: "SSD1306 128x64"
    cs_pin: GPIO5
    dc_pin: GPIO16
    reset_pin: GPIO17
    lambda: |-
      it.print(0, 0, id(font1), "Hello SPI!");
```

### Advanced Display Features

```yaml
display:
  - platform: ssd1306_i2c
    model: "SSD1306 128x64"
    address: 0x3C
    rotation: 180  # Rotate display if mounted upside down
    contrast: 255  # 0-255, default is 255
    brightness: 100%  # 0-100%
    lambda: |-
      // Draw shapes
      it.rectangle(0, 0, 128, 64);  // Border
      it.filled_rectangle(10, 10, 30, 20, COLOR_ON);  // Filled box
      it.circle(64, 32, 15);  // Circle
      it.line(0, 0, 128, 64);  // Diagonal line
      
      // Text alignment
      it.printf(64, 32, id(font1), TextAlign::CENTER, "Centered");
```

## Display Drawing Functions

### Text Functions

```yaml
lambda: |-
  // Basic text at position
  it.print(x, y, id(font), "text");
  
  // Text with alignment
  it.print(x, y, id(font), TextAlign::TOP_LEFT, "text");
  
  // Formatted text (printf style)
  it.printf(x, y, id(font), "Temp: %.1f°C", temperature);
  
  // Text alignment options:
  // TOP_LEFT, TOP_CENTER, TOP_RIGHT
  // CENTER_LEFT, CENTER, CENTER_RIGHT
  // BASELINE_LEFT, BASELINE_CENTER, BASELINE_RIGHT
  // BOTTOM_LEFT, BOTTOM_CENTER, BOTTOM_RIGHT
```

### Shape Functions

```yaml
lambda: |-
  // Line
  it.line(x0, y0, x1, y1);
  
  // Horizontal/Vertical lines
  it.horizontal_line(x, y, width);
  it.vertical_line(x, y, height);
  
  // Rectangle
  it.rectangle(x, y, width, height);
  it.filled_rectangle(x, y, width, height, COLOR_ON);
  
  // Circle
  it.circle(center_x, center_y, radius);
  it.filled_circle(center_x, center_y, radius, COLOR_ON);
  
  // Single pixel
  it.pixel(x, y);
  
  // Clear display
  it.fill(COLOR_OFF);
```

### Images/Icons

```yaml
# Define image in config
image:
  - file: "icons/temperature.png"
    id: temp_icon
    resize: 24x24

display:
  - platform: ssd1306_i2c
    # ... config ...
    lambda: |-
      // Draw image at position
      it.image(0, 0, id(temp_icon));
```

## Complete Example: Multi-Screen Display

```yaml
globals:
  - id: screen_page
    type: int
    initial_value: '0'

sensor:
  - platform: bme280
    temperature:
      id: temp
      name: "Temperature"
    humidity:
      id: humid
      name: "Humidity"
    pressure:
      id: press
      name: "Pressure"
    address: 0x76
    update_interval: 10s

  - platform: wifi_signal
    name: "WiFi Signal"
    id: wifi_signal_db

binary_sensor:
  - platform: gpio
    pin: GPIO0  # Button to switch pages
    name: "Display Button"
    on_press:
      then:
        - lambda: |-
            id(screen_page) = (id(screen_page) + 1) % 3;

display:
  - platform: ssd1306_i2c
    model: "SSD1306 128x64"
    address: 0x3C
    update_interval: 0.5s
    lambda: |-
      if (id(screen_page) == 0) {
        // Page 1: Temperature & Humidity
        it.printf(64, 0, id(font2), TextAlign::TOP_CENTER, "Weather");
        it.line(0, 20, 128, 20);
        it.printf(64, 30, id(font2), TextAlign::CENTER, "%.1f°C", id(temp).state);
        it.printf(64, 50, id(font1), TextAlign::CENTER, "%.0f%%", id(humid).state);
      } else if (id(screen_page) == 1) {
        // Page 2: Pressure
        it.printf(64, 0, id(font2), TextAlign::TOP_CENTER, "Pressure");
        it.line(0, 20, 128, 20);
        it.printf(64, 35, id(font2), TextAlign::CENTER, "%.0f", id(press).state);
        it.printf(64, 52, id(font1), TextAlign::CENTER, "hPa");
      } else {
        // Page 3: System Info
        it.printf(64, 0, id(font2), TextAlign::TOP_CENTER, "System");
        it.line(0, 20, 128, 20);
        it.printf(0, 25, id(font1), "WiFi: %.0fdBm", id(wifi_signal_db).state);
        it.printf(0, 40, id(font1), "IP: %s", WiFi.localIP().toString().c_str());
      }
```

## Fonts

ESPHome supports TrueType fonts. Download fonts and place them in your ESPHome config directory.

### Using System Fonts

```yaml
font:
  - file: "fonts/arial.ttf"
    id: small_font
    size: 10
    
  - file: "fonts/arial.ttf"
    id: medium_font
    size: 16
    
  - file: "fonts/arial.ttf"
    id: large_font
    size: 24
```

### Using Google Fonts

```yaml
font:
  - file: 
      type: gfonts
      family: Roboto
      weight: 400
    id: roboto
    size: 16
    
  - file:
      type: gfonts
      family: Roboto Mono
    id: roboto_mono
    size: 12
```

### Special Characters

```yaml
font:
  - file: "fonts/arial.ttf"
    id: font1
    size: 14
    glyphs: |
      !"%()+=,-_.:°0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz
```

## Wiring Example (I2C)

Connect to ESP32:
- **GND** → GND
- **VCC** → 3.3V
- **SCL** → GPIO22
- **SDA** → GPIO21

For ESP8266:
- **GND** → GND
- **VCC** → 3.3V
- **SCL** → GPIO5 (D1)
- **SDA** → GPIO4 (D2)

## Important Notes

⚠️ **I2C Address:** Most displays use 0x3C, but some use 0x3D. Use `i2c: scan: true` to detect.

⚠️ **Power Consumption:** While OLED is efficient, keeping all pixels white draws more current. Use dark backgrounds to save power.

⚠️ **Burn-in:** OLED displays can suffer from burn-in if showing the same static content for extended periods. Consider rotating content or dimming when idle.

⚠️ **Text Size:** Small fonts (below 10pt) may be hard to read. Test different sizes.

⚠️ **Coordinate System:** Origin (0,0) is top-left corner. X increases right, Y increases down.

⚠️ **Update Rate:** Don't update too frequently (0.5-1s is usually fine). Faster updates increase CPU load.

## Display Models

ESPHome supports several SSD1306 variants:

```yaml
display:
  - platform: ssd1306_i2c
    model: "SSD1306 128x64"  # Most common
    # or
    model: "SSD1306 128x32"  # Smaller variant
    # or
    model: "SSD1306 96x16"   # Tiny variant
    # or
    model: "SH1106 128x64"   # Similar controller, 1.3" displays
```

## Common Uses

- **Sensor Displays:** Show real-time temperature, humidity, etc.
- **Status Screens:** Display device status, WiFi info, uptime
- **Notifications:** Alert messages and warnings
- **Menus:** Simple UI for device configuration
- **Graphs:** Simple bar charts or line graphs
- **Clocks:** Time and date display
- **Smart Home Dashboards:** Room status, weather, calendar

## Troubleshooting

### Display Not Working

**Problem:** Display stays blank

**Solutions:**
1. Check I2C address (try both 0x3C and 0x3D)
2. Verify wiring (SDA/SCL not swapped)
3. Check power supply (needs 3.3V or 5V stable)
4. Enable I2C scan to detect the device
5. Try lowering I2C frequency to 100kHz
6. Check if display needs reset (some SPI modules require reset pin)

### Text Not Showing

**Problem:** Display powers on but no text appears

**Solutions:**
1. Verify font file exists in correct path
2. Check font size isn't too large for display
3. Ensure text coordinates are within display bounds (0-127 for x, 0-63 for y)
4. Try drawing a simple shape (rectangle) to verify display works
5. Check contrast/brightness settings

### Partial Display

**Problem:** Only part of screen updates or shows content

**Solutions:**
1. Check display model matches physical display (128x64 vs 128x32)
2. Try SH1106 model if using 1.3" display
3. Update ESPHome to latest version
4. Try external reset of display (power cycle)

### Flickering

**Problem:** Display flickers or updates slowly

**Solutions:**
1. Reduce update frequency (increase `update_interval`)
2. Simplify lambda code (too complex calculations slow updates)
3. Use proper pull-up resistors (4.7kΩ) on I2C lines
4. Shorten I2C wire length (<30cm)
5. Lower I2C frequency if using long wires

### Gibberish/Random Pixels

**Problem:** Display shows random noise or incorrect content

**Solutions:**
1. Check I2C connections are secure
2. Add decoupling capacitor (100nF) near display
3. Ensure stable power supply
4. Move I2C wires away from noise sources
5. Add external pull-up resistors if needed

## Performance Tips

1. **Update Interval:** Set `update_interval` appropriately (0.5-2s). Faster isn't always better.

2. **Simplify Lambda:** Complex calculations in lambda slow down updates. Pre-calculate values.

3. **Font Caching:** ESPHome caches fonts, but many large fonts increase memory usage.

4. **Text vs Graphics:** Text rendering is faster than complex graphics.

5. **Static Content:** Draw static elements (borders, labels) first, then dynamic content.

## Power Saving

For battery-powered projects:

```yaml
display:
  - platform: ssd1306_i2c
    model: "SSD1306 128x64"
    address: 0x3C
    id: my_display
    
# Turn off display when not needed
switch:
  - platform: template
    name: "Display Power"
    lambda: return true;
    turn_on_action:
      - lambda: id(my_display).turn_on();
    turn_off_action:
      - lambda: id(my_display).turn_off();
```

## Example: Progress Bar

```yaml
lambda: |-
  // Draw progress bar for humidity
  float progress = id(humid).state / 100.0;
  int bar_width = 100;
  int bar_height = 10;
  int x = 14;
  int y = 30;
  
  // Border
  it.rectangle(x, y, bar_width, bar_height);
  
  // Fill
  int fill_width = (int)(bar_width * progress);
  it.filled_rectangle(x, y, fill_width, bar_height, COLOR_ON);
  
  // Label
  it.printf(64, 45, id(font1), TextAlign::CENTER, "%.0f%%", id(humid).state);
```

## Animation Example

```yaml
globals:
  - id: animation_frame
    type: int
    initial_value: '0'

display:
  - platform: ssd1306_i2c
    model: "SSD1306 128x64"
    address: 0x3C
    update_interval: 0.1s
    lambda: |-
      // Bouncing ball animation
      int ball_x = 64 + (int)(50 * sin(id(animation_frame) * 0.1));
      int ball_y = 32 + (int)(20 * cos(id(animation_frame) * 0.15));
      
      it.filled_circle(ball_x, ball_y, 5, COLOR_ON);
      
      id(animation_frame)++;
      if (id(animation_frame) > 628) id(animation_frame) = 0;  // 2*PI*100
```

## Next Steps

- Combine with BME280 for weather display
- Add buttons for menu navigation
- Create custom icons with image component
- Build a clock with NTP time sync
- Design multi-page interfaces
- Add graphs for historical data

## Related Information

- [I2C Bus Configuration](/components/i2c)
- [ESP32 DevKit V1](/devices/esp32-devkit-v1)
- [Display Component (Official ESPHome Docs)](https://esphome.io/components/display/ssd1306.html)
