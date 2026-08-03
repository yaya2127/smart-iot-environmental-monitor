# 🔌 Hardware Circuit Schematic & Proteus Simulation Guide

## System Architecture & Components (Bill of Materials)

| Component | Quantity | Specification / Description | Pin Connection |
| :--- | :---: | :--- | :--- |
| **Microcontroller** | 1 | ATmega328P / Arduino Uno Development Board | Main Controller |
| **Temperature Sensor** | 1 | DHT22 (AM2302) Digital Sensor Module | Data -> Digital Pin 2 |
| **Gas Sensor** | 1 | MQ-2 Air Quality & Smoke Sensor | Analog Out -> Pin A0 |
| **OLED Display** | 1 | 0.96" SSD1306 128x64 I2C Graphic Display | SDA -> A4, SCL -> A5 |
| **Audio Alarm** | 1 | 5V Active Piezoelectric Buzzer | Positive -> Digital Pin 8 |
| **Status LEDs** | 2 | 5mm LEDs (1 Red Alert, 1 Green Safe) | Red -> Pin 9, Green -> Pin 10 |
| **Resistors** | 2 | 220Ω Current Limiting Resistors | In series with LEDs |
| **Power Supply** | 1 | 5V DC Regulator / USB Power Line | VCC / GND Rails |

---

## Circuit Wiring Diagram

```text
               +----------------------------------+
               |        Arduino Uno (ATmega328P)  |
               +----------------------------------+
                                |
       +------------------------+------------------------+
       |                        |                        |
 [ Pin D2 ]               [ Pin A0 ]              [ I2C A4/A5 ]
       |                        |                        |
  (DHT22 Data)             (MQ-2 Gas Out)           (OLED SDA/SCL)
       |                        |                        |
       v                        v                        v
  Temp/Humid              Gas/Smoke Level          Visual Display

       |                        |                        |
 [ Pin D8 ]               [ Pin D9 ]               [ Pin D10 ]
       |                        |                        |
  (Piezo Buzzer)           (Red Alert LED)          (Green Safe LED)
```

---

## Proteus Professional Simulation Steps

1. Launch **Labcenter Proteus Professional 8.x**.
2. Create a new schematic project named `smart_iot_environmental_monitor.pdsprj`.
3. Add the following components from the Proteus library:
   - `ARDUINO UNO R3` (or `ATMEGA328P`)
   - `DHT22`
   - `MQ-2`
   - `SSD1306_I2C`
   - `BUZZER`
   - `LED-RED` & `LED-GREEN`
4. Compile `src/main.cpp` using Arduino IDE or PlatformIO to export `main.ino.hex`.
5. Double-click the Arduino UNO component in Proteus, select the `Program File` field, and locate `main.ino.hex`.
6. Press the **Play** button to execute the real-time circuit simulation.
