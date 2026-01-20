---
title: "XiaGe Xmini-C3 AI Voice Development Board"
description: "ESP32-C3 development board with 0.96\" OLED display, audio codec, amplifier, microphone, and speaker"
category: "board"
manufacturer: "XiaGe (Tenclass)"
model: "Xmini-C3"
variants: ["Xmini-C3"]
connectionTypes: ["gpio", "i2c", "uart", "pwm", "analog"]
components: ["esp32", "i2c", "display-ssd1306-i2c", "binary-sensor-gpio", "light-esp32-rmt-led-strip"]
tags: ["wifi", "bluetooth", "esp32c3", "audio", "display", "ai-voice", "es8311", "ssd1306"]
productionStatus: "active"
status: "testing"
dateAcquired: "Dec 2025"
references:
  - title: Schematic (OSHWHub)
    url: https://oshwhub.com/tenclass01/xmini_c3
  - title: XiaoZhi AI Project
    url: https://xiaozhi.me/
  - title: XiaoZhi AI Documentation
    url: https://ai.feishu.cn/wiki/Jf7RwvQfQiFNT7k1eIbc00Runlc
  - title: XiaoZhi ESP32 GitHub
    url: https://github.com/78/xiaozhi-esp32
  - title: ESP Speech Recognition
    url: https://github.com/espressif/esp-sr
purchaseLinks:
  - vendor: Amazon IE
    url: https://www.amazon.ie/Uxsjakjsd-ESP32-C3-Development-with0-96inch-withSpeaker/dp/B0F9PDMXP8
  - vendor: Amazon UK
    url: https://www.amazon.co.uk/Uxsjakjsd-ESP32-C3-Development-with0-96inch-withSpeaker/dp/B0F9PDMXP8
  - vendor: AliExpress
    url: https://www.aliexpress.com/item/1005010344557728.html
image: "/images/devices/thumbnails/xmini-c3.jpg"
count: 1
usedCount: 0
changelog:
  - date: "2026-01-18"
    type: "added"
    description: "Initial documentation for Xmini-C3 development board"
lastModified: "2026-01-20"
---

## Overview

The XiaGe Xmini-C3 is a compact AI voice development board designed for the XiaoZhi AI voice assistant project.
It combines an ESP32-C3 microcontroller with audio processing capabilities (ES8311 codec + NS4150B amplifier),
a 0.96-inch OLED display, and battery support in a small form factor.

![Xmini-C3 photo](./images/xmini-c3/device.jpg)

This board is specifically designed for the **XiaoZhi AI** voice assistant project and includes
hardware optimized for that use case. Of course we'll try to setup voice assistant in Home Assistant and keep
everything local.

## Test Status

