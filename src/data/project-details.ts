
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
    "This project, based on Vinayakahr10's GitHub repository, guides you through building an ESP32-based weather station using I2C communication for the BME280 sensor (temperature, humidity, pressure) and an SSD1306 OLED display. View real-time environmental data on the compact display.",
  difficulty: 'Intermediate',
  estimatedTime: '3-5 hours',
  tags: ['ESP32', 'Weather Station', 'BME280', 'OLED', 'I2C', 'IoT', 'GitHub Project'],
  componentsNeeded: [
    'ESP32 Development Board',
    'BME280 Sensor Module (I2C)',
    'SSD1306 OLED Display Module (I2C, 128x64)',
    'Breadboard',
    'Jumper Wires',
    'Micro USB Cable',
  ],
  toolsNeeded: [
    'Computer with Arduino IDE installed',
    'Soldering iron and solder (optional, if modules need headers)',
  ],
  circuitDiagramUrl: 'https://placehold.co/600x400.png',
  circuitDiagramHint: 'esp32 bme280 oled i2c wiring diagram',
  codeSections: [
    {
      title: 'ESP32 Arduino Sketch (by Vinayakahr10)',
      language: 'cpp',
      code: `
#include<Wire.h>
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

  // SSD1306_SWITCHCAPVCC = generate display voltage from 3.3V internally
  if(!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) { 
    Serial.println(F("SSD1306 allocation failed"));
    for(;;); // Don't proceed, loop forever
  }
  bool status;
    
    // default settings
    // (you can also pass in a Wire library object like &Wire2)
    status = bme.begin(0x76);  //0x76 is default address of BME280
    if (!status) {
        Serial.println("Could not find a valid BME280 sensor, check wiring!");
        while (1);
    }
  
  display.display();
  delay(2000); // Pause for 2 seconds

  // Clear the buffer
  display.clearDisplay();

}

void loop() { 
  display.clearDisplay();

  display.setTextSize(1);             // Normal 1:1 pixel scale
  display.setTextColor(WHITE);        // Draw white text
  display.setCursor(0,0);             // Start at top-left corner
  display.print(F("Temp: "));
  display.print(bme.readTemperature());
  display.println(F(" C"));

  display.print(F("Humidity: "));
  display.print(bme.readHumidity());
  display.println(F(" %"));

  display.print(F("Pressure: "));
  display.print(bme.readPressure() / 100.0F); // hPa
  display.println(F(" hPa"));
  
  display.display();
  delay(2000);

}
      `,
    },
  ],
  steps: [
    {
      title: '1. Gather Components',
      description:
        'Ensure you have all the listed components: ESP32 board, BME280 sensor, SSD1306 OLED display, breadboard, and jumper wires.',
      imageUrl: 'https://placehold.co/400x250.png',
      imageHint: 'esp32 oled bme280 components',
    },
    {
      title: '2. Install Libraries in Arduino IDE',
      description:
        'Open your Arduino IDE. Go to Sketch > Include Library > Manage Libraries. Search for and install the following: "Adafruit BME280 Library" by Adafruit, "Adafruit GFX Library" by Adafruit, and "Adafruit SSD1306" by Adafruit. Also ensure you have the ESP32 board support installed.',
    },
    {
      title: '3. Wire the Circuit',
      description:
        'Connect the components using I2C. Typically: \n- ESP32 3.3V to BME280 VCC and OLED VCC.\n- ESP32 GND to BME280 GND and OLED GND.\n- ESP32 SDA (usually GPIO21) to BME280 SDA and OLED SDA.\n- ESP32 SCL (usually GPIO22) to BME280 SCL and OLED SCL.\n (Refer to your ESP32 board\'s pinout for exact SDA/SCL pins). Your provided circuit diagram link (https://github.com/Vinayakahr10/ESP32_weather_station_I2C/blob/main/ESP32_Weather_Station_I2C/circuit_diagram.png) should be followed.',
      imageUrl: 'https://placehold.co/400x300.png',
      imageHint: 'wiring esp32 i2c sensors oled',
    },
    {
      title: '4. Upload the Sketch',
      description:
        'Copy the provided Arduino sketch into the Arduino IDE. Select your ESP32 board model and the correct COM port under the "Tools" menu. Click the "Upload" button.',
    },
    {
      title: '5. Observe the Output',
      description:
        'Once uploaded, the ESP32 will start reading data from the BME280 sensor and display the temperature, humidity, and pressure on the OLED screen. The Serial Monitor (baud rate 115200) can be used for debugging if needed.',
      imageUrl: 'https://placehold.co/400x250.png',
      imageHint: 'oled displaying weather data',
    },
  ],
  conclusion:
    'You have successfully replicated the ESP32 I2C Weather Station from Vinayakahr10\'s repository. This project showcases how to integrate multiple I2C devices with an ESP32 and display real-time sensor data. It\'s a great starting point for more complex IoT projects.',
  learnMoreLinks: [
    { text: 'Original GitHub Repository by Vinayakahr10', href: 'https://github.com/Vinayakahr10/ESP32_weather_station_I2C/' },
    { text: 'Adafruit BME280 Library Guide', href: 'https://learn.adafruit.com/adafruit-bme280-humidity-barometric-pressure-temperature-sensor-breakout' },
    { text: 'Adafruit SSD1306 OLED Display Guide', href: 'https://learn.adafruit.com/adafruit-oled-displays-for-arduino/overview' },
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
    
