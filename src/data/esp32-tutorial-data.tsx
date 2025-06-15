
import type { ReactNode } from 'react';
import type { ArduinoLesson as ESP32Lesson } from '@/types'; // Reusing ArduinoLesson type structure
import { CodeBlock } from '@/components/content/CodeBlock';
import Image from 'next/image';

export const esp32TutorialLessons: ESP32Lesson[] = [
  {
    slug: 'introduction-to-esp32',
    title: '1. Introduction to ESP32',
    description: 'What is ESP32, its features, variants, and setting up the Arduino IDE.',
    mainTitle: 'ESP32: A Powerful Microcontroller for IoT',
    content: (
      <>
        <p className="mb-4 text-lg">
          The ESP32 is a series of low-cost, low-power system on a chip microcontrollers with integrated Wi-Fi and dual-mode Bluetooth. It's a successor to the ESP8266 and has become incredibly popular for IoT projects and applications requiring wireless connectivity.
        </p>
        <h3 className="text-2xl font-semibold mt-6 mb-3">Key Features of ESP32</h3>
        <ul className="list-disc list-inside space-y-2 mb-4">
          <li><strong>Dual-core Processor:</strong> Most ESP32 chips feature a Tensilica Xtensa LX6 microprocessor, running at up to 240 MHz.</li>
          <li><strong>Wi-Fi Connectivity:</strong> Integrated 802.11 b/g/n Wi-Fi.</li>
          <li><strong>Bluetooth:</strong> Supports Classic Bluetooth and Bluetooth Low Energy (BLE).</li>
          <li><strong>Rich Peripherals:</strong> Includes ADCs, DACs, I2C, SPI, UART, CAN, capacitive touch sensors, Hall sensor, Ethernet MAC interface, and more.</li>
          <li><strong>Low Power Modes:</strong> Various sleep modes to conserve battery power.</li>
          <li><strong>Security Features:</strong> Secure Boot, Flash Encryption.</li>
        </ul>
        <h3 className="text-2xl font-semibold mt-6 mb-3">Common ESP32 Variants & Boards</h3>
        <p className="mb-4">
          There are many ESP32 development boards available, popular ones include:
        </p>
        <ul className="list-disc list-inside space-y-1 mb-4">
          <li>ESP32-WROOM-32 based boards (very common, general purpose)</li>
          <li>ESP32-WROVER boards (often include PSRAM)</li>
          <li>Boards with integrated OLED displays, LoRa modules, or camera connectors.</li>
        </ul>
        <div className="my-6 flex justify-center">
          <Image
            src="https://placehold.co/500x300.png"
            alt="Various ESP32 Development Boards"
            data-ai-hint="esp32 development boards"
            width={500}
            height={300}
            className="rounded-lg border shadow-md object-contain bg-white p-2"
          />
        </div>
        <h3 className="text-2xl font-semibold mt-6 mb-3">Setting Up Arduino IDE for ESP32</h3>
        <p className="mb-2">
          To program the ESP32 using the Arduino IDE, you need to add ESP32 board support:
        </p>
        <ol className="list-decimal list-inside space-y-2 mb-4">
          <li>Open Arduino IDE, go to File {'>'} Preferences.</li>
          <li>Enter <code className="bg-muted px-1 rounded text-sm">https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json</code> into the "Additional Board Manager URLs" field. If you have other URLs, separate them with a comma. Click OK.</li>
          <li>Go to Tools {'>'} Board {'>'} Boards Manager...</li>
          <li>Search for "esp32" and install the "esp32 by Espressif Systems" package.</li>
          <li>Once installed, you can select your specific ESP32 board from the Tools {'>'} Board menu (e.g., "ESP32 Dev Module").</li>
        </ol>
        <p>Now you're ready to write and upload your first sketch to the ESP32!</p>
      </>
    ),
  },
  {
    slug: 'esp32-wifi-basics',
    title: '2. ESP32 WiFi Basics',
    description: 'Connecting your ESP32 to a WiFi network and getting an IP address.',
    mainTitle: 'Connecting ESP32 to WiFi',
    content: (
      <>
        <p className="mb-4 text-lg">
          One of the key strengths of the ESP32 is its built-in WiFi capability. This lesson will show you how to connect your ESP32 to a local WiFi network.
        </p>
        <h3 className="text-2xl font-semibold mt-6 mb-3">Include the WiFi Library</h3>
        <p className="mb-4">
          The ESP32 core for Arduino comes with a <code className="bg-muted px-1 rounded">WiFi.h</code> library that makes connecting to WiFi straightforward.
        </p>
        <CodeBlock language="cpp" code={`
#include <WiFi.h>

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

void setup() {
  Serial.begin(115200);
  delay(10); // Allow serial to initialize

  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  int attempts = 0;
  while (WiFi.status() != WL_CONNECTED && attempts < 20) { // Try for 10 seconds
    delay(500);
    Serial.print(".");
    attempts++;
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("");
    Serial.println("WiFi connected!");
    Serial.print("IP address: ");
    Serial.println(WiFi.localIP());
  } else {
    Serial.println("");
    Serial.println("Failed to connect to WiFi.");
  }
}

void loop() {
  // Your main code can go here.
  // For this example, we'll just check connection status periodically.
  if (WiFi.status() == WL_CONNECTED) {
    // Optional: blink an LED or do something to indicate connection
  } else {
    Serial.println("WiFi disconnected. Attempting to reconnect...");
    WiFi.begin(ssid, password); // Try to reconnect
    delay(5000); // Wait 5 seconds before retrying loop
  }
  delay(10000); // Check connection every 10 seconds
}
        `} />
        <h3 className="text-2xl font-semibold mt-6 mb-3">Explanation</h3>
        <ul className="list-disc list-inside space-y-2 mb-4">
          <li>Replace <code className="bg-muted px-1 rounded">"YOUR_WIFI_SSID"</code> and <code className="bg-muted px-1 rounded">"YOUR_WIFI_PASSWORD"</code> with your actual WiFi network name and password.</li>
          <li><code className="bg-muted px-1 rounded">WiFi.begin(ssid, password);</code> initiates the connection.</li>
          <li>The <code className="bg-muted px-1 rounded">while</code> loop waits for the connection to establish, printing dots as it tries. It has a timeout to prevent indefinite blocking.</li>
          <li><code className="bg-muted px-1 rounded">WiFi.status()</code> returns the current connection status. <code className="bg-muted px-1 rounded">WL_CONNECTED</code> means it's connected.</li>
          <li><code className="bg-muted px-1 rounded">WiFi.localIP()</code> gives you the IP address assigned to the ESP32 by your router.</li>
          <li>The <code className="bg-muted px-1 rounded">loop()</code> function includes a basic check and reconnect attempt.</li>
        </ul>
        <p className="mt-4">
          Upload this sketch to your ESP32 and open the Serial Monitor (set to 115200 baud). You should see the connection attempts and, if successful, the IP address of your ESP32.
        </p>
      </>
    ),
  },
];

export function getESP32LessonBySlug(slug: string): ESP32Lesson | undefined {
  return esp32TutorialLessons.find(lesson => lesson.slug === slug);
}
