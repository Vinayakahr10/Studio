
import type { ReactNode } from 'react';
import { CodeBlock } from '@/components/content/CodeBlock'; // Assuming CodeBlock might be moved or created

export interface ArduinoLesson {
  slug: string;
  title: string;
  description: string; // For sidebar and meta
  mainTitle?: string; // Optional override for the H1 on the lesson page
  content: ReactNode;
}

export const arduinoTutorialLessons: ArduinoLesson[] = [
  {
    slug: 'introduction',
    title: 'Introduction to Arduino',
    description: 'What is Arduino and why use it?',
    mainTitle: 'Arduino: An Introduction',
    content: (
      <>
        <p className="mb-4 text-lg">
          Welcome to the world of Arduino! Arduino is an open-source electronics platform based on easy-to-use hardware and software. It's intended for anyone making interactive projects.
        </p>
        <h3 className="text-2xl font-semibold mt-6 mb-3">What is Arduino?</h3>
        <p className="mb-4">
          At its core, an Arduino consists of a microcontroller (like a tiny computer) on a circuit board, along with input/output (I/O) pins that allow you to connect sensors, motors, lights, and other electronic components. You can program the microcontroller to read inputs (like light from a sensor, or a finger on a button) and turn it into an output – activating a motor, turning on an LED, publishing something online.
        </p>
        <h3 className="text-2xl font-semibold mt-6 mb-3">Why Use Arduino?</h3>
        <ul className="list-disc list-inside space-y-2 mb-4">
          <li><strong>Simplicity:</strong> The Arduino software (IDE) is easy-to-use for beginners, yet flexible enough for advanced users.</li>
          <li><strong>Inexpensive:</strong> Arduino boards are relatively cheap compared to other microcontroller platforms.</li>
          <li><strong>Cross-platform:</strong> The Arduino Software (IDE) runs on Windows, Macintosh OSX, and Linux operating systems.</li>
          <li><strong>Open source and extensible software:</strong> The Arduino software is published as open source tools, available for extension by experienced programmers.</li>
          <li><strong>Open source and extensible hardware:</strong> The plans of the Arduino boards are published under a Creative Commons license, so experienced circuit designers can make their own version of the module, extending it and improving it.</li>
        </ul>
        <h3 className="text-2xl font-semibold mt-6 mb-3">Types of Arduino Boards</h3>
        <p className="mb-4">
          There are many types of Arduino boards, each with different capabilities. Some popular ones include:
        </p>
        <ul className="list-disc list-inside space-y-1 mb-4">
          <li>Arduino UNO (Most popular for beginners)</li>
          <li>Arduino Nano (Small form factor)</li>
          <li>Arduino Mega (More I/O pins and memory)</li>
          <li>Arduino Due (Faster 32-bit processor)</li>
        </ul>
        <p>This tutorial series will primarily focus on projects that can be done with an Arduino UNO or compatible boards.</p>
      </>
    ),
  },
  {
    slug: 'getting-started',
    title: 'Getting Started with Arduino',
    description: 'Setting up your Arduino IDE and uploading your first sketch.',
    mainTitle: 'Arduino: Getting Started',
    content: (
      <>
        <p className="mb-4 text-lg">
          Let's get your Arduino environment set up and upload your very first program (often called a "sketch" in Arduino terminology).
        </p>
        <h3 className="text-2xl font-semibold mt-6 mb-3">1. Download the Arduino IDE</h3>
        <p className="mb-4">
          Go to the official Arduino website (<a href="https://www.arduino.cc/en/software" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">arduino.cc/en/software</a>) and download the Arduino IDE (Integrated Development Environment) suitable for your operating system (Windows, macOS, or Linux). Install it like any other software.
        </p>
        <h3 className="text-2xl font-semibold mt-6 mb-3">2. Connect Your Arduino Board</h3>
        <p className="mb-4">
          Connect your Arduino board to your computer using a USB cable. The green power LED (labeled PWR) should light up.
        </p>
        <h3 className="text-2xl font-semibold mt-6 mb-3">3. Configure the Arduino IDE</h3>
        <p className="mb-2">
          Open the Arduino IDE. You need to tell the IDE which board you are using and which serial port it's connected to.
        </p>
        <ul className="list-decimal list-inside space-y-2 mb-4">
          <li>
            <strong>Select your board:</strong> Go to <code className="bg-muted px-1 rounded">Tools {'>'} Board</code> and choose your Arduino board type (e.g., "Arduino Uno").
          </li>
          <li>
            <strong>Select your port:</strong> Go to <code className="bg-muted px-1 rounded">Tools {'>'} Port</code>. You should see a COM port (on Windows) or a /dev/tty port (on macOS/Linux) that corresponds to your Arduino. It might be labeled with the board name. If you're unsure, unplug your Arduino and check the Port menu, then plug it back in and see which new port appears.
          </li>
        </ul>
        <h3 className="text-2xl font-semibold mt-6 mb-3">4. Upload Your First Sketch: Blink</h3>
        <p className="mb-2">
          The "Blink" sketch is the "Hello, World!" of microcontrollers. It makes the built-in LED on your Arduino board blink.
        </p>
        <ol className="list-decimal list-inside space-y-2 mb-4">
          <li>
            Open the Blink example: Go to <code className="bg-muted px-1 rounded">File {'>'} Examples {'>'} 01.Basics {'>'} Blink</code>.
          </li>
          <li>
            A new window will open with the Blink sketch code. It should look like this:
            <CodeBlock language="cpp" code={`
// the setup function runs once when you press reset or power the board
void setup() {
  // initialize digital pin LED_BUILTIN as an output.
  pinMode(LED_BUILTIN, OUTPUT);
}

// the loop function runs over and over again forever
void loop() {
  digitalWrite(LED_BUILTIN, HIGH);   // turn the LED on (HIGH is the voltage level)
  delay(1000);                       // wait for a second
  digitalWrite(LED_BUILTIN, LOW);    // turn the LED off by making the voltage LOW
  delay(1000);                       // wait for a second
}
            `} />
          </li>
          <li>
            Click the "Upload" button (it looks like a right arrow icon) in the Arduino IDE.
          </li>
          <li>
            If everything is set up correctly, the IDE will compile the sketch and upload it to your board. You should see "Done uploading." in the status bar. The built-in LED (often labeled 'L') on your Arduino board should start blinking!
          </li>
        </ol>
        <p>Congratulations! You've successfully uploaded your first sketch to an Arduino.</p>
      </>
    ),
  },
  {
    slug: 'digital-pins',
    title: 'Understanding Digital Pins',
    description: 'Learn about digital input and output on Arduino.',
    mainTitle: 'Arduino Digital Pins Explained',
    content: (
      <>
        <p className="mb-4 text-lg">
          Digital pins are the fundamental way an Arduino interacts with many types of electronic components. They can be configured as either inputs or outputs and can only be in one of two states: HIGH (typically 5V or 3.3V depending on the board) or LOW (0V or Ground).
        </p>
        <h3 className="text-2xl font-semibold mt-6 mb-3">Configuring Pin Mode</h3>
        <p className="mb-2">
          Before you can use a digital pin, you must tell the Arduino whether it's an INPUT or an OUTPUT. This is done in the <code className="bg-muted px-1 rounded">setup()</code> function using the <code className="bg-muted px-1 rounded">pinMode()</code> function.
        </p>
        <CodeBlock language="cpp" code={`
void setup() {
  pinMode(13, OUTPUT); // Sets digital pin 13 as an output
  pinMode(2, INPUT);   // Sets digital pin 2 as an input
}

void loop() {
  // Your main code here
}
        `} />
        <h3 className="text-2xl font-semibold mt-6 mb-3">Digital Output: <code className="bg-muted px-1 rounded">digitalWrite()</code></h3>
        <p className="mb-2">
          When a pin is configured as an OUTPUT, you can set its state to HIGH or LOW using the <code className="bg-muted px-1 rounded">digitalWrite()</code> function. This is commonly used to turn LEDs on/off or to control relays.
        </p>
        <CodeBlock language="cpp" code={`
// Assume pin 13 is already set as OUTPUT in setup()
digitalWrite(13, HIGH); // Turns pin 13 ON (HIGH)
delay(500);
digitalWrite(13, LOW);  // Turns pin 13 OFF (LOW)
        `} />
         <h3 className="text-2xl font-semibold mt-6 mb-3">Digital Input: <code className="bg-muted px-1 rounded">digitalRead()</code></h3>
        <p className="mb-2">
          When a pin is configured as an INPUT, you can read its state (HIGH or LOW) using the <code className="bg-muted px-1 rounded">digitalRead()</code> function. This is used with components like buttons or simple switches.
        </p>
        <CodeBlock language="cpp" code={`
// Assume pin 2 is already set as INPUT in setup()
int buttonState = digitalRead(2); // Reads the state of pin 2

if (buttonState == HIGH) {
  // Button is pressed (assuming a pull-down resistor setup or INPUT_PULLUP)
  // Do something...
} else {
  // Button is not pressed
  // Do something else...
}
        `} />
        <h3 className="text-2xl font-semibold mt-6 mb-3">Pull-up Resistors (<code className="bg-muted px-1 rounded">INPUT_PULLUP</code>)</h3>
        <p className="mb-4">
          When using a digital pin as an input for a switch or button, it's important to avoid "floating" inputs. A floating input occurs when the pin is not connected to either HIGH or LOW, and its state can be unpredictable. To solve this, you can use a pull-up or pull-down resistor.
        </p>
        <p className="mb-2">
            Arduino has built-in pull-up resistors that you can enable by setting the pin mode to <code className="bg-muted px-1 rounded">INPUT_PULLUP</code>. This connects the pin to VCC (HIGH) through an internal resistor.
        </p>
        <CodeBlock language="cpp" code={`
void setup() {
  pinMode(2, INPUT_PULLUP); // Sets pin 2 as input with internal pull-up resistor enabled
}

void loop() {
  int buttonState = digitalRead(2);
  // With INPUT_PULLUP, the pin will be HIGH when the button is NOT pressed,
  // and LOW when the button IS pressed (connecting the pin to Ground).
  if (buttonState == LOW) {
    // Button is pressed
  }
}
        `} />
        <p className="mt-4">Understanding and using digital pins effectively is crucial for most Arduino projects. Experiment with LEDs and buttons to solidify your understanding!</p>
      </>
    ),
  },
];

// Helper function to get a lesson by its slug
export function getArduinoLessonBySlug(slug: string): ArduinoLesson | undefined {
  return arduinoTutorialLessons.find(lesson => lesson.slug === slug);
}
