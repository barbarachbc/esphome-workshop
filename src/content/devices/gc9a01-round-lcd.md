---
title: '1.28" Round TFT LCD Display'
description: 'Round RGB TFT LCD display (240x240) with GC9A01 driver'
category: "display"
manufacturer: "Generic"
model: "GC9A01A"
variants: ["1.28 TFT Square variant"]
connectionTypes: ["spi"]
components: ["spi", "display-mipi-spi", "font", "interval", "output-ledc", "light-monochromatic"]
tags: ["display", "lcd", "tft", "rgb", "round", "gc9a01"]
relatedDevices: ["esp32-devkit-v1"]
productionStatus: "active"
purchaseLinks:
  - vendor: "AliExpress"
    url: "https://www.aliexpress.com/item/1005006051175539.html"
status: "ready"
dateAcquired: "May 2024"
count: 2
lastModified: "2026-01-22"
changelog:
  - date: "2025-12-07"
    type: "added"
    description: "Complete first version of the document"
image: "/images/devices/thumbnails/gc9a01-round-lcd.jpg"
---

## Overview

This is a beautiful round TFT LCD color display with 240x240 resolution.

TFT LCD displays offer bright, full-color visuals with excellent readability in various lighting conditions.
The round form factor makes it ideal for watch-style projects, gauges, and unique UI designs.

![GC9A01 Round LCD](./images/gc9a01-round-lcd/gc9a01-round-lcd.jpg)

- 1.28" round RGB TFT LCD display (240x240 pixels)
- Uses the GC9A01A driver chip
- 3 or 4-wire SPI interface
- Full color display (RGB)
- 3.3V compatible

## Testing Status

