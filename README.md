<<<<<<< HEAD
# RFID Attendance System

A complete RFID-based attendance system with ESP32 hardware and a React web dashboard.

## Project Structure

```
rfid-attendance-system/
├── embedded-firmware/     # ESP32 firmware code
│   ├── src/
│   │   ├── rfid_attendance_device.ino
│   │   └── config.h
│   └── circuit_design.txt
│
└── attend-nexus-portal/   # Web dashboard
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   └── lib/
    └── public/
```

## Hardware Requirements

- ESP32 Development Board
- MFRC522 RFID Reader Module
- 0.96" OLED Display (SSD1306)
- Green and Red LEDs
- Buzzer
- Push Button
- Resistors (220Ω, 10kΩ)
- Jumper Wires
- Breadboard (optional)

## Software Requirements

### For ESP32 Firmware
- Arduino IDE
- ESP32 Board Support Package
- Required Libraries:
  - MFRC522
  - Adafruit SSD1306
  - WiFi
  - HTTPClient

### For Web Dashboard
- Node.js (v14 or higher)
- npm or yarn
- Required Dependencies:
  - React
  - TypeScript
  - Tailwind CSS
  - Firebase

## Setup Instructions

### 1. Hardware Setup
1. Connect components according to `circuit_design.txt`
2. Double-check all connections
3. Power on the ESP32

### 2. Firmware Setup
1. Open `rfid_attendance_device.ino` in Arduino IDE
2. Install required libraries
3. Update `config.h` with your WiFi and Firebase credentials
4. Upload the code to ESP32

### 3. Web Dashboard Setup
1. Navigate to `attend-nexus-portal` directory
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env` file with Firebase configuration
4. Start development server:
   ```bash
   npm run dev
   ```

## Features

### Hardware Features
- RFID card reading
- Real-time display feedback
- Visual and audio indicators
- WiFi connectivity
- OLED display status

### Web Dashboard Features
- Real-time attendance monitoring
- User management
- Attendance logs
- Statistics and analytics
- Responsive design

## Firebase Integration

The system uses Firebase Realtime Database for:
- Storing attendance records
- Real-time data synchronization
- User authentication
- Data analytics

## Security Considerations

1. All components operate at 3.3V
2. Use current limiting resistors
3. Proper grounding required
4. Keep away from water/moisture
5. Regular maintenance recommended

## Troubleshooting

### Common Issues
1. RFID Reader not working
   - Check SPI connections
   - Verify power supply
   - Check MISO/MOSI connections

2. OLED Display issues
   - Verify I2C connections
   - Check power supply
   - Ensure correct I2C address

3. WiFi Connection problems
   - Check WiFi credentials
   - Verify signal strength
   - Check power supply

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- ESP32 Arduino Core
- MFRC522 Library
- Adafruit SSD1306 Library
- React and Firebase communities

## Contact

For support or queries, please open an issue in the repository.
=======
# RFID-Attendance-System
>>>>>>> 4745e83e4b9385ba4b00985a164b4253a5243f8e
