// Include the SPI (Serial Peripheral Interface) library for communication with the RFID reader
#include <SPI.h>
#include <MFRC522.h>
#include <Wire.h>
#include <Adafruit_SSD1306.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include "config.h"  // Contains WiFi & Firebase URLs

#define SS_PIN    5
#define RST_PIN   22
#define GREEN_LED 27
#define RED_LED   26
#define BUZZER    25
#define ENROLL_BTN 13

#define OLED_RESET -1
Adafruit_SSD1306 display(128, 64, &Wire, OLED_RESET);

MFRC522 rfid(SS_PIN, RST_PIN);
WiFiClient client;

void setup() {
  Serial.begin(115200);

  pinMode(GREEN_LED, OUTPUT);
  pinMode(RED_LED, OUTPUT);
  pinMode(BUZZER, OUTPUT);
  pinMode(ENROLL_BTN, INPUT_PULLUP);

  SPI.begin();
  rfid.PCD_Init();

  Wire.begin(21, 22);
  display.begin(SSD1306_SWITCHCAPVCC, 0x3C);
  display.clearDisplay();
  display.display();

  connectWiFi();
  showMessage("Ready to Scan");
}

void loop() {
  if (!rfid.PICC_IsNewCardPresent() || !rfid.PICC_ReadCardSerial()) return;

  String uid = getUID();
  Serial.println("Scanned UID: " + uid);

  if (WiFi.status() == WL_CONNECTED) {
    if (sendToFirestore(uid)) {
      feedback(true);
      showMessage("Access Granted\nUID: " + uid);
    } else {
      feedback(false);
      showMessage("Error logging data");
    }
  } else {
    connectWiFi();
  }

  delay(3000);
  showMessage("Ready to Scan");
  rfid.PICC_HaltA();
  rfid.PCD_StopCrypto1();
}

String getUID() {
  String uid = "";
  for (byte i = 0; i < rfid.uid.size; i++) {
    uid += String(rfid.uid.uidByte[i], HEX);
  }
  uid.toUpperCase();
  return uid;
}

bool sendToFirestore(String uid) {
  HTTPClient http;
  String url = FIREBASE_URL + "?uid=" + uid + "&timestamp=" + String(millis());
  http.begin(url);
  int status = http.GET();
  http.end();
  return status == 200 || status == 201;
}

void feedback(bool success) {
  digitalWrite(GREEN_LED, success);
  digitalWrite(RED_LED, !success);
  tone(BUZZER, success ? 1000 : 500, 200);
  delay(300);
  digitalWrite(GREEN_LED, LOW);
  digitalWrite(RED_LED, LOW);
}

void connectWiFi() {
  display.clearDisplay();
  display.setCursor(0, 0);
  display.println("Connecting WiFi...");
  display.display();

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("\nConnected to WiFi!");
  display.clearDisplay();
  display.setCursor(0, 0);
  display.println("WiFi Connected");
  display.display();
  delay(1000);
}

void showMessage(String msg) {
  display.clearDisplay();
  display.setCursor(0, 0);
  display.setTextSize(1);
  display.setTextColor(WHITE);
  display.println(msg);
  display.display();
}
/*
 * 
 * So basically, this is an RFID attendance system I built using an ESP32. 
 * When someone taps their card, it reads their ID and sends it to Firebase.
 * Pretty straightforward, right?
 * 
 * Here's what each part does:
 * 
 * getUID() - This function reads the RFID card and gets its unique ID. 
 * I made it convert everything to uppercase just to keep things consistent.
 * 
 * sendToFirestore() - This is where the magic happens! It takes the card ID 
 * and sends it to Firebase along with a timestamp. Returns true if everything 
 * went smoothly.
 * 
 * feedback() - Gives users a nice visual and sound feedback. Green light + 
 * happy beep for success, red light + sad beep for failure. Makes it more 
 * user-friendly!
 * 
 * connectWiFi() - Handles the WiFi connection. Shows a loading message on 
 * the display while it's connecting. Uses the WiFi details from config.h.
 * 
 * showMessage() - Just a helper function I made to make displaying messages 
 * on the OLED screen easier. Saves me from writing the same code over and over.
 * 
 * To use it:
 * 1. Turn it on
 * 2. It'll connect to WiFi automatically
 * 3. Tap your card
 * 4. It'll send the data and give you feedback
 * 
 * I used these libraries:
 * - ESP32 board support
 * - MFRC522 for the RFID reader
 * - Adafruit SSD1306 for the display
 * - WiFi and HTTPClient for the internet stuff
 * 
 */