- ✅ [Basic Config](#basic-configuration) - Wiring up & Test Card in Color
- ✅ [Backlight](#adding-backlight-support)
- ✅ [Simple Graphics and Text](#simple-graphics-and-text-example)
- ✅ [Multipage Icons and Text](#icons-text-pretty) 🌈🦾
- ✅ Tested with ESP32
- [ ] Tested with ESP8266

## Configuration Notes

- Requires **SPI**, spi_id is optional, but spi component is required.
- Platform: **mipi_spi** (also works with ili9xxx)
- Model: **GC9A01A**
- ⚠️ **buffer_size: 25%** - Important! Without this setting, the display may fail to initialize due to
RAM constraints (especially with ESP8266 based boards). Start with 25% and increase if needed
- **invert_colors: true** - May be needed depending on your specific display module, it was required on mine.
- **color_order: BGR** - Adjust if colors appear incorrect.
- cs_pin, dc_pin, and reset_pin are required - can be any available GPIO
- Connecting BLK pin on the device is not required
- ⚠️ The screen is **round**, but the controller sees it as a 240x240 square - you need to be careful when
trying to show something near the edges - for example: (0,0) coordinate is outside of the visible area of the screen.
- It supports [backlight dimming](#adding-backlight-support)
using [ESP32 LEDC Output](https://esphome.io/components/output/ledc/)
or [ESP8266 Software PWM Output](https://esphome.io/components/output/esp8266_pwm/) and
[Monochromatic Light](https://esphome.io/components/light/monochromatic/)

### Wiring

Example here is for [esp32-devkit-v1](./esp32-devkit-v1)
Adjust substitutions based on your board. For the examples below I used the following wiring:

| gc9a01-round-lcd | esp32-devkit-v1 | |
| :---- | :---- | :---- |
| BLK | GPIO25 | |
| CS | GPIO05 | |
| DC | GPIO04 | |
| RES | GPIO16 | |
| SDA (SPI MOSI) | GPIO23 | |
| SCL (SPI CLK) | GPIO18 | |
| VCC | 3V3 | |
| GND | GND | |

### Basic Configuration

Show test card - ensures everything is correctly configured and wired up.

![Round Screen Showing Test Card](./images/gc9a01-round-lcd/test-card.jpg)

```yaml
esphome:
  name: my-round-display

esp32:
  board: esp32dev
  framework:
    type: esp-idf

# Enable logging - always enable, for testing keep it at DEBUG level (default)
logger:

substitutions:
  clk_pin: GPIO18
  mosi_pin: GPIO23
  disp_cs_pin: GPIO05
  disp_dc_pin: GPIO04
  disp_reset_pin: GPIO16

spi:
  clk_pin: ${clk_pin}
  mosi_pin: ${mosi_pin}

display:
  - platform: mipi_spi
    id: my_display
    model: GC9A01A
    cs_pin: ${disp_cs_pin}
    dc_pin: ${disp_dc_pin}
    reset_pin: ${disp_reset_pin}
    show_test_card: true
    invert_colors: true
    color_order: BGR
    buffer_size: 25%

```

### Adding Backlight Support

The following example increases backlight brightness from 10%-100% by 10% every 5 seconds.
**NOTE**: Doesn't work if the backlight is not turned on 🙂

```yaml
interval:
  - interval: 5s
    then:
      - light.turn_on: backlight
      - light.control:
          id: backlight
          brightness: !lambda |-
            static int num_executions = 0;
            num_executions = (num_executions % 10) + 1;
            //go from 10%-100%
            return num_executions * 0.1;

output:
  - platform: ledc
    pin: GPIO25
    id: backlight_pwm

light:
  - platform: monochromatic
    output: backlight_pwm
    name: "Display Backlight"
    id: backlight


display:
  - platform: mipi_spi
    id: my_display
    model: GC9A01A
    cs_pin: ${disp_cs_pin}
    dc_pin: ${disp_dc_pin}
    reset_pin: ${disp_reset_pin}
    show_test_card: true
    invert_colors: true
    color_order: BGR
    buffer_size: 25%
```

### Simple Graphics and Text Example

To add text and graphics, add the lambda section and define fonts to the [basic config](#basic-configuration):

In the real life, the circle is full red, this is weird refreshing that camera caught.
![Round Screen Showing Red Circle and Hello](./images/gc9a01-round-lcd/red-circle-hello.jpg)

```yaml
font:
  - file: "gfonts://Roboto"
    id: roboto
    size: 20

display:
  - platform: mipi_spi
    id: my_display
    model: GC9A01A
    cs_pin: ${disp_cs_pin}
    dc_pin: ${disp_dc_pin}
    reset_pin: ${disp_reset_pin}
    invert_colors: true
    color_order: BGR
    buffer_size: 25%
    lambda: |-
      it.filled_circle(it.get_width()/2, it.get_height()/2, 60, Color(0xFF0000));
      it.print(it.get_width()/2, it.get_height()/2, id(roboto), Color(0x0000FF), TextAlign::CENTER, "Hello!");
```

### Icons, Text, Pretty

Go wild 😉

This example has 4 different pages and changes them every 5 seconds. The display is set not to update itself
because updates are only done on timer. You might want to change `update_interval: never` to some
other value (default is 1s = 1 second) unless you're using LVGL which handles display itself.

I used random colors for page 1. Something weird is going on when you do that, I'm not sure if this is
a bug of some kind, but it does look funky 🌈

For pages 2 and 3 I used colors with corresponding hexcode and then for the last page I just
used COLOR_ON which gives monochromatic display.

Look up more on using colors in [color component](/components/display-color).

![Screen in action](./images/gc9a01-round-lcd/pages-anim.gif)

```yaml

# https://esphome.io/components/interval/
interval:
  - interval: 5s
    then:
      - display.page.show_next: my_display
      - component.update: my_display

font:
  #color screen, so good for anti-aliasing
  - id: value_med
    file:
      type: gfonts
      family: Montserrat
    size: 14
    bpp: 4
  - id: value_small
    file:
      type: gfonts
      family: Montserrat
    size: 10
    bpp: 2
  - id: value_large
    file:
      type: gfonts
      family: Montserrat
      weight: bold
    size: 20
    bpp: 4
  - id: mdi_small
    file: assets/materialdesignicons-webfont.ttf
    size: 24
    bpp: 4
    glyphs: [
      "\U000F1A71", # snowflake-thermometer 
      "\U000F032A", # leaf
      "\U000F04B9", # sofa
      "\U000F14DE", # rocket-launch
      "\U000F0C52", # checkbox-outline
      "\U000F0158", # close-box-outline
      "\U000F0704", # plus-box-outline
      "\U000F06F2", # minus-box-outline
    ]
  - id: mdi_med
    file: assets/materialdesignicons-webfont.ttf
    size: 64
    bpp: 4
    glyphs: [
      "\U000F1807", # mdi-fire-circle
      "\U000F0E1B", # mdi-car-back
    ]
  - id: mdi_large
    file: assets/materialdesignicons-webfont.ttf
    size: 96
    bpp: 4
    glyphs: [
      "\U000F0593", # lightning
      "\U000F1A71", # snowflake-thermometer 
      "\U000F032A", # leaf
      "\U000F04B9", # sofa
      "\U000F14DE", # rocket-launch
    ]

display:
  - platform: mipi_spi
    id: my_display
    model: GC9A01A
    cs_pin: ${disp_cs_pin}
    dc_pin: ${disp_dc_pin}
    reset_pin: ${disp_reset_pin}
    invert_colors: true
    color_order: BGR
    buffer_size: 25%
    # only update on timer for this demo
    update_interval: never
    pages: 
      - id: page_info
        lambda: |-
          //print time and date
          it.print(it.get_width()/2, 32, id(value_large), Color::random_color(), TextAlign::CENTER, "07:45 AM");
          it.print(it.get_width()/2, 194, id(value_med), Color::random_color(), TextAlign::CENTER, "Sun, 7 Dec");

          it.print(24, 42, id(mdi_large), Color::random_color(), "\U000F0593");
          it.print(160, 64, id(value_small), Color::random_color(), TextAlign::TOP_CENTER, "Lightning");
          it.print(24, 144, id(value_large), Color::random_color(), "10.2°C");

          it.print(180, 104, id(mdi_med), Color::random_color(), TextAlign::TOP_CENTER, "\U000F0E1B");
          it.print(180, 164, id(value_med), Color::random_color(), TextAlign::TOP_CENTER, "68%");
      
      - id: page_heating
        lambda: |-

          const std::string presets[] = {
            "frost", "eco", "comfort", "boost"
          };

          const std::string icons[] = {
            "\U000F1A71", "\U000F032A", "\U000F04B9", "\U000F14DE"
          };
            
          it.print(it.get_width() - 24, 42, id(value_med), Color(0x87CEEB), TextAlign::TOP_RIGHT, "07:45 AM");
          it.print(24, 42, id(mdi_med), Color(0x228B22), "\U000F1807");

          it.print(32, 102, id(value_large), Color(0xDC143C), "18.4°C");
          it.print(32, 132, id(value_med), Color(0xDAA520), "52%");

          it.print(it.get_width() - 48, 102, id(value_med), Color(0xBA55D3), TextAlign::CENTER, "18.0°C");
          it.print(it.get_width() - 48, 76, id(mdi_small), Color(0x008080), TextAlign::CENTER, "\U000F04B9");

          //show icons
          const int icon_size = 24;
          auto y = it.get_height() - 2*icon_size;

          for(auto i = 0; i<4; i++){
            auto is_selected = "comfort" == presets[i];
            auto x = 48 + icon_size*i + 9*i; auto invert_icon = false;

            if(is_selected){
              invert_icon = true;
              it.filled_rectangle(x, y-1, icon_size+1, icon_size+1);
            }
            it.print(x, y, id(mdi_small), invert_icon ? COLOR_OFF :  Color(0xF4A460), icons[i].c_str());
          }
      - id: page_change_preset
        lambda: |-
            it.print(it.get_width()/2, it.get_height()/2, id(mdi_large), Color(0xF4A460), TextAlign::BOTTOM_CENTER, "\U000F1A71");
              
            it.print(it.get_width()/2, it.get_height()-68, id(value_med), Color(0x000080),
            TextAlign::TOP_CENTER, "Set the mode to:");
            it.print(it.get_width()/2, it.get_height()-44, id(value_med), Color(0xF08080),
            TextAlign::TOP_CENTER, "Frost ?");

            //apply
            it.print(48, it.get_height() - 48, id(mdi_small), Color(0x00FF00), TextAlign::TOP_LEFT, "\U000F0158");
            //cancel
            it.print(it.get_width()-48, it.get_height() - 48, id(mdi_small), Color(0xFF0000), TextAlign::TOP_RIGHT, "\U000F0C52");
            
      - id: page_change_temp
        lambda: |-
            it.print(it.get_width()/2, it.get_height()/2, id(mdi_large), COLOR_ON, TextAlign::BOTTOM_CENTER, "\U000F14DE");
            it.print(it.get_width()/2, it.get_height()-96, id(value_large), COLOR_ON, TextAlign::TOP_CENTER, "12.5");
            //apply
            it.print(48, it.get_height() - 48, id(mdi_small), COLOR_ON, TextAlign::TOP_LEFT, "\U000F0158");
            //cancel
            it.print(it.get_width()-48, it.get_height() - 48, id(mdi_small), COLOR_ON, TextAlign::TOP_RIGHT, "\U000F0C52");
            //minus
            it.print(96, it.get_height() - 48, id(mdi_small), COLOR_ON, TextAlign::TOP_LEFT, "\U000F06F2");
            //plus
            it.print(it.get_width() - 96, it.get_height() - 48, id(mdi_small), COLOR_ON, TextAlign::TOP_RIGHT, "\U000F0704");


```

## Troubleshooting

- **Display fails to initialize**: Make sure `buffer_size: 25%` is set. The default buffer size may
be too large for some ESP32 modules. Dead givaway is an error in the logs.
- **Wrong colors**: Try adjusting `color_order` between BGR and RGB, or toggle `invert_colors`.
- **Blank display**: Verify SPI wiring and that the reset pin is correctly connected. Check logs.

## Other Images

Back of the LCD:
![GC9A01 Round LCD Back](./images/gc9a01-round-lcd/gc9a01-round-lcd-back.jpg)

Shots from the most [complicated example](#icons-text-pretty):

- Page 1 - Info Screen
![Page 1](./images/gc9a01-round-lcd/page1-info.jpg)
- Page 1 - Info Screen (configured for random colors so another shot)
![Page 1 alt version](./images/gc9a01-round-lcd/page1-info-rand.jpg)
- Page 2 - Heating Screen
![Page 2](./images/gc9a01-round-lcd/page2-heating.jpg)
- Page 3 - Set Heating Preset
![Page 3](./images/gc9a01-round-lcd/page3-preset.jpg)
- Page 4 - Set Boost Temperature
![Page 4](./images/gc9a01-round-lcd/page4-rocket.jpg)
