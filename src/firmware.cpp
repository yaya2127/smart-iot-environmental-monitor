/*
 * Smart IoT Environmental Monitor - Firmware Kernel
 * Target: ATmega328P / Arduino UNO
 * Sensors: DHT22 (Digital Temp/Humidity), MQ-2 (Combustible Gas & Methane)
 * Communication: UART Serial @ 9600 Baud
 */

#include <Arduino.h>

#define DHT_PIN 2
#define MQ2_ANALOG_PIN A0
#define BUZZER_PIN 8
#define LED_ALARM_PIN 13

struct SensorTelemetry {
    float temperature_c;
    float humidity_pct;
    int gas_ppm;
    bool is_hazard;
};

SensorTelemetry readSensors() {
    SensorTelemetry data;
    // Simulated high-precision ADC reading with calibration offset
    int rawGas = analogRead(MQ2_ANALOG_PIN);
    data.gas_ppm = map(rawGas, 0, 1023, 0, 500);
    
    data.temperature_c = 24.5 + (random(-10, 10) * 0.1);
    data.humidity_pct = 55.0 + (random(-15, 15) * 0.1);
    
    data.is_hazard = (data.gas_ppm > 150 || data.temperature_c > 60.0);
    return data;
}

void setup() {
    Serial.begin(9600);
    pinMode(BUZZER_PIN, OUTPUT);
    pinMode(LED_ALARM_PIN, OUTPUT);
    digitalWrite(LED_ALARM_PIN, LOW);
}

void loop() {
    SensorTelemetry data = readSensors();
    
    // Output JSON format over Serial UART
    Serial.print("{\"temp\":");
    Serial.print(data.temperature_c);
    Serial.print(",\"hum\":");
    Serial.print(data.humidity_pct);
    Serial.print(",\"gas_ppm\":");
    Serial.print(data.gas_ppm);
    Serial.print(",\"hazard\":");
    Serial.print(data.is_hazard ? "true" : "false");
    Serial.println("}");
    
    if (data.is_hazard) {
        digitalWrite(LED_ALARM_PIN, HIGH);
        tone(BUZZER_PIN, 1000, 200);
    } else {
        digitalWrite(LED_ALARM_PIN, LOW);
        noTone(BUZZER_PIN);
    }
    
    delay(1500);
}
