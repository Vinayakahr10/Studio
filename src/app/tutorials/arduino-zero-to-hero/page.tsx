
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'; // Added CardFooter
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Download, Youtube, BookOpen, PackageIcon, MessageSquare, Github, TwitterIcon, ListChecks, Lightbulb, AlertTriangle, Users, Rocket } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export const metadata: Metadata = {
  title: "Arduino from Zero to Hero: Ultimate Beginner's Guide - EletronicswithVK",
  description: "Master Arduino with this step-by-step guide! Learn programming, electronics, and IoT projects from beginner to expert with EletronicswithVK.",
};

export default function ArduinoZeroToHeroPage() {
  return (
    <div className="bg-slate-100 dark:bg-slate-900 py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* 1. Header Section */}
        <header className="text-center py-10 md:py-16 rounded-lg shadow-lg mb-12 bg-gradient-to-br from-primary via-primary/80 to-accent text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">Arduino from Zero to Hero: A Complete Beginner's Guide</h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-primary-foreground/90">
            Learn Arduino step-by-step, from blinking an LED to building advanced IoT projects, with hands-on tutorials and resources.
          </p>
          <div className="mt-8">
            <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground transition-transform hover:scale-105 shadow-md">
              <Link href="#learning-path">Start Your Arduino Journey</Link>
            </Button>
          </div>
        </header>
        
        <div className="max-w-5xl mx-auto space-y-12 md:space-y-16">

          <section className="text-center">
             <Image
              src="https://placehold.co/1000x400.png"
              alt="Arduino Uno with breadboard, LEDs, and sensors"
              data-ai-hint="arduino setup components action"
              width={1000}
              height={400}
              className="w-full rounded-lg object-cover shadow-xl mb-8"
              priority
            />
          </section>

          {/* 2. Introduction Section */}
          <section>
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-3xl text-primary">Why Learn Arduino?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Arduino is an incredible open-source electronics platform that makes building interactive projects accessible to everyone, from absolute beginners to seasoned hobbyists and professionals. Its simple hardware and software allow you to bring your creative ideas to life.
                </p>
                <p>
                  With Arduino, you can dive into robotics, create smart home devices, build Internet of Things (IoT) solutions, design wearables, and so much more. The boards are relatively inexpensive, and the huge global community means there's always support and inspiration available. Whether you're a student looking to understand electronics, a maker wanting to prototype new inventions, or simply a curious tinkerer, Arduino offers a fun and rewarding way to learn and create.
                </p>
                <p className="font-semibold text-foreground">
                  This guide is designed to take you from zero to hero in your Arduino journey over the next few months!
                </p>
                <div className="aspect-video mt-6 rounded-md overflow-hidden shadow">
                   {/* Placeholder for YouTube Video */}
                  <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">
                    <Youtube className="h-16 w-16 mr-2 text-red-600" /> Placeholder: Short YouTube video showcasing a cool Arduino project (e.g., from DroneBot Workshop)
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <Separator />

          {/* 3. Learning Path Section */}
          <section id="learning-path">
            <h2 className="text-3xl font-bold text-center mb-8 text-primary">Your Roadmap to Mastering Arduino</h2>
            <Accordion type="single" collapsible defaultValue="stage-1" className="w-full">
              <AccordionItem value="stage-1">
                <AccordionTrigger className="text-xl font-semibold hover:no-underline py-4">Stage 1: Getting Started (0 to Beginner) - Est. 2 Weeks</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base pt-2 pb-4 space-y-2">
                  <p>Understand what Arduino is, set up the IDE, and blink your first LED. This stage is all about the fundamentals.</p>
                  <p><strong>Key Skills:</strong> Basic electronics concepts, digital/analog pins, writing and uploading your first sketch, understanding `setup()` and `loop()`.</p>
                  <p><strong>Project:</strong> Button-controlled LED (learn digital input and output).</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="stage-2">
                <AccordionTrigger className="text-xl font-semibold hover:no-underline py-4">Stage 2: Core Skills (Beginner to Intermediate) - Est. 3-4 Weeks</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base pt-2 pb-4 space-y-2">
                  <p>Start working with common sensors (like DHT11 temperature/humidity, ultrasonic distance sensor), control motors, and display information on LCDs.</p>
                  <p><strong>Key Skills:</strong> Pulse Width Modulation (PWM), interrupts, using libraries, serial communication, analog input.</p>
                  <p><strong>Project:</strong> Temperature and humidity monitor with an LCD display.</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="stage-3">
                <AccordionTrigger className="text-xl font-semibold hover:no-underline py-4">Stage 3: Advanced Projects (Intermediate to Advanced) - Est. 4-6 Weeks</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base pt-2 pb-4 space-y-2">
                  <p>Dive into the Internet of Things (IoT), explore I2C and SPI communication protocols, and start working with more powerful boards like ESP8266 or ESP32 for WiFi connectivity.</p>
                  <p><strong>Key Skills:</strong> WiFi/Bluetooth communication, sending data to cloud platforms, understanding state machines, working with multiple sensors.</p>
                  <p><strong>Project:</strong> IoT weather station that posts data online.</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="stage-4">
                <AccordionTrigger className="text-xl font-semibold hover:no-underline py-4">Stage 4: Hero Level (Advanced to Expert) - Est. 2-3 Months</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base pt-2 pb-4 space-y-2">
                  <p>Challenge yourself to build original projects from scratch, optimize your code for efficiency and low power, and even design your own PCBs (Printed Circuit Boards).</p>
                  <p><strong>Key Skills:</strong> Advanced programming techniques, low-power modes, creating custom libraries, PCB design basics, project management.</p>
                  <p><strong>Project:</strong> A smart mirror, an autonomous drone, or a custom home automation system.</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <div className="mt-6 text-center">
                <Image
                  src="https://placehold.co/800x200.png"
                  alt="Arduino Learning Path Timeline"
                  data-ai-hint="learning timeline infographic"
                  width={800}
                  height={200}
                  className="w-full max-w-2xl mx-auto rounded-lg object-contain shadow-md mb-4"
                />
              <Button variant="outline" className="transition-transform hover:scale-105">
                <Download className="mr-2 h-4 w-4" /> Download Arduino Skills Checklist (PDF)
              </Button>
            </div>
          </section>
          
          <Separator />

          {/* 4. Resources Section */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-8 text-primary">Tools and Resources to Get Started</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center"><PackageIcon className="mr-2 h-6 w-6 text-primary"/>Hardware & Software</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-muted-foreground">
                  <p><strong>Hardware:</strong> An Arduino Uno starter kit is highly recommended. Kits from Elegoo, Vilros, or SparkFun are great options (around $30-$60 on Amazon). They usually include an Arduino Uno, breadboard, jumper wires, LEDs, resistors, sensors, and more.</p>
                  <div className="flex gap-4 my-2">
                     <Image src="https://placehold.co/150x100.png" data-ai-hint="arduino kit" alt="Arduino Starter Kit" width={150} height={100} className="rounded shadow-md"/>
                  </div>
                  <p><strong>Software:</strong></p>
                  <ul className="list-disc list-inside pl-4 space-y-1">
                    <li><a href="https://www.arduino.cc/en/software" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Arduino IDE (Desktop)</a> - The official development environment.</li>
                    <li><a href="https://create.arduino.cc/editor" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Arduino Cloud Editor</a> - Code online, save projects to the cloud.</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center"><BookOpen className="mr-2 h-6 w-6 text-primary"/>Learning Materials & Community</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-muted-foreground">
                  <p><strong>Free Resources:</strong></p>
                  <ul className="list-disc list-inside pl-4 space-y-1">
                    <li><a href="https://create.arduino.cc/projecthub" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Arduino Project Hub</a></li>
                    <li>YouTube: GreatScott!, Programming Electronics Academy, DroneBot Workshop</li>
                    <li><a href="https://www.freecodecamp.org/news/tag/arduino/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">freeCodeCamp Arduino Articles</a></li>
                  </ul>
                  <p className="mt-2"><strong>Paid Resources (Optional):</strong></p>
                   <ul className="list-disc list-inside pl-4 space-y-1">
                    <li>Udemy: "Arduino for Beginners" by Peter Dalmaris</li>
                    <li>Book: "Exploring Arduino" by Jeremy Blum</li>
                  </ul>
                  <div className="flex gap-4 my-2">
                     <Image src="https://placehold.co/100x150.png" data-ai-hint="arduino book cover" alt="Arduino Book" width={100} height={150} className="rounded shadow-md"/>
                  </div>
                  <p className="mt-2"><strong>Community Support:</strong></p>
                  <ul className="list-disc list-inside pl-4 space-y-1">
                    <li><a href="https://forum.arduino.cc/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Arduino Forum</a></li>
                    <li>Reddit: <a href="https://www.reddit.com/r/arduino/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">r/arduino</a></li>
                    <li>Follow #Arduino on X (formerly Twitter)</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          <Separator />

          {/* 5. Hands-On Tutorials Section */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-8 text-primary">Try These Beginner Projects</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: "Blink an LED", description: "The 'Hello World' of Arduino. Learn to control an LED's blink speed.", imageHint: "blinking led circuit", code: "void setup() {\n  pinMode(LED_BUILTIN, OUTPUT);\n}\nvoid loop() {\n  digitalWrite(LED_BUILTIN, HIGH);\n  delay(500); // 0.5 second on\n  digitalWrite(LED_BUILTIN, LOW);\n  delay(500); // 0.5 second off\n}" },
                { title: "Button-Controlled LED", description: "Use a push button to turn an LED on or off. Introduces digital inputs.", imageHint: "button led circuit", code: "const int buttonPin = 2;\nconst int ledPin = 13;\nint buttonState = 0;\n\nvoid setup() {\n  pinMode(ledPin, OUTPUT);\n  pinMode(buttonPin, INPUT_PULLUP);\n}\n\nvoid loop() {\n  buttonState = digitalRead(buttonPin);\n  if (buttonState == LOW) { // Button pressed (INPUT_PULLUP)\n    digitalWrite(ledPin, HIGH);\n  } else {\n    digitalWrite(ledPin, LOW);\n  }\n}" },
                { title: "Potentiometer LED Control", description: "Control an LED's brightness using a potentiometer. Learn analog input and PWM.", imageHint: "potentiometer led brightness", code: "const int potPin = A0;\nconst int ledPin = 9; // PWM pin\nint potValue = 0;\nint brightness = 0;\n\nvoid setup() {\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  potValue = analogRead(potPin);\n  brightness = map(potValue, 0, 1023, 0, 255);\n  analogWrite(ledPin, brightness);\n  delay(10);\n}" },
              ].map((project, index) => (
                <Card key={index} className="shadow-lg flex flex-col">
                  <CardHeader>
                    <CardTitle className="text-xl">{project.title}</CardTitle>
                     <Image src={`https://placehold.co/300x200.png`} data-ai-hint={project.imageHint} alt={project.title} width={300} height={200} className="rounded-md object-cover mt-2"/>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <CardDescription>{project.description}</CardDescription>
                    {/* Placeholder for schematic & code snippet - for now just short desc */}
                  </CardContent>
                  <CardFooter>
                     <Button variant="link" asChild className="p-0"><Link href="#">View Details (Coming Soon)</Link></Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <div className="mt-8 text-center">
              <div className="w-full aspect-video max-w-2xl mx-auto bg-muted rounded-lg shadow-md flex items-center justify-center text-muted-foreground mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circuit-board mr-2"><rect width="18" height="18" x="3" y="3" rx="2"></rect><path d="M11 9h4a2 2 0 0 0 2-2V3"></path><circle cx="9" cy="9" r="2"></circle><path d="M7 21v-4a2 2 0 0 1 2-2h4"></path><circle cx="15" cy="15" r="2"></circle></svg>
                Placeholder: Embedded Tinkercad Circuits simulation for Blink project
              </div>
              <Button size="lg" variant="outline" asChild className="transition-transform hover:scale-105">
                <Link href="https://create.arduino.cc/projecthub" target="_blank" rel="noopener noreferrer">
                  View More Projects on Arduino Project Hub
                </Link>
              </Button>
            </div>
          </section>

          <Separator />

          {/* 6. Tips and Troubleshooting Section */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-8 text-primary">Pro Tips for Arduino Success</h2>
            <div className="grid md:grid-cols-2 gap-6">
                <Card className="shadow-md">
                    <CardHeader><CardTitle className="flex items-center"><Lightbulb className="text-yellow-400 mr-2"/> General Tips</CardTitle></CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        <li>Start with small, achievable projects to build confidence.</li>
                        <li>Always double-check your wiring before powering up.</li>
                        <li>Use the Serial Monitor (`Serial.print()`) extensively for debugging.</li>
                        <li>Break down complex problems into smaller, manageable parts.</li>
                        <li>Don't be afraid to experiment and make mistakes – it's part of learning!</li>
                        <li>Read component datasheets to understand their specifications.</li>
                        </ul>
                    </CardContent>
                </Card>
                 <Card className="shadow-md">
                    <CardHeader><CardTitle className="flex items-center"><AlertTriangle className="text-red-500 mr-2"/> Common Troubleshooting</CardTitle></CardHeader>
                    <CardContent>
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b">
                                <th className="text-left pb-2 text-foreground">Issue</th>
                                <th className="text-left pb-2 text-foreground">Potential Solution(s)</th>
                                </tr>
                            </thead>
                            <tbody className="text-muted-foreground">
                                <tr className="border-b"><td className="py-2 pr-2 align-top">LED not lighting up</td><td className="py-2 align-top">Check polarity (long leg to positive), resistor value, pin number in code, breadboard connection.</td></tr>
                                <tr className="border-b"><td className="py-2 pr-2 align-top">Sketch won't upload</td><td className="py-2 align-top">Verify correct board and port selected in IDE, check USB cable, ensure no shorts.</td></tr>
                                <tr><td className="py-2 pr-2 align-top">Sensor gives weird readings</td><td className="py-2 align-top">Check wiring, ensure correct library is used, add delays if reading too fast, check power supply.</td></tr>
                            </tbody>
                        </table>
                    </CardContent>
                </Card>
            </div>
          </section>

          <Separator />

          {/* 7. Community and Inspiration Section */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-8 text-primary">Join the Arduino Community</h2>
            <div className="grid md:grid-cols-2 gap-6 items-start">
              <Card className="shadow-md">
                <CardHeader><CardTitle className="flex items-center"><Users className="mr-2 text-primary"/>Connect & Share</CardTitle></CardHeader>
                <CardContent className="space-y-3 text-muted-foreground">
                    <p>The Arduino community is vast and supportive! Share your projects, ask questions, and learn from others:</p>
                    <ul className="list-disc list-inside pl-4 space-y-1">
                        <li><Link href="https://create.arduino.cc/projecthub" className="text-primary hover:underline" target="_blank">Arduino Project Hub</Link> - Showcase your creations.</li>
                        <li><Link href="https://github.com/topics/arduino" className="text-primary hover:underline" target="_blank">GitHub (Arduino topic)</Link> - Find and contribute to open-source projects.</li>
                        <li><Link href="https://forum.arduino.cc/" className="text-primary hover:underline" target="_blank">Official Arduino Forum</Link> - Get help and discuss ideas.</li>
                         <li><Link href="https://www.reddit.com/r/arduino/" className="text-primary hover:underline" target="_blank">r/arduino on Reddit</Link> - Active community for discussions.</li>
                    </ul>
                </CardContent>
              </Card>
              <Card className="shadow-md">
                 <CardHeader><CardTitle className="flex items-center"><TwitterIcon className="mr-2 text-sky-500"/>Get Inspired on X</CardTitle></CardHeader>
                 <CardContent className="space-y-3 text-muted-foreground">
                    <p>See what others are building in real-time! Follow the #Arduino hashtag on X (formerly Twitter).</p>
                    <div className="w-full h-48 bg-muted rounded-lg shadow flex items-center justify-center text-muted-foreground">
                        Placeholder: Embedded X feed for #Arduino
                    </div>
                    <p>Highlight: Trending projects often include IoT garden systems, custom Bluetooth controllers, and innovative robotics.</p>
                 </CardContent>
              </Card>
            </div>
          </section>

          <Separator />

          {/* 8. Conclusion and CTA */}
          <section className="text-center py-10 bg-secondary/30 rounded-lg shadow-md">
            <Rocket className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4 text-primary">You're Ready to Become an Arduino Hero!</h2>
            <p className="max-w-2xl mx-auto text-muted-foreground mb-6 md:text-lg">
              You've seen the roadmap, from blinking your first LED to envisioning complex IoT systems. The journey of learning Arduino is incredibly rewarding. Start with small, manageable projects, practice consistently, and don't be afraid to experiment. The power to create amazing things is now at your fingertips.
            </p>
            <p className="max-w-2xl mx-auto text-muted-foreground mb-8 md:text-lg">
                We'd love to see what you build! Share your progress with us or the community.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button size="lg" variant="default" className="transition-transform hover:scale-105">
                <Download className="mr-2 h-5 w-5" /> Download Free Arduino Checklist
              </Button>
              {/* Placeholder for Newsletter Signup */}
              <div className="p-4 border rounded-md bg-background w-full sm:w-auto max-w-sm">
                <p className="font-semibold text-foreground mb-2">Subscribe for Arduino Tips!</p>
                {/* <Input type="email" placeholder="Enter your email" className="mb-2"/> */}
                <Button className="w-full">Subscribe</Button>
              </div>
            </div>
          </section>
        </div>
      </div>

      <footer className="mt-16 text-center text-sm text-muted-foreground">
        Standard: IEC 60062:2016 (Relevant for resistor color codes, typically mentioned there)
      </footer>
    </div>
  );
}
