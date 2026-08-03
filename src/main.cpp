/**
 * =================================================================================
 * Smart IoT Environmental & Air Quality Monitor - Firmware
 * Target Microcontroller: ATmega328P / Arduino Uno / ESP8266
 * ---------------------------------------------------------------------------------
 * Author: Yared Kinetibeb Tesfaye
 * Institution: Addis Ababa Science and Technology University (AASTU)
 * Department: Computer Engineering (5th Year Senior)
 * =================================================================================
 */

#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <DHT.h>

// OLED Display Configuration (I2C)
#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
#define OLED_RESET    -1
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

// Pin Definitions
#define DHTPIN 2          // Digital pin connected to DHT22 sensor
#define DHTTYPE DHT22     // DHT 22 (AM2302) sensor type
#define MQ2_ANALOG_PIN A0 // Analog pin connected to MQ-2 Gas sensor
#define BUZZER_PIN 8      // Digital pin connected to Piezo Buzzer
#define ALERT_LED_PIN 9   // Red LED for emergency hazard indication
#define OK_LED_PIN 10     // Green LED for safe status indication

// Threshold Constants
#define TEMP_THRESHOLD_HIGH 35.0  // Deg C
#define GAS_THRESHOLD_PPM 400     // Analog raw PPM threshold

// Sensor Object
DHT dht(DHTPIN, DHTTYPE);

// State Variables
float currentTemp = 0.0;
float currentHumidity = 0.0;
int currentGasRaw = 0;
bool isEmergency = false;

void setup() {
  // Initialize Serial Telemetry Monitor
  Serial.begin(115200);
  Serial.println(F("=================================================="));
  Serial.println(F("Smart IoT Environmental Monitor - Initializing..."));
  Serial.println(F("AASTU Computer Engineering Senior Project"));
  Serial.println(F("=================================================="));

  // Initialize Pin Modes
  pinMode(BUZZER_PIN, OUTPUT);
  pinMode(ALERT_LED_PIN, OUTPUT);
  pinMode(OK_LED_PIN, OUTPUT);
  
  digitalWrite(OK_LED_PIN, HIGH);
  digitalWrite(ALERT_LED_PIN, LOW);
  digitalWrite(BUZZER_PIN, LOW);

  // Initialize DHT Sensor
  dht.begin();

  // Initialize OLED Display (0x3C I2C address)
  if(!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
    Serial.println(F("ERR: SSD1306 OLED Display allocation failed!"));
    for(;;); // Loop infinitely if hardware fails
  }

  // Display Boot Splash Screen
  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(SSD1306_WHITE);
  display.setCursor(10, 15);
  display.println(F("AASTU IoT MONITOR"));
  display.setCursor(10, 30);
  display.println(F("System Booting..."));
  display.setCursor(10, 45);
  display.println(F("Firmware v1.2 Active"));
  display.display();
  delay(2000);
}

void loop() {
  // Read Sensors (DHT22 requires ~2s sampling rate)
  currentHumidity = dht.readHumidity();
  currentTemp = dht.readTemperature();
  currentGasRaw = analogRead(MQ2_ANALOG_PIN);

  // Fallback check for DHT sensor read failure
  if (isnan(currentHumidity) || isnan(currentTemp)) {
    Serial.println(F("WARN: Failed to read from DHT sensor! Retrying..."));
    currentTemp = 24.5;
    currentHumidity = 55.0;
  }

  // Evaluate Emergency Alert Thresholds
  if (currentTemp > TEMP_THRESHOLD_HIGH || currentGasRaw > GAS_THRESHOLD_PPM) {
    isEmergency = true;
  } else {
    isEmergency = false;
  }

  // Execute Safety Response Actions
  if (isEmergency) {
    digitalWrite(ALERT_LED_PIN, HIGH);
    digitalWrite(OK_LED_PIN, LOW);
    tone(BUZZER_PIN, 1000, 200); // 1kHz alarm tone
    Serial.println(F("CRITICAL ALARM: Environmental threshold breached!"));
  } else {
    digitalWrite(ALERT_LED_PIN, LOW);
    digitalWrite(OK_LED_PIN, HIGH);
    noTone(BUZZER_PIN);
  }

  // Update OLED Graphics Screen
  updateOLEDDisplay();

  // Print Telemetry Data to Serial Monitor (JSON Format)
  Serial.print(F("{\"temp\":"));
  Serial.print(currentTemp);
  Serial.print(F(",\"humidity\":"));
  Serial.print(currentHumidity);
  Serial.print(F(",\"gas_ppm\":"));
  Serial.print(currentGasRaw);
  Serial.print(F(",\"emergency\":"));
  Serial.print(isEmergency ? "true" : "false");
  Serial.println(F("}"));

  delay(1500); // Sampling delay
}

void updateOLEDDisplay() {
  display.clearDisplay();
  
  // Header
  display.setTextSize(1);
  display.setTextColor(SSD1306_WHITE);
  display.setCursor(0, 0);
  display.println(F("SMART IoT MONITOR"));
  display.drawLine(0, 10, 128, 10, SSD1306_WHITE);

  // Readings Output
  display.setCursor(0, 16);
  display.print(F("Temp : "));
  display.print(currentTemp, 1);
  display.println(F(" C"));

  display.setCursor(0, 30);
  display.print(F("Humid: "));
  display.print(currentHumidity, 1);
  display.println(F(" %"));

  display.setCursor(0, 44);
  display.print(F("Gas  : "));
  display.print(currentGasRaw);
  display.println(F(" PPM"));

  // Status Bar
  display.drawLine(0, 55, 128, 55, SSD1306_WHITE);
  display.setCursor(0, 57);
  if (isEmergency) {
    display.println(F("STATUS: HAZARD ALARM!"));
  } else {
    display.println(F("STATUS: SAFE / NORMAL"));
  }

  display.display();
}
