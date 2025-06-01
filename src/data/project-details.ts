
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

const project555PwmGenerator: ProjectDetail = {
  id: 'project-555-pwm-generator',
  title: 'Build a 555 Timer PWM Generator',
  mainImageUrl: 'https://placehold.co/800x450.png',
  mainImageHint: '555 timer pwm circuit breadboard',
  introduction:
    'Learn how to build a Pulse Width Modulation (PWM) generator using the versatile 555 Timer IC. This project will guide you through constructing a circuit that allows you to control the duty cycle of an output signal, perfect for applications like dimming an LED or controlling the speed of a small DC motor without a microcontroller.',
  difficulty: 'Beginner',
  estimatedTime: '1-2 hours',
  tags: ['555 Timer', 'PWM', 'Analog Electronics', 'LED Dimmer', 'Motor Control'],
  componentsNeeded: [
    '555 Timer IC (e.g., NE555, LM555)',
    'Resistors: 1 kΩ (x2), 10 kΩ Potentiometer',
    'Capacitors: 0.1 µF (100nF) (x1 for decoupling), 0.01 µF (10nF) (x1 for timing)',
    'LED (any color)',
    'Current-limiting resistor for LED (e.g., 220 Ω - 470 Ω)',
    'Breadboard',
    'Jumper Wires',
    'Power Supply (5V to 15V, e.g., 9V battery with snap connector)',
  ],
  toolsNeeded: [
    'Breadboard and jumper wires (for assembly)',
    'Multimeter (optional, for testing voltages)',
    'Oscilloscope (optional, to view the PWM waveform)',
  ],
  circuitDiagramUrl: 'https://placehold.co/600x400.png',
  circuitDiagramHint: '555 timer pwm generator circuit',
  steps: [
    {
      title: '1. Understand the 555 Timer Pinout',
      description:
        'Familiarize yourself with the 8 pins of the 555 Timer IC: GND (1), TRIG (2), OUT (3), RESET (4), CTRL (Control Voltage - 5), THRES (Threshold - 6), DISCH (Discharge - 7), VCC (8).',
      imageUrl: 'https://placehold.co/400x250.png',
      imageHint: '555 timer pinout diagram',
    },
    {
      title: '2. Assemble the Core Astable Circuit',
      description:
        'Start by building a basic astable multivibrator. Connect Pin 4 (RESET) and Pin 8 (VCC) to the positive supply. Connect Pin 1 (GND) to ground. Connect a 0.01µF capacitor from Pin 5 (CTRL) to ground (this helps stabilize the control voltage, though for basic PWM it can sometimes be omitted or used as the control input).',
    },
    {
      title: '3. Configure for PWM Output',
      description:
        'To achieve PWM, the charging and discharging paths of the timing capacitor are controlled differently. Typically, Pin 7 (DISCH) and Pin 6 (THRES) are connected together. The timing capacitor (e.g., 0.1µF) connects from Pin 6/2 to ground. A fixed resistor (R1, e.g., 1kΩ) connects from VCC to Pin 7. Then, connect two diodes and a potentiometer (e.g., 10kΩ) to control the charge and discharge paths independently. One diode points from Pin 7 to one end of the potentiometer, and the other diode points from the wiper of the potentiometer to Pin 7. The other end of the pot goes to Pin 6/2. This setup allows the pot to vary the ratio of charge time to discharge time.',
      imageUrl: 'https://placehold.co/500x350.png',
      imageHint: '555 timer pwm components wiring',
    },
    {
      title: 'Alternative: PWM via Control Voltage Pin 5',
      description: 'A simpler way to achieve PWM (often used for external control) is to set up a standard astable circuit and then apply a variable DC voltage to Pin 5 (Control Voltage). This voltage, typically varying between 1/3 VCC and 2/3 VCC, will directly alter the threshold and trigger levels, thus modulating the pulse width. For this project, we will focus on the diode/potentiometer method for direct manual control.',
    },
    {
      title: '4. Connect the LED Output',
      description:
        'Connect an LED in series with a current-limiting resistor (e.g., 330Ω) from Pin 3 (OUT) to ground. Ensure the LED is oriented correctly (long leg/anode to Pin 3, short leg/cathode to the resistor then ground).',
    },
    {
      title: '5. Power Up and Test',
      description:
        'Connect your power supply (5-15V). Adjust the potentiometer. You should see the brightness of the LED change as you turn the potentiometer knob. This demonstrates the varying duty cycle of the PWM signal.',
      imageUrl: 'https://placehold.co/400x300.png',
      imageHint: 'led dimming 555 timer pwm',
    },
    {
      title: '6. Observe with an Oscilloscope (Optional)',
      description:
        'If you have an oscilloscope, connect its probe to Pin 3 (OUT) and ground. You will be able to see the square wave and how its duty cycle changes as you adjust the potentiometer.',
      imageUrl: 'https://placehold.co/500x300.png',
      imageHint: 'oscilloscope pwm waveform 555',
    },
  ],
  conclusion:
    'You have successfully built a 555 Timer PWM generator! This circuit is a fundamental building block in analog electronics and can be used to control LED brightness, motor speeds, or as a basis for more complex signal generation. Experiment with different resistor and capacitor values to change the frequency and range of PWM control.',
  learnMoreLinks: [
    { text: '555 Timer IC Datasheet (e.g., NE555)', href: '#' },
    { text: 'Understanding PWM in Depth', href: '#' },
  ],
};

