
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ArrowRight, BookOpen, Wrench, Package, BrainCircuit, Users, HardHat, Lightbulb, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ContactCallToActionSection } from '@/components/sections/ContactCallToActionSection';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full h-[70vh] min-h-[400px] flex items-center justify-center text-center text-white">
        <Image
          src="https://lh3.googleusercontent.com/d/1KoEC6rWkXjXImu7dWCb7IAyLDxtj8HFA"
          alt="An intricate circuit board with glowing pathways, representing the world of electronics."
          fill
          objectFit="cover"
          className="absolute inset-0 z-0 brightness-[0.6]"
          priority
        />
        <div className="relative z-10 p-4 space-y-4 max-w-4xl">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Master the World of Electronics
          </h1>
          <p className="max-w-[700px] mx-auto text-lg text-primary-foreground md:text-xl">
            From basic circuits to advanced microcontrollers, EletronicswithVK provides the knowledge and tools you need to bring your ideas to life.
          </p>
          <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
            <Button asChild size="lg" className="transition-transform hover:scale-105 shadow-md hover:shadow-lg">
              <Link href="/tutorials">Start Learning</Link>
            </Button>
            <Button asChild variant="secondary" size="lg" className="transition-transform hover:scale-105">
              <Link href="/projects">Explore Projects</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Guide Section */}
      <section className="w-full py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-primary">Start Your Journey with Our Flagship Guide</h2>
              <h3 className="text-2xl font-semibold">Electronics from Zero to Hero</h3>
              <p className="text-muted-foreground text-lg">
                Our comprehensive guide is the perfect starting point. We'll take you step-by-step from the absolute basics of circuits to building complex, internet-connected projects. No prior experience needed!
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-500" /><span>Understand core electronics principles.</span></li>
                <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-500" /><span>Write and debug code with confidence.</span></li>
                <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-500" /><span>Interface with sensors, motors, and displays.</span></li>
                <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-500" /><span>Build your first interactive project.</span></li>
              </ul>
              <Button asChild size="lg" className="mt-4">
                <Link href="/tutorials">Start the Guide <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
            <div>
              <Image 
                src="https://placehold.co/600x400.png"
                alt="Electronics learning kit with various components"
                data-ai-hint="electronics learning kit"
                width={600}
                height={400}
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Explore Core Topics Section */}
      <section className="w-full py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6 space-y-12">
           <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Explore Our Core Topics</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mt-4">
              Whether you're a beginner or looking to sharpen your skills, our tutorials cover the essential areas of electronics.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-xl font-semibold hover:no-underline py-4">
                  <div className="flex items-center gap-3"><HardHat className="h-6 w-6 text-primary"/>Fundamental Circuit Theory</div>
                </AccordionTrigger>
                <AccordionContent className="text-base pt-2 pb-4 space-y-2 text-muted-foreground">
                  Master the essential principles that govern all electronic circuits. Our lessons on DC and AC circuit theory cover everything from Ohm's Law and Kirchhoff's Laws to impedance, resonance, and filters. A strong foundation here is key to becoming a proficient electronics engineer.
                  <div className="pt-2">
                    <Button asChild variant="link" className="p-0">
                      <Link href="/tutorials/dc-circuit-theory">Explore DC Circuits <ArrowRight className="ml-1 h-4 w-4"/></Link>
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-xl font-semibold hover:no-underline py-4">
                  <div className="flex items-center gap-3"><BrainCircuit className="h-6 w-6 text-primary"/>Microcontrollers & IoT</div>
                </AccordionTrigger>
                <AccordionContent className="text-base pt-2 pb-4 space-y-2 text-muted-foreground">
                  Learn to program the "brains" of modern electronics. Our tutorials for various microcontrollers will teach you how to read sensors, control motors, and connect your projects to the internet, opening up a world of possibilities in the Internet of Things (IoT).
                  <div className="pt-2">
                    <Button asChild variant="link" className="p-0">
                      <Link href="/tutorials/esp32">Explore Microcontrollers <ArrowRight className="ml-1 h-4 w-4"/></Link>
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-xl font-semibold hover:no-underline py-4">
                   <div className="flex items-center gap-3"><Lightbulb className="h-6 w-6 text-primary"/>Digital & Analog Electronics</div>
                </AccordionTrigger>
                <AccordionContent className="text-base pt-2 pb-4 space-y-2 text-muted-foreground">
                  Dive into the building blocks of electronics. Understand how semiconductor devices like diodes and transistors work. Learn about digital logic gates, Boolean algebra, and operational amplifiers to design and analyze both digital and analog circuits effectively.
                   <div className="pt-2">
                    <Button asChild variant="link" className="p-0">
                      <Link href="/tutorials/digital-electronics">Explore Digital Logic <ArrowRight className="ml-1 h-4 w-4"/></Link>
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>
      
      {/* Community & CTA Section */}
       <section className="w-full py-12 md:py-16 lg:py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block bg-primary/10 p-3 rounded-full mb-4">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">
              Join the Community & Get in Touch
            </h2>
            <p className="mt-4 max-w-xl mx-auto text-muted-foreground md:text-lg">
              Connect with fellow electronics enthusiasts, share your projects, and ask questions. If you need to contact us directly, we're here to help!
            </p>
            <div className="mt-8 flex flex-col gap-3 min-[400px]:flex-row justify-center">
              <Button asChild size="lg" className="transition-transform hover:scale-105 shadow-md hover:shadow-lg">
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="transition-transform hover:scale-105">
                <Link href="/faq">Read our FAQ</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
