---
title: "Setting up mDNS in Docker for ESPHome"
description: "How to configure Docker networking so ESPHome can discover devices by hostname"
category: "networking"
difficulty: "intermediate"
tags: ["docker", "mdns", "networking", "esphome"]
lastUpdated: "November 2025"
---

# Setting up mDNS in Docker for ESPHome

When running ESPHome in Docker, you might notice that device discovery doesn't work by default. This is because mDNS (multicast DNS) doesn't traverse Docker's default bridge network.

## The Problem

ESPHome devices advertise themselves on the local network using mDNS (that's why you can access them at `device-name.local`). When ESPHome Dashboard runs in a Docker container, it can't see these mDNS broadcasts.

## The Solution

Use Docker's `host` network mode for the ESPHome container:

```yaml
# docker-compose.yml
services:
  esphome:
    image: esphome/esphome
    network_mode: host
    volumes:
      - ./config:/config
    environment:
      - TZ=America/New_York
```

## Important Notes

- Host networking mode gives the container full access to the host's network stack
- This is the easiest solution but reduces container isolation
- On Windows/Mac, host networking doesn't work the same way (Docker Desktop limitation)
- Alternative: Use Home Assistant's ESPHome add-on which handles this automatically

## Testing

After restarting the container, devices should appear in the dashboard automatically. You can verify mDNS is working by pinging a device:

```bash
ping esp32-weather.local
```

If it resolves, mDNS is working!