const esp32WeatherStationVinayakahr10: ProjectDetail = {
  id: 'esp32-weather-station-vinayakahr10',
  title: 'ESP32 I2C Weather Station (GitHub: Vinayakahr10)',
  mainImageUrl: 'https://placehold.co/800x450.png',
  mainImageHint: 'esp32 weather station custom',
  introduction:
    "This project, based on Vinayakahr10's GitHub repository, guides you through building an ESP32-based weather station using I2C communication for the BME280 sensor (temperature, humidity, pressure) and an SSD1306 OLED display. View real-time environmental data on the compact display. This version now incorporates WiFi connectivity to fetch weather data from OpenWeatherMap API and display time from an NTP server.",
  difficulty: 'Intermediate',
  estimatedTime: '4-6 hours',
  tags: ['ESP32', 'Weather Station', 'BME280', 'OLED', 'I2C', 'IoT', 'WiFi', 'API', 'NTP', 'GitHub Project'],
  componentsNeeded: [
    'ESP32 Development Board',
    'BME280 Sensor Module (I2C)', // This might be redundant if OpenWeatherMap is the primary source. Or can be used for local vs API comparison.
    'LiquidCrystal_I2C LCD Display (20x4 or 16x2, ensure address is 0x27 or adjust code)',
    'Breadboard',
    'Jumper Wires',
    'Micro USB Cable',
    'Access to WiFi Network',
    'OpenWeatherMap API Key',
  ],
  toolsNeeded: [
    'Computer with Arduino IDE installed',
    'Soldering iron and solder (optional, if modules need headers)',
  ],
  circuitDiagramUrl: 'https://placehold.co/600x400.png', // Update if the GitHub link provides a specific one for LCD
  circuitDiagramHint: 'esp32 lcd i2c weather station wiring',
  codeSections: [
    {
      title: 'ESP32 Arduino Sketch (WiFi & API Version)',
      language: 'cpp',
      code: `
#include <WiFi.h>
#include <HTTPClient.h>
#include <LiquidCrystal_I2C.h>
#include <ArduinoJson.h>
#include <NTPClient.h>
#include <WiFiUdp.h>

LiquidCrystal_I2C lcd(0x27, 20, 4);

const char *ssid = "YOUR_SSID";
const char *password = "YOUR_PASSWORD";

#define offset 19800

String URL = "http://api.openweathermap.org/data/2.5/weather?";
String ApiKey = "PUT_YOUR_API_KEY_HERE";

// PUT_YOUR_LOCATION_CREDENTIALS
String lat = "YOUR_LATITUDE";
String lon = "YOUR_LONGITUDE";

const int ledPin = 2; // Built-in LED on many ESP32 boards

// Initialize WiFi and NTP
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "asia.pool.ntp.org", offset);

void setup()
{
    Serial.begin(115200);

    lcd.init();
    lcd.backlight();

    pinMode(ledPin, OUTPUT);

    lcd.setCursor(0, 0);
    lcd.print("Connecting to WiFi");
    Serial.print("Connecting to WiFi");
    WiFi.begin(ssid, password);

    int attempts = 0;
    while (WiFi.status() != WL_CONNECTED && attempts < 20) // Max 10 seconds
    {
        delay(500);
        Serial.print(".");
        lcd.print(".");
        attempts++;
    }

    if(WiFi.status() == WL_CONNECTED) {
      Serial.println("");
      Serial.println("WiFi connected.");
      Serial.println("IP address: ");
      Serial.println(WiFi.localIP());

      lcd.clear();
      lcd.setCursor(0, 1);
      lcd.print("WiFi Connected!");
      lcd.setCursor(0, 2);
      lcd.print(WiFi.localIP());
    } else {
      Serial.println("");
      Serial.println("WiFi connection failed.");
      lcd.clear();
      lcd.setCursor(0, 1);
      lcd.print("WiFi Failed!");
      // You might want to handle this case, e.g., by not proceeding or showing an error
    }
    
    delay(2000);

    timeClient.begin();

    lcd.clear();
    lcd.setCursor(1, 0); // Centered approx
    lcd.print("WEATHER STATION");
    lcd.setCursor(4, 1); // Centered approx
    lcd.print("SRINGERI, IN"); // Example location
    delay(2000);
}

void loop()
{
    lcd.noCursor();
    lcd.noBlink();
    
    if (WiFi.status() == WL_CONNECTED)
    {
        digitalWrite(ledPin, HIGH); // Indicate WiFi is connected

        timeClient.update();
        time_t epochTime = timeClient.getEpochTime();
        struct tm *ptm = gmtime((time_t *)&epochTime);
        String formattedTime = timeClient.getFormattedTime();

        // Display date and time
        int monthDay = ptm->tm_mday;
        int currentMonth = ptm->tm_mon + 1;
        int currentYear = ptm->tm_year + 1900;
        String currentDate = String(monthDay) + "/" + String(currentMonth) + "/" + String(currentYear);

        // Determine day of the week
        String weekDays[7] = {"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"};
        String dayName = weekDays[ptm->tm_wday];

        // Determine AM/PM
        int hours = ptm->tm_hour;
        String ampm = (hours >= 12) ? "PM" : "AM";
        if (hours > 12)
        {
            hours -= 12;
        }
        else if (hours == 0)
        {
            hours = 12;
        }
        String displayTime = String(hours) + formattedTime.substring(2,5); // HH:MM format

        HTTPClient http;
        String serverPath = URL + "lat=" + lat + "&lon=" + lon + "&units=metric&appid=" + ApiKey;
        http.begin(serverPath.c_str());

        int httpCode = http.GET();

        if (httpCode == HTTP_CODE_OK)
        {
            String JSON_Data = http.getString();
            Serial.println(JSON_Data);

            DynamicJsonDocument doc(2048); // Adjust size if needed
            DeserializationError error = deserializeJson(doc, JSON_Data);

            if (error) {
              Serial.print(F("deserializeJson() failed: "));
              Serial.println(error.f_str());
              lcd.clear();
              lcd.setCursor(0,0);
              lcd.print("JSON Error");
              delay(2000);
              http.end();
              return;
            }

            JsonObject obj = doc.as<JsonObject>();

            const char *description = obj["weather"][0]["description"];
            const float temp = obj["main"]["temp"];
            const int humidity = obj["main"]["humidity"];

            lcd.clear();
            // Line 0: Date and Day
            lcd.setCursor(0, 0);
            lcd.print(currentDate);
            lcd.setCursor(13, 0); // Adjusted for 20x4
            lcd.print(dayName);

            // Line 1: Time
            lcd.setCursor(0, 1);
            lcd.print(displayTime);
            lcd.setCursor(7, 1); // Adjusted for 20x4
            lcd.print(ampm);
            
            // Line 2: Weather Description
            lcd.setCursor(0, 2);
            String weatherDesc = String(description);
            weatherDesc.toUpperCase(); // Make it uppercase
             // Simple scrolling for long descriptions
            if (weatherDesc.length() > 20) {
                static int scrollIndex = 0;
                String sub = weatherDesc.substring(scrollIndex);
                if (sub.length() < 20) {
                    sub += " " + weatherDesc.substring(0, 20 - sub.length() -1 );
                }
                lcd.print(sub.substring(0,20));
                scrollIndex++;
                if (scrollIndex >= weatherDesc.length()) scrollIndex = 0;
            } else {
                 lcd.print(weatherDesc);
            }


            // Line 3: Temp and Humidity
            lcd.setCursor(0, 3);
            lcd.print("T:");
            lcd.print(temp, 1); // Temp with 1 decimal place
            lcd.write((byte)0xDF); // Degree symbol
            lcd.print("C ");
            lcd.print("H:");
            lcd.print(humidity);
            lcd.print("%");
        }
        else
        {
            Serial.print("HTTP Error code: ");
            Serial.println(httpCode);
            lcd.clear();
            lcd.setCursor(0,0);
            lcd.print("API Error: ");
            lcd.print(httpCode);
        }
        http.end();
    } else {
        digitalWrite(ledPin, LOW); // Indicate WiFi is not connected
        lcd.clear();
        lcd.setCursor(0,1);
        lcd.print("WiFi Disconnected!");
        // Attempt to reconnect
        WiFi.begin(ssid, password);
        int reconnAttempts = 0;
        while(WiFi.status() != WL_CONNECTED && reconnAttempts < 5) {
            delay(500);
            Serial.print("*");
            reconnAttempts++;
        }
        if(WiFi.status() == WL_CONNECTED) Serial.println("\nReconnected to WiFi.");
        else Serial.println("\nFailed to reconnect WiFi.");
    }
    delay(10000); // Update every 10 seconds
}
      `,
    },
  ],
  steps: [
    {
      title: '1. Gather Components & API Key',
      description:
        'Ensure you have all listed components, including the ESP32, LiquidCrystal_I2C LCD, and breadboard. Crucially, sign up for a free API key at OpenWeatherMap.',
      imageUrl: 'https://placehold.co/400x250.png',
      imageHint: 'esp32 lcd components api',
    },
    {
      title: '2. Install Libraries in Arduino IDE',
      description:
        'Open Arduino IDE. Via Library Manager, install: "LiquidCrystal_I2C" by Frank de Brabander, "ArduinoJson" by Benoit Blanchon, "NTPClient" by Fabrice Weinberg. Ensure ESP32 board support is installed.',
    },
    {
      title: '3. Update Code with Credentials',
      description:
        'In the Arduino sketch: \n- Replace "YOUR_SSID" and "YOUR_PASSWORD" with your WiFi credentials.\n- Replace "PUT_YOUR_API_KEY_HERE" with your OpenWeatherMap API key.\n- Replace "YOUR_LATITUDE" and "YOUR_LONGITUDE" with your location coordinates (you can find these on Google Maps). \n- Adjust the LCD address if `0x27` is not correct for your module (common alternatives are `0x3F`). Use an I2C scanner sketch to find the address if unsure.',
    },
    {
      title: '4. Wire the Circuit',
      description:
        'Connect the components: \n- ESP32 3.3V to LCD VCC.\n- ESP32 GND to LCD GND.\n- ESP32 SDA (usually GPIO21) to LCD SDA.\n- ESP32 SCL (usually GPIO22) to LCD SCL.\n (Refer to your ESP32 board\'s pinout for exact SDA/SCL pins and check your LCD module documentation).',
      imageUrl: 'https://placehold.co/400x300.png',
      imageHint: 'wiring esp32 i2c lcd display',
    },
    {
      title: '5. Upload the Sketch & Observe',
      description:
        'Select your ESP32 board model and COM port in Arduino IDE. Upload the sketch. The ESP32 will connect to WiFi, fetch time and weather data, and display it on the LCD. The built-in LED (GPIO2) will light up if WiFi is connected. Check Serial Monitor (115200 baud) for logs.',
      imageUrl: 'https://placehold.co/400x250.png',
      imageHint: 'lcd displaying time weather data',
    },
  ],
  conclusion:
    'You\'ve built an advanced ESP32 Weather Station that connects to the internet to display real-time weather and time! This project demonstrates API integration, NTP time synchronization, and data display on an I2C LCD, opening doors for many more connected projects.',
  learnMoreLinks: [
    { text: 'Original GitHub Repository by Vinayakahr10 (for the base concept)', href: 'https://github.com/Vinayakahr10/ESP32_weather_station_I2C/' },
    { text: 'OpenWeatherMap API Documentation', href: 'https://openweathermap.org/api' },
    { text: 'ArduinoJson Assistant (for calculating buffer size)', href: 'https://arduinojson.org/v6/assistant/' },
  ],
};


// A map to hold all project details, keyed by project ID
export const allProjectDetails: Record<string, ProjectDetail> = {
  'esp32-weather-station': esp32WeatherStationDetail,
  'project-555-pwm-generator': project555PwmGenerator,
  'esp32-weather-station-vinayakahr10': esp32WeatherStationVinayakahr10,
  // You can add details for other projects here, for example:
  // 'arduino-weather-station': { ... details for arduino weather station ... },
  // 'pi-home-automation': { ... details for pi home automation ... },
  // 'iot-plant-monitor': { ... details for iot plant monitor ... },
};

// Helper function to get a project by ID
export function getProjectById(id: string): ProjectDetail | undefined {
  return allProjectDetails[id];
}
    
