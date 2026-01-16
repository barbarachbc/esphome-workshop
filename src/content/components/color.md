---
title: "Display Color"
description: "Color definitions and helpers for display components"
category: "display"
esphomeComponent: "color"
documentation: "https://esphome.io/components/display/index.html#color"

relatedDevices: ["gc9a01-round-lcd"]
relatedProjects:
    - id: info-panel-28
      description: Using colors with LVGL
tags: ["display", "color", "graphics", "helper"]
lastModified: "2025-12-07"
---

## Overview

The Display Color component provides color definition utilities for display components, allowing you to define reusable color constants in various formats (RGB, hex, named colors).

### Common HTML Colors

[Named Colors](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/named-color) on Mozilla MDN.

### ESPHome Colors External Component
Nice idea to create external component with all the named colors: [esphome-colors](https://gitlab.com/wjcarpenter/esphome-colors).

### Colors to use in Lambda

Simple way to define colors (but can only be used inside lambdas):
```c++
//named_colors.h
#include "esphome/core/color.h"

#define COLOR_CSS_BLACK	 Color(0x000000)
#define COLOR_CSS_SILVER	 Color(0xC0C0C0)
#define COLOR_CSS_GRAY	 Color(0x808080)
#define COLOR_CSS_WHITE	 Color(0xFFFFFF)
#define COLOR_CSS_MAROON	 Color(0x800000)
#define COLOR_CSS_RED	 Color(0xFF0000)
#define COLOR_CSS_PURPLE	 Color(0x800080)
#define COLOR_CSS_FUCHSIA	 Color(0xFF00FF)
#define COLOR_CSS_GREEN	 Color(0x008000)
#define COLOR_CSS_LIME	 Color(0x00FF00)
#define COLOR_CSS_OLIVE	 Color(0x808000)
#define COLOR_CSS_YELLOW	 Color(0xFFFF00)
#define COLOR_CSS_NAVY	 Color(0x000080)
#define COLOR_CSS_BLUE	 Color(0x0000FF)
#define COLOR_CSS_TEAL	 Color(0x008080)
#define COLOR_CSS_AQUA	 Color(0x00FFFF)
#define COLOR_CSS_ALICEBLUE	 Color(0xF0F8FF)
#define COLOR_CSS_ANTIQUEWHITE	 Color(0xFAEBD7)
#define COLOR_CSS_AQUA	 Color(0x00FFFF)
#define COLOR_CSS_AQUAMARINE	 Color(0x7FFFD4)
#define COLOR_CSS_AZURE	 Color(0xF0FFFF)
#define COLOR_CSS_BEIGE	 Color(0xF5F5DC)
#define COLOR_CSS_BISQUE	 Color(0xFFE4C4)
#define COLOR_CSS_BLACK	 Color(0x000000)
#define COLOR_CSS_BLANCHEDALMOND	 Color(0xFFEBCD)
#define COLOR_CSS_BLUE	 Color(0x0000FF)
#define COLOR_CSS_BLUEVIOLET	 Color(0x8A2BE2)
#define COLOR_CSS_BROWN	 Color(0xA52A2A)
#define COLOR_CSS_BURLYWOOD	 Color(0xDEB887)
#define COLOR_CSS_CADETBLUE	 Color(0x5F9EA0)
#define COLOR_CSS_CHARTREUSE	 Color(0x7FFF00)
#define COLOR_CSS_CHOCOLATE	 Color(0xD2691E)
#define COLOR_CSS_CORAL	 Color(0xFF7F50)
#define COLOR_CSS_CORNFLOWERBLUE	 Color(0x6495ED)
#define COLOR_CSS_CORNSILK	 Color(0xFFF8DC)
#define COLOR_CSS_CRIMSON	 Color(0xDC143C)
#define COLOR_CSS_CYAN	 Color(0x00FFFF)
#define COLOR_CSS_DARKBLUE	 Color(0x00008B)
#define COLOR_CSS_DARKCYAN	 Color(0x008B8B)
#define COLOR_CSS_DARKGOLDENROD	 Color(0xB8860B)
#define COLOR_CSS_DARKGRAY	 Color(0xA9A9A9)
#define COLOR_CSS_DARKGREEN	 Color(0x006400)
#define COLOR_CSS_DARKGREY	 Color(0xA9A9A9)
#define COLOR_CSS_DARKKHAKI	 Color(0xBDB76B)
#define COLOR_CSS_DARKMAGENTA	 Color(0x8B008B)
#define COLOR_CSS_DARKOLIVEGREEN	 Color(0x556B2F)
#define COLOR_CSS_DARKORANGE	 Color(0xFF8C00)
#define COLOR_CSS_DARKORCHID	 Color(0x9932CC)
#define COLOR_CSS_DARKRED	 Color(0x8B0000)
#define COLOR_CSS_DARKSALMON	 Color(0xE9967A)
#define COLOR_CSS_DARKSEAGREEN	 Color(0x8FBC8F)
#define COLOR_CSS_DARKSLATEBLUE	 Color(0x483D8B)
#define COLOR_CSS_DARKSLATEGRAY	 Color(0x2F4F4F)
#define COLOR_CSS_DARKSLATEGREY	 Color(0x2F4F4F)
#define COLOR_CSS_DARKTURQUOISE	 Color(0x00CED1)
#define COLOR_CSS_DARKVIOLET	 Color(0x9400D3)
#define COLOR_CSS_DEEPPINK	 Color(0xFF1493)
#define COLOR_CSS_DEEPSKYBLUE	 Color(0x00BFFF)
#define COLOR_CSS_DIMGRAY	 Color(0x696969)
#define COLOR_CSS_DIMGREY	 Color(0x696969)
#define COLOR_CSS_DODGERBLUE	 Color(0x1E90FF)
#define COLOR_CSS_FIREBRICK	 Color(0xB22222)
#define COLOR_CSS_FLORALWHITE	 Color(0xFFFAF0)
#define COLOR_CSS_FORESTGREEN	 Color(0x228B22)
#define COLOR_CSS_FUCHSIA	 Color(0xFF00FF)
#define COLOR_CSS_GAINSBORO	 Color(0xDCDCDC)
#define COLOR_CSS_GHOSTWHITE	 Color(0xF8F8FF)
#define COLOR_CSS_GOLD	 Color(0xFFD700)
#define COLOR_CSS_GOLDENROD	 Color(0xDAA520)
#define COLOR_CSS_GRAY	 Color(0x808080)
#define COLOR_CSS_GREEN	 Color(0x008000)
#define COLOR_CSS_GREENYELLOW	 Color(0xADFF2F)
#define COLOR_CSS_GREY	 Color(0x808080)
#define COLOR_CSS_HONEYDEW	 Color(0xF0FFF0)
#define COLOR_CSS_HOTPINK	 Color(0xFF69B4)
#define COLOR_CSS_INDIANRED	 Color(0xCD5C5C)
#define COLOR_CSS_INDIGO	 Color(0x4B0082)
#define COLOR_CSS_IVORY	 Color(0xFFFFF0)
#define COLOR_CSS_KHAKI	 Color(0xF0E68C)
#define COLOR_CSS_LAVENDER	 Color(0xE6E6FA)
#define COLOR_CSS_LAVENDERBLUSH	 Color(0xFFF0F5)
#define COLOR_CSS_LAWNGREEN	 Color(0x7CFC00)
#define COLOR_CSS_LEMONCHIFFON	 Color(0xFFFACD)
#define COLOR_CSS_LIGHTBLUE	 Color(0xADD8E6)
#define COLOR_CSS_LIGHTCORAL	 Color(0xF08080)
#define COLOR_CSS_LIGHTCYAN	 Color(0xE0FFFF)
#define COLOR_CSS_LIGHTGOLDENRODYELLOW	 Color(0xFAFAD2)
#define COLOR_CSS_LIGHTGRAY	 Color(0xD3D3D3)
#define COLOR_CSS_LIGHTGREEN	 Color(0x90EE90)
#define COLOR_CSS_LIGHTGREY	 Color(0xD3D3D3)
#define COLOR_CSS_LIGHTPINK	 Color(0xFFB6C1)
#define COLOR_CSS_LIGHTSALMON	 Color(0xFFA07A)
#define COLOR_CSS_LIGHTSEAGREEN	 Color(0x20B2AA)
#define COLOR_CSS_LIGHTSKYBLUE	 Color(0x87CEFA)
#define COLOR_CSS_LIGHTSLATEGRAY	 Color(0x778899)
#define COLOR_CSS_LIGHTSLATEGREY	 Color(0x778899)
#define COLOR_CSS_LIGHTSTEELBLUE	 Color(0xB0C4DE)
#define COLOR_CSS_LIGHTYELLOW	 Color(0xFFFFE0)
#define COLOR_CSS_LIME	 Color(0x00FF00)
#define COLOR_CSS_LIMEGREEN	 Color(0x32CD32)
#define COLOR_CSS_LINEN	 Color(0xFAF0E6)
#define COLOR_CSS_MAGENTA	 Color(0xFF00FF)
#define COLOR_CSS_MAROON	 Color(0x800000)
#define COLOR_CSS_MEDIUMAQUAMARINE	 Color(0x66CDAA)
#define COLOR_CSS_MEDIUMBLUE	 Color(0x0000CD)
#define COLOR_CSS_MEDIUMORCHID	 Color(0xBA55D3)
#define COLOR_CSS_MEDIUMPURPLE	 Color(0x9370DB)
#define COLOR_CSS_MEDIUMSEAGREEN	 Color(0x3CB371)
#define COLOR_CSS_MEDIUMSLATEBLUE	 Color(0x7B68EE)
#define COLOR_CSS_MEDIUMSPRINGGREEN	 Color(0x00FA9A)
#define COLOR_CSS_MEDIUMTURQUOISE	 Color(0x48D1CC)
#define COLOR_CSS_MEDIUMVIOLETRED	 Color(0xC71585)
#define COLOR_CSS_MIDNIGHTBLUE	 Color(0x191970)
#define COLOR_CSS_MINTCREAM	 Color(0xF5FFFA)
#define COLOR_CSS_MISTYROSE	 Color(0xFFE4E1)
#define COLOR_CSS_MOCCASIN	 Color(0xFFE4B5)
#define COLOR_CSS_NAVAJOWHITE	 Color(0xFFDEAD)
#define COLOR_CSS_NAVY	 Color(0x000080)
#define COLOR_CSS_OLDLACE	 Color(0xFDF5E6)
#define COLOR_CSS_OLIVE	 Color(0x808000)
#define COLOR_CSS_OLIVEDRAB	 Color(0x6B8E23)
#define COLOR_CSS_ORANGE	 Color(0xFFA500)
#define COLOR_CSS_ORANGERED	 Color(0xFF4500)
#define COLOR_CSS_ORCHID	 Color(0xDA70D6)
#define COLOR_CSS_PALEGOLDENROD	 Color(0xEEE8AA)
#define COLOR_CSS_PALEGREEN	 Color(0x98FB98)
#define COLOR_CSS_PALETURQUOISE	 Color(0xAFEEEE)
#define COLOR_CSS_PALEVIOLETRED	 Color(0xDB7093)
#define COLOR_CSS_PAPAYAWHIP	 Color(0xFFEFD5)
#define COLOR_CSS_PEACHPUFF	 Color(0xFFDAB9)
#define COLOR_CSS_PERU	 Color(0xCD853F)
#define COLOR_CSS_PINK	 Color(0xFFC0CB)
#define COLOR_CSS_PLUM	 Color(0xDDA0DD)
#define COLOR_CSS_POWDERBLUE	 Color(0xB0E0E6)
#define COLOR_CSS_PURPLE	 Color(0x800080)
#define COLOR_CSS_REBECCAPURPLE	 Color(0x663399)
#define COLOR_CSS_RED	 Color(0xFF0000)
#define COLOR_CSS_ROSYBROWN	 Color(0xBC8F8F)
#define COLOR_CSS_ROYALBLUE	 Color(0x4169E1)
#define COLOR_CSS_SADDLEBROWN	 Color(0x8B4513)
#define COLOR_CSS_SALMON	 Color(0xFA8072)
#define COLOR_CSS_SANDYBROWN	 Color(0xF4A460)
#define COLOR_CSS_SEAGREEN	 Color(0x2E8B57)
#define COLOR_CSS_SEASHELL	 Color(0xFFF5EE)
#define COLOR_CSS_SIENNA	 Color(0xA0522D)
#define COLOR_CSS_SILVER	 Color(0xC0C0C0)
#define COLOR_CSS_SKYBLUE	 Color(0x87CEEB)
#define COLOR_CSS_SLATEBLUE	 Color(0x6A5ACD)
#define COLOR_CSS_SLATEGRAY	 Color(0x708090)
#define COLOR_CSS_SLATEGREY	 Color(0x708090)
#define COLOR_CSS_SNOW	 Color(0xFFFAFA)
#define COLOR_CSS_SPRINGGREEN	 Color(0x00FF7F)
#define COLOR_CSS_STEELBLUE	 Color(0x4682B4)
#define COLOR_CSS_TAN	 Color(0xD2B48C)
#define COLOR_CSS_TEAL	 Color(0x008080)
#define COLOR_CSS_THISTLE	 Color(0xD8BFD8)
#define COLOR_CSS_TOMATO	 Color(0xFF6347)
#define COLOR_CSS_TURQUOISE	 Color(0x40E0D0)
#define COLOR_CSS_VIOLET	 Color(0xEE82EE)
#define COLOR_CSS_WHEAT	 Color(0xF5DEB3)
#define COLOR_CSS_WHITE	 Color(0xFFFFFF)
#define COLOR_CSS_WHITESMOKE	 Color(0xF5F5F5)
#define COLOR_CSS_YELLOW	 Color(0xFFFF00)
#define COLOR_CSS_YELLOWGREEN	 Color(0x9ACD32)
```

Example:

```yaml
esphome:
  name: my-round-display
  includes:
    - named_colors.h

display:
  - platform: mipi_spi
    id: round_screen
    model: GC9A01A
    cs_pin: ${disp_cs_pin}
    dc_pin: ${disp_dc_pin}
    reset_pin: ${disp_reset_pin}
    invert_colors: true
    color_order: BGR
    buffer_size: 25%
    lambda: |-
      it.filled_circle(it.get_width()/2, it.get_height()/2, 60, COLOR_CSS_RED);
      it.print(it.get_width()/2, it.get_height()/2, id(roboto), COLOR_CSS_BLUE, TextAlign::CENTER, "Hello!");
```