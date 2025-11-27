---
title: "Setting up mDNS in Docker for ESPHome"
description: "How to configure Docker networking so ESPHome can discover devices by hostname"
category: "networking"
difficulty: "intermediate"
tags: ["docker", "mdns", "networking", "esphome"]
lastUpdated: "November 2025"
---

# Setting up mDNS for Docker

Details how to set up mDNS when hosting Home Assistant and ESPHome in docker. And how to setup Home Assistant in Docker while we’re at it. This is how I set it up, not sure if there are better ways, I am learning as I go 😉

These are my notes on how I did it. I may have missed a few things, for example I have no notes on configuring integrations in Home Assistant and I’m sure I did configure … “things” 😀. Also, there was lots of trial and errors so take this as a starting point.

Goes without saying: your mileage may vary.

If you already have everything configured with docker compose you can just jump straight [to mDNS config](#setting-up-mdns).

## Setting up Home Assistant

I am using Ubuntu Server with Docker compose to run my Home Assistant.

Home Assistant: 

[https://www.home-assistant.io/installation/](https://www.home-assistant.io/installation/)

[https://www.home-assistant.io/installation/linux\#install-home-assistant-container](https://www.home-assistant.io/installation/linux#install-home-assistant-container)  

The following are just notes on my setup, they are not a comprehensive guide. I’ll update them as I go along and change stuff. Any ip addresses, names, ids are not actual values, make sure to use your own specific configuration.

### Ubuntu Server

Note on my machine: I got it 2nd hand from [https://www.refurbed.ie](https://www.refurbed.ie) \- Lenovo ThinkCentre M710Q Tiny with 8GB of RAM and a 128 GB SSD. Cheap and pretty good for HomeAssistant.

Ubuntu Server installation notes:

1) [https://ubuntu.com/tutorials/install-ubuntu-server\#1-overview](https://ubuntu.com/tutorials/install-ubuntu-server#1-overview)  
   - Download latest LTS (long term support) version: [https://ubuntu.com/download/server](https://ubuntu.com/download/server)  
   - Use something like BalenaEtcher to create bootable USB from the ISO (this is just one of the options)  
   - Boot from the usb and install the server (screen and keyboard needed, after install running it headless \- I’m sure there are ways to do it headless all the way, I just didn’t try hard enough)  
2) Update all  
3) Make sure you can access it through SSH \- make sure it’s installed during the guided install  
4) Make sure if you have usb disks they are attached on each boot \- if they were connected on install they should be setup correctly, otherwise fstab might need to be updated manually  
5) Install docker compose \- installed during guided install  
   - IMPORTANT: Docker is installed using snap \- at the time of writing this (mid 2025), snap docker allows volumes from a few **magic** folders like `/home` and `/media`. I had mine in `/data` originally … that did not work and I lost hours figuring it out because there wasn’t much in the logs to go by  
   - NOTE: I’m not sure if docker compose starts automatically on boot, it’s possible that `docker compose up -d` configured it to start automatically or I used something like `sudo systemctl enable docker`  
6) Make sure to enable all network devices during install. I used USB wifi and the box only had ethernet. I forgot to enable it during guided installation so had to manually configure it … very inconvenient  
7) IMPORTANT: Install avahi-daemon so you it can be pinged by name (like homeass.local for example)  
   - `sudo apt-get install avahi-daemon`
8) At some later stage I have set up unattended updates, but that’s another story

Keeping your machine up-to-date:
```bash 
sudo apt update  
sudo apt upgrade
```

### Setting up Docker Services

Once everything is installed on your server, it’s just a matter of configuring Home Assistant in compose.yml