- ✅ [Basic Config](#basic-configuration) with boot button and LED indicator
- ✅ [Display (SSD1306)](#display)
- ✅ Boot Button
- ✅ LED Indicator
- [ ] Audio (ES8311 + NS4150B)
- [ ] Microphone (ES8311)

## Hardware Features

- **Display:** 0.96-inch SSD1306 OLED (128x64 monochrome/dual color) (I2C ADDR: 0x3C)
- **Audio Codec:** ES8311 audio decoder (I2S & I2C) I2C Addr: 0x18
- **Amplifier:** NS4150B power amplifier IC (connected to ES8311)
- **Microphone:** Onboard microphone for voice input (ZTS6216 connected to ES8311)
- **Speaker:** 1.25mm connector for 3W-5W cavity speaker (speaker included)
- **Connectivity:** WiFi 802.11 b/g/n, Bluetooth LE 5.0
- **Power:** 3.7V lithium battery support with LGS4056 charging IC
- **USB:** TYPE-C for programming, serial communication, and 5V charging
- **Buttons:** BOOT button for wake-up and dialogue interrupt, Reset button
- **Antenna:** Ceramic antenna
- **Expansion:** 6-pin interface (UART RX/TX, VSys, 3V3, GND)
- **LED:** WS2812 RGB LED

### Module Specifications

- **MCU:** ESP32-C3-QFN-32-EP
- **CPU:** 32-bit RISC-V single-core processor, up to 160 MHz
- **RAM:** 400KB
- **Flash:** 16MB NOR FLASH (W25Q128JVSIQ)
- **Operating Voltage:** 3.3V
- **Input Voltage:** 5V (USB-C) or 3.7V (battery)

### Audio Specifications

- **Codec:** ES8311 I2S audio codec
- **Amplifier:** NS4150B (3W-5W output)
- **Speaker Interface:** 1.25mm standard connector
- **Speaker:** Default 3514 ultra-thin cavity speaker (8 Ω 2W)

## Pinout and I/O Connectors

### Buttons

- **Power Mode Switch:** There's a slide-switch on the side for switching between USB & Battery power supply
- **Boot (BOOT):** Wake-up button, also used for dialogue interrupt

### Expansion Interface (6-Pin)

The 6-pin expansion interface provides:

- **UART RX/TX:** Serial communication
- **VSys:** ~4.5V system voltage
- **3V3:** 3.3V regulated output
- **GND:** Ground (2x)

### Battery and Speaker Connectors

- **Battery:** 1.25mm standard connector for 3.7V lithium battery
- **Speaker:** 1.25mm standard connector (3W-5W recommended)

### Pin Distribution

The table below is based on the [schematic](https://oshwhub.com/tenclass01/xmini_c3) and later I found the
[config file with everything 🙂](https://github.com/78/xiaozhi-esp32/blob/main/main/boards/xmini-c3/config.h)

| ESP32C3 | Function | Connected To | Notes |
| --- | -------- | ------------ | ----- |
| GPIO09 | | Boot Button | |
| GPIO03 | I2C_SDA | Display/Audio Codec | |
| GPIO04 (MTTMS) | I2C_SCL | Display/Audio Codec | |
| GPIO02 | WS2812 DIN | NeoPixel | |
| SPICS0 (GPIO14) | SPI_CS0 | Flash | Reserved for Flash - do not use |
| SPICLK (GPIO15) | SPI_CLK | Flash | Reserved for Flash - do not use |
| SPID (GPIO16) | SPI_ID | Flash | Reserved for Flash - do not use |
| SPIQ (GPIO17) | SPI_IQ | Flash | Reserved for Flash - do not use |
| SPIWP (GPIO13) | U1TXD | UART TX | Expansion interface |
| SPIHD (GPIO12) | U1RXD | UART RX | Expansion interface |
| GPIO10 | I2S_MCK | Audio Codec | |
| GPIO08 | I2S_BCK | Audio Codec | |
| MTDO (GPIO07) | I2S_DI | Audio Codec | |
| MTCK (GPIO06) | I2S_WS | Audio Codec | |
| MTDI (GPIO05) | I2S_DO | Audio Codec | |

## Important Notes

**WARNING ⚠️**: The board does not have reset button, and for whatever reason it does not reboot automatically
after using USB to upload firmware. If you're using [ESPHome Web interface](https://web.esphome.io/) you'll need go
to Logs and there is an option to Reset Device. I just could not figure out how to do it automatically, I tried
several *platformio_options* but without success.

**WARNING ⚠️**: Make sure to go through [basic configuration](#basic-configuration) and if that is working
you have correctly setup board. Flash is connected in Dual SPI mode. The default configuration is DIO (Dual I/O),
so not specifying it will work, but I prefer to be explicit about it when I know this is how the board is wired-up.

**INFO ℹ️**: There are 2 I2C pheripherals - the display and the audio codec. They use default addresses:
0x3C and 0x18 respectively.
The basic configuration has I2C configured so in the logs you should see something like:

```
[09:01:09][C][i2c.idf:094]:  SDA Pin: GPIO3
[09:01:09][C][i2c.idf:094]:  SCL Pin: GPIO4
[09:01:09][C][i2c.idf:094]:  Frequency: 50000 Hz
[09:01:09][C][i2c.idf:114]: Results from bus scan:
[09:01:09][C][i2c.idf:120]: Found device at address 0x18
[09:01:09][C][i2c.idf:120]: Found device at address 0x3C
```

**LOOK OUT 🔍**: There's a switch on the side for battery operation. Board won't power up when connected over USB if
the switch is in the battery mode. If you can't get the board to work, maybe the switch is in the wrong position.

## ESPHome Configuration

### Basic Configuration

Basic configuration for Xmini-C3 with ESP32-C3 only covers very basic and minimal configuration.
This does nothing spectacular but gives you an option to make sure that everything is working.
The configuration below will configure the board to build correctly and will correctly configure
the RGB LED indicator, boot button and I2C bus. Things to check after using this configuration:

- Check log, I2C should do address scan and should show that it found devices with 0x18 and 0x3C address
- Press boot button - after a slight delay the LED Indicator will turn purple-ish.
- Release boot button - the LED indicator should turn off

![Photo of boot button press causing LED to turn on](./images/xmini-c3/led_indicator.jpg)

```yaml
esphome:
  name: my-xmini-c3

esp32:
  variant: esp32c3
  framework:
    type: esp-idf
    sdkconfig_options:
      CONFIG_ESPTOOLPY_FLASHMODE_DIO: y
  flash_size: 16MB

logger:

substitutions:
  boot_btn_pin: GPIO09
  i2c_sda_pin: GPIO03
  i2c_scl_pin: GPIO04
  neopixel_pin: GPIO02

i2c:
  sda: ${i2c_sda_pin}
  scl: ${i2c_scl_pin}

light:
  - platform: esp32_rmt_led_strip
    id: my_indicator
    chipset: ws2812
    num_leds: 1
    rgb_order: GRB
    name: "Indicator Light"
    restore_mode: ALWAYS_OFF
    pin: ${neopixel_pin}

# Boot button
binary_sensor:
  - platform: gpio
    pin:
      number: ${boot_btn_pin}
      inverted: true
      mode:
        input: true
        pullup: true
    name: "Boot Button"
    id: boot_btn
    on_press:
      then:
        # making sure that RGB light is wired up
        - light.turn_on: my_indicator
        - light.control:
            id: my_indicator
            brightness: 60%
            red: 100%
            green: 25%
            blue: 75%
    on_release:
      then:
        - light.turn_off: my_indicator
```

### Display

The display should be similar to other displays using [SSD1306 component](https://esphome.io/components/display/ssd1306/).
I added some display test code to the basic configuration at the very bottom.
It fills the whole display and shows small empty square in the middle.

![Photo of the board with display showing blue background with yellow stripe](./images/xmini-c3/display.jpg)

```yaml
esphome:
  name: my-xmini-c3

esp32:
  variant: esp32c3
  framework:
    type: esp-idf
    sdkconfig_options:
      CONFIG_ESPTOOLPY_FLASHMODE_DIO: y
  flash_size: 16MB

logger:

substitutions:
  boot_btn_pin: GPIO09
  i2c_sda_pin: GPIO03
  i2c_scl_pin: GPIO04
  neopixel_pin: GPIO02

i2c:
  sda: ${i2c_sda_pin}
  scl: ${i2c_scl_pin}

light:
  - platform: esp32_rmt_led_strip
    id: my_indicator
    chipset: ws2812
    num_leds: 1
    rgb_order: GRB
    name: "Indicator Light"
    restore_mode: ALWAYS_OFF
    pin: ${neopixel_pin}

binary_sensor:
  - platform: gpio
    pin:
      number: ${boot_btn_pin}
      inverted: true
      mode:
        input: true
        pullup: true
    name: "Boot Button"
    id: boot_btn
    on_press:
      then:
        - light.turn_on: my_indicator
        - light.control:
            id: my_indicator
            brightness: 60%
            red: 100%
            green: 25%
            blue: 75%
    on_release:
      then:
        - light.turn_off: my_indicator

#https://esphome.io/components/display/ssd1306/
display:
  - platform: ssd1306_i2c
    model: "SSD1306 128x64"
    address: 0x3C
    lambda: |-
      it.filled_rectangle(0, 0, it.get_width(), it.get_height());
      it.filled_rectangle(it.get_width()/2 - 6, it.get_height()/2 - 6, 12, 12, COLOR_OFF);
```

### Display Configuration Notes

That blue and yellow color looks beautiful 🙂. Now, the display is monochrome so you can't control the colors.
That yellow stripe is "COLOR_ON" for that portion of the display ... 1/4 of the display so first 16 rows.

Keep in mind that the yellow and blue portions of the screen are fixed. So depending on where you want your
yellow stripe to appear you have to physically rotate the screen. Using rotation attribute won't change where
the colors show up, it will just rotate the coordinating system.

You can try this out to see where they yellow shows up. It turns on color for different quarter of the screen
every second.

```yaml
display:
  - platform: ssd1306_i2c
    model: "SSD1306 128x64"
    address: 0x3C
    update_interval: 1s
    #rotation: 180
    lambda: |-
      static auto i = 0;
      it.filled_rectangle(0, 0, it.get_width(), it.get_height(), COLOR_OFF);
      it.filled_rectangle(0, i*16, it.get_width(), 16);
      i = (i+1)%4;
```

## Troubleshooting

### Cannot Write Firmware using Web Interface

I ran into this issue. If you get an issue with either connecting to the device using web interface,
or the installation won't start try this:

- Close your browser and open it again
- Unplug the device and plug it in again

In the first case something's wrong with the driver and/or the browser connection to the device. I am using Edge
browser and I'm testing different devices with different drivers. Sometimes things get wonky, and I tend to not
reboot my machine for days.

In the second case, and I observed this when I used the power selector switch, the board won't go into
boot loader mode. Disconnecting and connecting again seems to work.

## Other Images

![Back of the board photo](./images/xmini-c3/back.jpg)
