---
title: "Logger"
description: "Control logging output and verbosity for debugging"
category: "core"
esphomeComponent: "logger"
documentation: "https://esphome.io/components/logger.html"

tags: ["debugging", "logging", "serial"]
---

## Overview

The Logger component manages log output from the ESPHome device, controlling what information is printed to the serial console and logged over the network API.

## Notes

This component works with all ESPHome-compatible devices.

This is recommended to be turned on at DEBUG level for at least during working out your yaml configuration. After deployment you can lower the logging level.
