---
title: '8x8 BiColor LED Matrix'
description: '8x8 Red and Green LED matrix display module'
category: "display"
manufacturer: "Sure Electronics"
model: "LE-MM103"
connectionTypes: ["gpio"]
components: []
tags: ["led", "matrix", "display"]
productionStatus: "unknown"
references:
  - title: Datasheet
    url: https://www.hackerstore.nl/PDFs/BiColor.pdf
  - title: Code Example
    url: https://blog.duklabs.com/arduino-8x8-led-matrix/
  - title: Charlieplexing
    url: https://en.wikipedia.org/wiki/Charlieplexing
status: "unsupported"
count: 3
---

## Overview

The 8x8 BiColor LED Matrix is a square array of 128 (64 Red and Green each) LEDs arranged in 8 rows and 8 columns. There are 24 pins on the side, 12 on each, with 0.1" spacing so you can easily plug it into a breadboard.

The module features:
- 128 LEDs in 8x8 grid (2 LEDs per dot)
- Common cathode configurations

## Status Remarks

One matrix requires 24 GPIOs (16 if only one color used). Treating it as unsupported for now because I need to see how to incorporate it.