**IMPORTANT**: when using docker \- Add Ons do not work: [https://www.home-assistant.io/installation/\#about-installation-types](https://www.home-assistant.io/installation/#about-installation-types)

Things like ESPHome, MQTT server, Matter server have to be installed as docker containers. I’ll cover it briefly here.  
This is a good starting point: [https://www.home-assistant.io/installation/linux\#docker-compose](https://www.home-assistant.io/installation/linux#docker-compose)  

Before doing anything decide where are you going to keep your configuration and your data. I keep it in my home folder. For the examples below, rough folder structure is:  
```
/home/myuser/ha
              |--compose.yml
              `--services
                  |--homeassistant/config/
                  |--esphome/config/
                  |--mqtt
                  |    |-- data/
                  |    `-- mosquitto/
                  |--esphome/config/
                  `--matter/data/
```

You can do it whichever way you want it keeping in mind that snap docker uses “magic” folders\!

#### Docker Compose

Here’s full compose \- you might need to adjust it slightly for your own stuff:  

```yaml
services:

  homeassistant:
    container_name: homeassistant
    image: "ghcr.io/home-assistant/home-assistant:stable"
    environment:
      - TZ=Europe/Dublin
    volumes:
      - /home/myuser/ha/services/homeassistant/config:/config
      - /etc/localtime:/etc/localtime:ro
      - /run/dbus:/run/dbus:ro
    restart: always
    privileged: true
    network_mode: host
    depends_on:
      - mosquitto
      - zigbee2mqtt
      - esphome
      - matter-server

  zigbee2mqtt:
    container_name: zigbee2mqtt
    image: koenkk/zigbee2mqtt
    restart: always
    volumes:
      - /home/myuser/ha/services/mqtt/data:/app/data
      - /run/udev:/run/udev:ro
      - /etc/localtime:/etc/localtime:ro
    ports:
      # Frontend port
      - 9999:9999
    environment:
      - TZ=Europe/Dublin
    devices:
      # Make sure this matched your adapter location
      - /dev/ttyUSB0:/dev/ttyACM0
    depends_on:
      - mosquitto
    networks:
      - mysmarthomenet

  mosquitto:
    image: eclipse-mosquitto
    container_name: mosquitto
    restart: always
    environment:
      - TZ=Europe/Dublin
    volumes:
      - /home/myuser/ha/services/mqtt/mosquitto:/mosquitto
      - /etc/localtime:/etc/localtime:ro
    ports:
      - 1883:1883
      - 9001:9001
    networks:
      - mysmarthomenet

  esphome:
    container_name: esphome
    image: "ghcr.io/esphome/esphome:stable"
    volumes:
      - /home/myuser/ha/services/esphome/config:/config
      - /etc/localtime:/etc/localtime:ro
    restart: always
    privileged: true
    ports:
      - 6052:6052
      - 6053:6053
    environment:
      - USERNAME=your_username
      - PASSWORD=your_password
      - TZ=Europe/Dublin
    networks:
      - mysmarthomenet

  matter-server:
    image: ghcr.io/home-assistant-libs/python-matter-server:stable
    container_name: matter-server
    restart: always
    ports:
      - 5580:5580
    environment:
      - TZ=Europe/Dublin
    volumes:
      - /home/myuser/ha/services/matter/data:/data
      - /etc/localtime:/etc/localtime:ro
    networks:
      - mysmarthomenet

networks:
  mysmarthomenet:
    external: true

```


Notes for each service:

#### Home Assistant

Pretty much follows: [https://www.home-assistant.io/installation/linux\#docker-compose](https://www.home-assistant.io/installation/linux#docker-compose)

All data and configuration in:  
`/home/myuser/ha/services/homeassistant/config`
I also added `depends_on` so it waits for other services to start.

I’m using restart policy: always. If you stop containers for whatever reason \- unless-stopped policy will not start them \- this is also true if they crash I think. “always” works better for me.

#### ESPHome

[https://esphome.io/guides/getting\_started\_command\_line/\#esphome-device-builder-docker](https://esphome.io/guides/getting_started_command_line/#esphome-device-builder-docker)  

I used the above link as a starting point. I’m not using host mode for networking, see how to configure mDNS.
Nothing else is really needed, just esphome service as in the compose.yml example.

#### Zigbee2Mqtt & Mosquitto

I’m using Zigbee2MQTT for my zigbee devices and Mosquitto as my MQTT server: [https://www.zigbee2mqtt.io/guide/installation/02\_docker.html](https://www.zigbee2mqtt.io/guide/installation/02_docker.html)  

I’m not sure where the 8080 port comes from, 9999 is working for me.

I’m using usb zigbee adapter SONOFF Zigbee 3.0 USB Dongle Plus ZBDongle-P: [https://www.zigbee2mqtt.io/guide/adapters/zstack.html](https://www.zigbee2mqtt.io/guide/adapters/zstack.html)  

It came with correct firmware so I didn’t need to do anything and when plugged in, it appears as `/dev/ttyUSB0`  

Basic config for mosquitto: [https://hub.docker.com/\_/eclipse-mosquitto](https://hub.docker.com/_/eclipse-mosquitto)

#### Matter Server

For supporting matter devices:  
[https://github.com/matter-js/python-matter-server/blob/main/docs/docker.md](https://github.com/matter-js/python-matter-server/blob/main/docs/docker.md)  

Note again that network host mode is not necessary.

#### Network

Network is configured to be external and all services (except home assistant) need to have network configured in “networks” list. If it’s not specified services will use default network and that won’t work for mDNS config.

#### Tying it all Together

You’ll need to configure everything correctly in Home Assistant and respective services. Unfortunately I did not take notes for this. For example, I know mqtt server needs username and password configured, and that is then used to configure zigbee2mqtt and home assistant.

### Updating Home Assistant

Update your images:  
```bash
sudo docker compose pull  
sudo docker compose down  
sudo docker compose up -d  
sudo docker image prune  
```

This will update all your docker images. Pull is getting the latest version, down then up command is recreating your services and prune is deleting old images.  

Things to consider: backup of your configuration and your data. I am subscribed to Home Assistant \- whatever the name is, so I can access it from the internet, it also does backup for me, but also it is good to support the project. You can setup your own VPN or whatever, but consider backing up your stuff.

# Setting up mDNS

ISSUE: pinging your devices by their name is working from your machine and server but not from docker containers.

EXPLANATION: Esphome includes mDNS component and enables all devices to be addressed by name. In order to be able to update them over WiFi Esphome needs to be able to address them by name, but it will not be able to because mDNS uses multicast which does not go across networks. Docker containers have their own network separate from your home network. The reason this is working for HomeAssistant is that it uses host networking and it is connected to your home network.  

SOLUTION: Use mDNS reflector

## Install avahi

If you don’t have avahi daemon installed on your server do it now:  
`sudo apt-get install avahi-daemon`

## Create Docker Network

Create the network externally in docker so it is not re-created on each `docker compose up`. This will cause new adapter to be registered on your server and further configuration will be invalidated.  
`sudo docker network create mysmarthomenet`
Now, instead of having something like:
```yaml
networks:  
  mysmarthomenet:  
    driver: bridge  
```
in your compose.yml \- as in all examples, you’ll have:  
```yaml
networks:  
  mysmarthomenet:  
    external: true
```

## Find Docker Network Id

To find network id that docker uses:  
`sudo docker network ls`  
This will list the networks and you’ll see that id of the network is something like:  
`ebc051595c69 mysmarthomenet`

## Turn on mDNS

By default mDNS was not configured for neither my ethernet nor my docker network. To check run:  
`ifconfig`
You’ll have something like this in the output:  
`br-ebc051595c69: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>`

Note that your network adapter will be that id from the previous step prefixed with br-

If it has MULTICAST there it should be fine. Also check:  
`resolvectl mdns`

If not you need to turn it on:

For mysmarthomenet (bridge interface)  
`sudo resolvectl mdns br-ebc051595c69  yes`

For the actual network card  
`sudo resolvectl mdns enp0s31ab yes`

## Configure mDNS Reflector

Change avahi-daemon.conf:  
`sudo nano /etc/avahi/avahi-daemon.conf`
Add/uncomment/change:
```
enable-reflector=yes  
allow-interfaces=enp0s31ab,br-ebc051595c69   
```
Restart the daemon:  
`sudo systemctl restart avahi-daemon`

## Test

EspHome uses [python-zeroconf](https://github.com/python-zeroconf/python-zeroconf). So to test this:
- get [resolve_address.py](https://github.com/python-zeroconf/python-zeroconf/blob/master/examples/resolve_address.py) 
- copy the file to your ESPHome config directory. If configured like in the file above, that will be /home/myuser/ha/services/esphome/config/test/ (create test directory and copy the file there)
- get onto docker. Open bash in the container:  
`sudo docker exec -it esphome bash`
- then use resove_address.py to resolve address of a known device:  

`root@2a8d97099ee2:/config/test# python resolve_address.py mydevice.local`

If the above worked you should get something like:  

```
DEBUG:asyncio:Using selector: EpollSelector
mydevice.local. IP addresses: [ZeroconfIPv4Address('192.123.45.123')]
```

If not, you'll get:
```
DEBUG:asyncio:Using selector: EpollSelector
Name mydevice.local. not resolved
```

If everything worked EspHome should be able to now check whether the devices are online based on their name, without using ip ping workaround.