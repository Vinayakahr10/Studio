
import type { LucideIcon } from 'lucide-react';

export interface ProjectStep {
  title: string;
  description: string;
  imageUrl?: string;
  imageHint?: string;
}

export interface CodeSection {
  title: string;
  language: string;
  code: string;
}

export interface ProjectDetail {
  id: string;
  title: string;
  mainImageUrl: string;
  mainImageHint?: string;
  introduction: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime?: string;
  tags?: string[];
  componentsNeeded?: string[];
  toolsNeeded?: string[];
  circuitDiagramUrl?: string;
  circuitDiagramHint?: string;
  codeSections?: CodeSection[];
  steps: ProjectStep[];
  conclusion: string;
  learnMoreLinks?: Array<{ text: string; href: string }>;
}

const esp32WeatherStationDetail: ProjectDetail = {
  id: 'esp32-weather-station',
  title: 'ESP32 Based Weather Station',
  mainImageUrl: 'https://placehold.co/800x450.png',
  mainImageHint: 'esp32 weather station setup',
  introduction:
    'This project guides you through building a comprehensive weather station using an ESP32 microcontroller. You will learn to interface various sensors to monitor environmental conditions like temperature, humidity, and barometric pressure. The data can be displayed locally on an OLED screen or sent to an online platform for remote monitoring.',
  difficulty: 'Intermediate',
  estimatedTime: '4-6 hours',
  tags: ['ESP32', 'Weather Station', 'BME280', 'IoT', 'Sensors', 'Arduino IDE'],
  componentsNeeded: [
    'ESP32 Development Board (e.g., ESP32-WROOM-32)',
    'BME280 Sensor (measures temperature, humidity, pressure)',
    'SSD1306 OLED Display (0.96 inch, I2C)',
    'Breadboard',
    'Jumper Wires (male-to-male, male-to-female)',
    'Micro USB Cable for programming and power',
  ],
  toolsNeeded: [
    'Computer with Arduino IDE installed',
    'Soldering iron and solder (optional, if components are not breadboard-friendly)',
  ],
  circuitDiagramUrl: 'https://placehold.co/600x400.png',
  circuitDiagramHint: 'esp32 bme280 oled circuit',
  codeSections: [
    {
      title: 'Arduino Sketch (ESP32)',
      language: 'cpp',
      code: `
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BME280.h>

#define SCREEN_WIDTH 128 // OLED display width, in pixels
#define SCREEN_HEIGHT 64 // OLED display height, in pixels

// Declaration for an SSD1306 display connected to I2C (SDA, SCL pins)
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1);
Adafruit_BME280 bme; // I2C

void setup() {
  Serial.begin(115200);

  if (!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) { // Address 0x3C for 128x64
    Serial.println(F("SSD1306 allocation failed"));
    for (;;);
  }

  if (!bme.begin(0x76)) { // BME280 I2C address, common is 0x76 or 0x77
    Serial.println("Could not find a valid BME280 sensor, check wiring!");
    while (1);
  }

  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(SSD1306_WHITE);
  display.setCursor(0,0);
  display.println("Weather Station");
  display.display();
  delay(2000);
}

void loop() {
  display.clearDisplay();
  display.setCursor(0,0);

  display.print("Temp: ");
  display.print(bme.readTemperature());
  display.println(" *C");

  display.print("Humidity: ");
  display.print(bme.readHumidity());
  display.println(" %");

  display.print("Pressure: ");
  display.print(bme.readPressure() / 100.0F); // hPa
  display.println(" hPa");
  
  // You can add more data or formatting here

  display.display();
  delay(5000); // Update every 5 seconds
}
      `,
    },
  ],
  steps: [
    {
      title: '1. Gather Your Components',
      description:
        'Collect all the components listed above. Ensure your ESP32 board is working and you can upload a simple Blink sketch to it via the Arduino IDE.',
      imageUrl: 'https://placehold.co/400x250.png',
      imageHint: 'esp32 components bme280 oled',
    },
    {
      title: '2. Install Necessary Libraries',
      description:
        'Open the Arduino IDE. Go to Sketch > Include Library > Manage Libraries. Install "Adafruit BME280 Library", "Adafruit Unified Sensor", "Adafruit GFX Library", and "Adafruit SSD1306".',
    },
    {
      title: '3. Connect the Circuit',
      description:
        'Follow the circuit diagram. Generally:\n- BME280 VCC to ESP32 3.3V\n- BME280 GND to ESP32 GND\n- BME280 SCL to ESP32 SCL (GPIO22 for many boards)\n- BME280 SDA to ESP32 SDA (GPIO21 for many boards)\n- OLED VCC to ESP32 3.3V\n- OLED GND to ESP32 GND\n- OLED SCL to ESP32 SCL (GPIO22)\n- OLED SDA to ESP32 SDA (GPIO21)',
      imageUrl: 'https://placehold.co/400x300.png',
      imageHint: 'breadboard wiring esp32 sensors',
    },
    {
      title: '4. Upload the Code',
      description:
        'Copy the provided Arduino sketch into your Arduino IDE. Select the correct ESP32 board from Tools > Board and the correct COM port. Then, click Upload.',
    },
    {
      title: '5. Test Your Weather Station',
      description:
        'Once the code is uploaded, the OLED display should initialize and start showing temperature, humidity, and pressure readings. You can also open the Serial Monitor (baud rate 115200) to see debug messages.',
      imageUrl: 'https://placehold.co/400x250.png',
      imageHint: 'oled display weather data',
    },
  ],
  conclusion:
    'Congratulations! You have successfully built an ESP32-based weather station. This project forms a great base for more advanced IoT applications, such as logging data to a cloud service, creating a web dashboard, or adding more sensors like wind speed or rain gauges.',
  learnMoreLinks: [
    { text: 'Adafruit BME280 Library Documentation', href: 'https://github.com/adafruit/Adafruit_BME280_Library' },
    { text: 'ESP32 Pinout Reference', href: 'https://randomnerdtutorials.com/esp32-pinout-reference-gpios/' },
  ],
};

// A map to hold all project details, keyed by project ID
export const allProjectDetails: Record<string, ProjectDetail> = {
  'esp32-weather-station': esp32WeatherStationDetail,
  // You can add details for other projects here, for example:
  // 'arduino-weather-station': { ... details for arduino weather station ... },
  // 'pi-home-automation': { ... details for pi home automation ... },
  // 'iot-plant-monitor': { ... details for iot plant monitor ... },
};

// Helper function to get a project by ID
export function getProjectById(id: string): ProjectDetail | undefined {
  return allProjectDetails[id];
}

    