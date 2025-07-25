
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight, BookOpen, Wrench, Package, BrainCircuit, Users, HardHat, Lightbulb, CheckCircle, Network, Cpu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ContactCallToActionSection } from '@/components/sections/ContactCallToActionSection';
import { ScrollAnimationWrapper } from '@/components/shared/ScrollAnimationWrapper';
import { cn } from '@/lib/utils';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full h-[70vh] min-h-[400px] flex items-center justify-center text-center text-white dark:[mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_70%,transparent_100%)] overflow-hidden">
        <Image
          src="https://lh3.googleusercontent.com/d/1AoTKLAX39NDyNIe9uC2bh39Tzn-GC_iD"
          alt="An intricate circuit board with glowing pathways, representing the world of electronics."
          fill
          objectFit="cover"
          className="absolute inset-0 z-0 brightness-[0.7] animate-fade-in transition-transform duration-1000 ease-in-out group-hover:scale-105"
          priority
        />
        <div className="relative z-10 p-4 space-y-4 max-w-4xl animate-slide-up-fade">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Master the World of Electronics
          </h1>
          <p className="max-w-[700px] mx-auto text-lg text-white md:text-xl">
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

      <div className="flex flex-col gap-y-16 md:gap-y-24">
        {/* Featured Guide Section */}
        <ScrollAnimationWrapper>
          <section className="w-full pt-16 md:pt-24 bg-background">
            <div className="container mx-auto px-4 md:px-6">
              <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-primary">Start Your Journey with Our Flagship Guide</h2>
                  <h3 className="text-2xl font-semibold">Electronics from Zero to Hero</h3>
                  <p className="text-muted-foreground text-lg">
                    Our comprehensive guide is the perfect starting point. We'll take you step-by-step from the absolute basics of circuits to building complex, internet-connected projects. No prior experience needed!
                  </p>
                  <Button asChild size="lg" className="mt-4">
                      <Link href="/tutorials">Start the Guide <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                </div>
                <Card className="bg-muted/30 shadow-lg">
                    <CardHeader>
                        <CardTitle>Key Skills You'll Learn</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3 text-muted-foreground">
                            <li className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" /><span>Understand core electronics principles.</span></li>
                            <li className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" /><span>Write and debug code with confidence.</span></li>
                            <li className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" /><span>Interface with sensors, motors, and displays.</span></li>
                            <li className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" /><span>Build your first interactive project.</span></li>
                        </ul>
                    </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </ScrollAnimationWrapper>
      
        {/* Explore Core Topics Section */}
        <ScrollAnimationWrapper>
          <section className="w-full py-16 md:py-24 bg-background">
            <div className="container mx-auto px-4 md:px-6 space-y-12">
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Explore Our Core Topics</h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto mt-4">
                  Whether you're a beginner or looking to sharpen your skills, our tutorials cover the essential areas of electronics.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="text-center flex flex-col shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader className="items-center">
                        <div className="p-3 bg-primary/10 rounded-full w-fit mb-2">
                            <Network className="h-8 w-8 text-primary"/>
                        </div>
                        <CardTitle>Fundamental Circuit Theory</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <CardDescription>Master the essential principles of DC and AC circuits, from Ohm's Law to resonance and filters.</CardDescription>
                    </CardContent>
                    <CardContent>
                        <Button asChild variant="outline">
                            <Link href="/tutorials/dc-circuit-theory">Learn More <ArrowRight className="ml-2 h-4 w-4"/></Link>
                        </Button>
                    </CardContent>
                </Card>
                <Card className="text-center flex flex-col shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader className="items-center">
                        <div className="p-3 bg-primary/10 rounded-full w-fit mb-2">
                            <Cpu className="h-8 w-8 text-primary"/>
                        </div>
                        <CardTitle>Microcontrollers & IoT</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <CardDescription>Learn to program the brains of modern electronics. Read sensors, control motors, and connect your projects to the internet.</CardDescription>
                    </CardContent>
                    <CardContent>
                        <Button asChild variant="outline">
                            <Link href="/tutorials/esp32">Learn More <ArrowRight className="ml-2 h-4 w-4"/></Link>
                        </Button>
                    </CardContent>
                </Card>
                <Card className="text-center flex flex-col shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader className="items-center">
                        <div className="p-3 bg-primary/10 rounded-full w-fit mb-2">
                            <Lightbulb className="h-8 w-8 text-primary"/>
                        </div>
                        <CardTitle>Digital & Analog Electronics</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <CardDescription>Understand semiconductor devices, digital logic gates, and operational amplifiers to design and analyze circuits.</CardDescription>
                    </CardContent>
                    <CardContent>
                        <Button asChild variant="outline">
                            <Link href="/tutorials/digital-electronics">Learn More <ArrowRight className="ml-2 h-4 w-4"/></Link>
                        </Button>
                    </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </ScrollAnimationWrapper>
      
        <ScrollAnimationWrapper>
          <ContactCallToActionSection />
        </ScrollAnimationWrapper>
      </div>
    </div>
  );
}
