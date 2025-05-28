
import type { ReactNode } from 'react';
import { CodeBlock } from '@/components/content/CodeBlock';

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
  {
    slug: 'analog-inputs',
    title: 'Analog Inputs',
    description: 'Reading analog signals with Arduino.',
    mainTitle: 'Arduino: Reading Analog Inputs',
    content: (
      <>
        <p className="mb-4 text-lg">
          Many sensors and devices in the real world produce analog signals, which are continuous and can have any value within a certain range (unlike digital signals which are only HIGH or LOW). Arduino boards have dedicated analog input pins to read these signals.
        </p>
        <h3 className="text-2xl font-semibold mt-6 mb-3">What are Analog Signals?</h3>
        <p className="mb-4">
          An analog signal is a continuous electrical signal for which the time varying feature (variable) of the signal is a representation of some other time varying quantity, i.e., analogous to another time varying signal. For example, the voltage from a potentiometer, the light level from a Light Dependent Resistor (LDR), or the temperature from an analog temperature sensor are all analog signals.
        </p>
        <h3 className="text-2xl font-semibold mt-6 mb-3">Arduino's Analog Pins</h3>
        <p className="mb-4">
          Most Arduino boards (like the Uno) have a set of analog input pins, usually labeled A0, A1, A2, etc. These pins are connected to an internal Analog-to-Digital Converter (ADC).
        </p>
        <h3 className="text-2xl font-semibold mt-6 mb-3">Analog-to-Digital Converter (ADC)</h3>
        <p className="mb-2">
          The ADC on an Arduino (e.g., Arduino Uno) is typically a 10-bit converter. This means it can map input voltages between 0 and the operating voltage (usually 5V or 3.3V) into integer values between 0 and 1023.
        </p>
        <ul className="list-disc list-inside space-y-1 mb-4">
          <li>A voltage of 0V will result in an ADC reading of 0.</li>
          <li>A voltage of 5V (on a 5V Arduino) will result in an ADC reading of 1023.</li>
          <li>A voltage of 2.5V will result in an ADC reading of approximately 512.</li>
        </ul>
        <h3 className="text-2xl font-semibold mt-6 mb-3">Using <code className="bg-muted px-1 rounded">analogRead()</code></h3>
        <p className="mb-2">
          To read an analog voltage on one of these pins, you use the <code className="bg-muted px-1 rounded">analogRead(pin)</code> function. The `pin` argument is the analog pin number you want to read from (e.g., A0, A1). This function returns an integer value from 0 to 1023.
        </p>
        <p className="mb-4">
          You don't need to use <code className="bg-muted px-1 rounded">pinMode()</code> to configure analog pins as inputs; they are analog inputs by default.
        </p>
        <CodeBlock language="cpp" code={`
void setup() {
  Serial.begin(9600); // Initialize serial communication to see the values
}

void loop() {
  int sensorValue = analogRead(A0); // Read the input on analog pin A0
  Serial.println(sensorValue);      // Print the value to the Serial Monitor
  delay(100);                       // Wait for 100 milliseconds
}
        `} />
        <h3 className="text-2xl font-semibold mt-6 mb-3">Example: Reading a Potentiometer</h3>
        <p className="mb-2">
          A potentiometer is a variable resistor and a common way to provide a variable analog input. Connect its three pins as follows:
        </p>
        <ul className="list-disc list-inside space-y-1 mb-4">
          <li>One outer pin to Ground (GND).</li>
          <li>The other outer pin to 5V (or 3.3V).</li>
          <li>The middle pin (wiper) to an analog input pin (e.g., A0).</li>
        </ul>
        <p className="mb-4">
          As you turn the potentiometer knob, the voltage on the middle pin will vary between 0V and 5V, and the <code className="bg-muted px-1 rounded">analogRead(A0)</code> function will return values between 0 and 1023.
        </p>
        <h3 className="text-2xl font-semibold mt-6 mb-3">Mapping Analog Values</h3>
        <p className="mb-2">
          Often, you'll want to map the 0-1023 range to another range, for example, to control the brightness of an LED (0-255) or to display a voltage. The <code className="bg-muted px-1 rounded">map()</code> function is useful for this.
        </p>
        <CodeBlock language="cpp" code={`
void loop() {
  int sensorValue = analogRead(A0);
  // Map the sensor reading to a 0-255 range for PWM output
  int outputValue = map(sensorValue, 0, 1023, 0, 255);
  // analogWrite(ledPin, outputValue); // Example usage for LED brightness

  // Convert the analog reading (which goes from 0 - 1023) to a voltage (0 - 5V):
  float voltage = sensorValue * (5.0 / 1023.0);
  Serial.print("Sensor Value: ");
  Serial.print(sensorValue);
  Serial.print(", Voltage: ");
  Serial.println(voltage);
  delay(100);
}
        `} />
        <p className="mt-4">
          Analog inputs open up a vast range of possibilities for interacting with sensors and creating more nuanced control systems.
        </p>
      </>
    ),
  },
  {
    slug: 'pwm',
    title: 'Pulse Width Modulation (PWM)',
    description: 'Simulating analog outputs using PWM with analogWrite().',
    mainTitle: 'Arduino: Pulse Width Modulation (PWM)',
    content: (
      <>
        <p className="mb-4 text-lg">
          While Arduino's digital pins can only output HIGH or LOW, Pulse Width Modulation (PWM) allows you to simulate an analog output. This is useful for tasks like controlling the brightness of an LED, the speed of a DC motor, or the position of a servo motor.
        </p>
        <h3 className="text-2xl font-semibold mt-6 mb-3">What is PWM?</h3>
        <p className="mb-4">
          PWM is a technique where a digital signal is switched between ON (HIGH) and OFF (LOW) very rapidly. The "duty cycle" of the signal is the percentage of time the signal is ON compared to its total period. By varying the duty cycle, you can change the average power delivered to a device, effectively simulating an analog voltage level.
        </p>
        <ul className="list-disc list-inside space-y-1 mb-4">
          <li>A 0% duty cycle means the signal is always OFF.</li>
          <li>A 100% duty cycle means the signal is always ON.</li>
          <li>A 50% duty cycle means the signal is ON for half the time and OFF for the other half. This results in an average voltage that is half of the HIGH voltage.</li>
        </ul>
        <h3 className="text-2xl font-semibold mt-6 mb-3">Arduino's PWM Pins</h3>
        <p className="mb-4">
          On most Arduino boards (like the Uno), not all digital pins support PWM. The PWM-capable pins are typically marked with a tilde (<code className="bg-muted px-1 rounded">~</code>) or "PWM" next to the pin number (e.g., pins 3, 5, 6, 9, 10, 11 on an Uno).
        </p>
        <h3 className="text-2xl font-semibold mt-6 mb-3">Using <code className="bg-muted px-1 rounded">analogWrite()</code></h3>
        <p className="mb-2">
          To generate a PWM signal on a PWM-capable pin, you use the <code className="bg-muted px-1 rounded">analogWrite(pin, value)</code> function.
        </p>
        <ul className="list-disc list-inside space-y-1 mb-4">
          <li><code className="bg-muted px-1 rounded">pin</code>: The PWM pin number.</li>
          <li><code className="bg-muted px-1 rounded">value</code>: The duty cycle, an integer from 0 (always off) to 255 (always on).</li>
        </ul>
        <p className="mb-4">
          A value of 0 corresponds to a 0% duty cycle (signal is always LOW). A value of 255 corresponds to a 100% duty cycle (signal is always HIGH). A value of 127 is approximately a 50% duty cycle.
        </p>
        <p className="mb-4">
          You don't need to call <code className="bg-muted px-1 rounded">pinMode()</code> to set the pin as an output before using <code className="bg-muted px-1 rounded">analogWrite()</code>; it's handled automatically.
        </p>
        <CodeBlock language="cpp" code={`
int ledPin = 9; // PWM pin for the LED

void setup() {
  // No pinMode() needed for analogWrite()
}

void loop() {
  // Fade an LED up and down
  for (int brightness = 0; brightness <= 255; brightness++) {
    analogWrite(ledPin, brightness);
    delay(10); // Small delay to see the fading effect
  }
  for (int brightness = 255; brightness >= 0; brightness--) {
    analogWrite(ledPin, brightness);
    delay(10);
  }
}
        `} />
        <h3 className="text-2xl font-semibold mt-6 mb-3">PWM Frequency</h3>
        <p className="mb-4">
          The frequency of the PWM signal on Arduino Uno is approximately 490 Hz for pins 3, 9, 10, 11 and approximately 980 Hz for pins 5 and 6. This frequency is generally high enough that the switching is not noticeable for LEDs (they appear to dim smoothly) or for controlling DC motors (they run smoother).
        </p>
        <p className="mt-4">
          PWM is a powerful technique for achieving "analog-like" control with digital outputs, making it essential for a wide variety of Arduino projects.
        </p>
      </>
    ),
  },
  {
    slug: 'serial-communication',
    title: 'Serial Communication',
    description: 'Sending and receiving data between Arduino and computer.',
    mainTitle: 'Arduino: Serial Communication',
    content: (
      <>
        <p className="mb-4 text-lg">
          Serial communication is a fundamental way for your Arduino to exchange information with a computer or other devices. The most common use case for beginners is sending debugging information or sensor readings from the Arduino to the Arduino IDE's Serial Monitor.
        </p>
        <h3 className="text-2xl font-semibold mt-6 mb-3">The Serial Object</h3>
        <p className="mb-4">
          Arduino has a built-in object called <code className="bg-muted px-1 rounded">Serial</code> that handles serial communication over the USB connection (on most boards like the Uno, pins 0 (RX) and 1 (TX) are used for this, so avoid using them for other digital I/O if you're using serial communication).
        </p>
        <h3 className="text-2xl font-semibold mt-6 mb-3">Initializing Serial Communication: <code className="bg-muted px-1 rounded">Serial.begin()</code></h3>
        <p className="mb-2">
          Before you can use serial communication, you must initialize it in your <code className="bg-muted px-1 rounded">setup()</code> function using <code className="bg-muted px-1 rounded">Serial.begin(speed)</code>.
        </p>
        <ul className="list-disc list-inside space-y-1 mb-4">
          <li><code className="bg-muted px-1 rounded">speed</code>: The baud rate (bits per second) for communication. A common value is 9600. Both the Arduino and the device it's communicating with (e.g., the Serial Monitor) must be set to the same baud rate.</li>
        </ul>
        <CodeBlock language="cpp" code={`
void setup() {
  Serial.begin(9600); // Initialize serial communication at 9600 baud
  Serial.println("Arduino Serial Communication Initialized!");
}

void loop() {
  // ... your main code ...
}
        `} />
        <h3 className="text-2xl font-semibold mt-6 mb-3">Sending Data from Arduino</h3>
        <p className="mb-2">
          You can send data from the Arduino to the connected device using several functions:
        </p>
        <ul className="list-disc list-inside space-y-2 mb-4">
          <li>
            <code className="bg-muted px-1 rounded">Serial.print(data)</code>: Prints data to the serial port. The data can be a string, number, or other variable types. It does not add a newline character at the end.
          </li>
          <li>
            <code className="bg-muted px-1 rounded">Serial.println(data)</code>: Similar to <code className="bg-muted px-1 rounded">Serial.print()</code>, but it adds a carriage return (<code className="bg-muted px-1 rounded">\r</code>) and a newline character (<code className="bg-muted px-1 rounded">\n</code>) at the end, moving the cursor to the next line in the Serial Monitor.
          </li>
          <li>
            <code className="bg-muted px-1 rounded">Serial.write(data)</code>: Sends binary data (a single byte or a series of bytes) to the serial port.
          </li>
        </ul>
        <CodeBlock language="cpp" code={`
void loop() {
  int sensorValue = analogRead(A0);
  
  Serial.print("Sensor Value: ");
  Serial.print(sensorValue);
  Serial.print(" | Mapped Value: ");
  int mappedValue = map(sensorValue, 0, 1023, 0, 100);
  Serial.println(mappedValue); // Ends with a newline
  
  delay(500);
}
        `} />
        <h3 className="text-2xl font-semibold mt-6 mb-3">Receiving Data on Arduino</h3>
        <p className="mb-2">
          Arduino can also receive data sent from the computer (e.g., typed into the Serial Monitor's input field).
        </p>
        <ul className="list-disc list-inside space-y-2 mb-4">
          <li>
            <code className="bg-muted px-1 rounded">Serial.available()</code>: Returns the number of bytes (characters) available for reading from the serial port. Use this to check if there's incoming data before trying to read it.
          </li>
          <li>
            <code className="bg-muted px-1 rounded">Serial.read()</code>: Reads a single byte (character) of incoming serial data. It returns -1 if no data is available.
          </li>
          <li>
            <code className="bg-muted px-1 rounded">Serial.parseInt()</code>, <code className="bg-muted px-1 rounded">Serial.parseFloat()</code>: These functions can be used to read numbers from the serial buffer, skipping non-numeric characters.
          </li>
          <li>
            <code className="bg-muted px-1 rounded">Serial.readString()</code>, <code className="bg-muted px-1 rounded">Serial.readStringUntil(terminator)</code>: Read incoming data as a String object.
          </li>
        </ul>
        <CodeBlock language="cpp" code={`
void loop() {
  if (Serial.available() > 0) { // Check if data is available
    char incomingByte = Serial.read(); // Read the oldest byte
    Serial.print("I received: ");
    Serial.println(incomingByte);

    // Example: Turn LED on/off based on received character
    if (incomingByte == '1') {
      digitalWrite(LED_BUILTIN, HIGH);
    } else if (incomingByte == '0') {
      digitalWrite(LED_BUILTIN, LOW);
    }
  }
}
        `} />
         <h3 className="text-2xl font-semibold mt-6 mb-3">Using the Serial Monitor</h3>
        <p className="mb-4">
          The Arduino IDE includes a Serial Monitor (Tools {'>'} Serial Monitor, or click the magnifying glass icon). Make sure the baud rate selected in the Serial Monitor matches the one set in <code className="bg-muted px-1 rounded">Serial.begin()</code> in your sketch. You can use it to view data sent by Arduino and to send data to Arduino.
        </p>
        <p className="mt-4">
          Serial communication is invaluable for debugging, controlling your Arduino from a computer, and for communication between multiple microcontrollers or devices.
        </p>
      </>
    ),
  },
];

// Helper function to get a lesson by its slug
export function getArduinoLessonBySlug(slug: string): ArduinoLesson | undefined {
  return arduinoTutorialLessons.find(lesson => lesson.slug === slug);
}

      