---
title: "Substitutions"
description: "Define reusable variables for ESPHome configurations"
category: "core"
esphomeComponent: "substitutions"
documentation: "https://esphome.io/guides/configuration-types.html#substitutions"
relatedProjects: ["bedroom-climate-controller-touch"]

tags: ["configuration", "variables", "reusability"]
---

## Overview

Substitutions allow you to define variables in your ESPHome configuration that can be reused throughout the file, making configurations more maintainable and easier to adapt.

# Notes

I use it nearly everywhere, especially for examples. It is handy to use substitutions for GPIOs since different devices uses different GPIOs for SPI, I2C etc.
