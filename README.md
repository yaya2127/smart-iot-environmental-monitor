# 🌡️ Smart IoT Environmental & Air Quality Monitor

![IoT Hardware Shield](https://img.shields.io/badge/Microcontroller-ATmega328P%20%7C%20Arduino-dfa951?style=for-the-badge)
![Languages](https://img.shields.io/badge/Languages-C%2B%2B%20%7C%20Embedded%20C%20%7C%20JS-blue?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

An embedded hardware-software system engineered for real-time environmental sensing, toxic gas leakage detection, OLED graphic status output, and automated emergency alarm triggers.

---

## ✨ System Features & Capabilities

- 🌡️ **High-Precision Temperature & Humidity Sensing**: Interfaced with DHT22 digital sensor module via bare-metal microcontroller timing.
- 💨 **Gas & Smoke Hazard Detection**: Continuous analog sampling of MQ-2 sensor for methane, LPG, and smoke concentration levels in PPM.
- 🖥️ **Graphic OLED Display Output**: 0.96" SSD1306 128x64 pixel I2C graphic screen displaying live environmental parameters and system safety status.
- 🚨 **Automated Alarm & Safety Relays**: Active 1kHz piezo buzzer audio alert and dual LED status indicators (Red Hazard / Green Safe).
- 🌐 **Web Telemetry Dashboard**: Interactive web interface displaying live metric gauges, threshold progress bars, and real-time event logging.

---

## 🛠️ Hardware & Software Stack

- **Firmware**: Embedded C++ (Arduino IDE / PlatformIO)
- **Microcontroller**: ATmega328P / Arduino Uno R3
- **Simulation**: Labcenter Proteus Professional 8.x
- **Web Telemetry**: HTML5, Vanilla CSS3, ES6 JavaScript

---

## 📂 Project Repository Structure

```text
smart-iot-environmental-monitor/
├── src/
│   └── main.cpp                  # C++ Microcontroller Firmware Source Code
├── simulation/
│   └── schematic_circuit_info.md # Bill of Materials (BOM) & Proteus Setup Guide
├── web/
│   ├── index.html                # Web Telemetry Dashboard Layout
│   ├── style.css                 # Dark Glassmorphic Dashboard Styles
│   └── app.js                    # Live Metric Stream & Hazard Simulator
└── README.md                     # Hardware Documentation
```

---

## 👤 Author

Developed by **Yared Kinetibeb Tesfaye**
- **Role**: 5th-Year Computer Engineering Senior Student at AASTU
- **GitHub**: [@yaya2127](https://github.com/yaya2127)
- **LinkedIn**: [Yared Kinetibeb](https://www.linkedin.com/in/yared-kinetibeb-3b788b350/)
- **Email**: kinetibebyared@gmail.com


## Hardware Pinout & Simulation
- ATmega328P Pin 13 -> Alarm Indicator LED
- ATmega328P Pin 08 -> Active Buzzer
- ATmega328P Analog A0 -> MQ-2 Gas Sensor
- ATmega328P Digital D2 -> DHT22 Temp/Humidity Sensor


## Firmware Sampling Loop
- ATmega328P C++ telemetry loop
