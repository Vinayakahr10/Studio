
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BookOpen, BrainCircuit, Cpu, Lightbulb, Wrench } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center text-center text-white">
        <Image
          src="https://lh3.googleusercontent.com/d/1b-f2Tm-l0H7bh8uzpY6v7XPGQgD3UBov"
          alt="An intricate circuit board with glowing pathways, representing the world of electronics."
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-0 brightness-[0.4]"
          priority
        />
        <div className="relative z-10 p-4 space-y-4 max-w-4xl">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Master the World of Electronics
          </h1>
          <p className="max-w-[700px] mx-auto text-lg text-primary-foreground/80 md:text-xl">
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

      {/* Introduction Section */}
      <section className="w-full py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <div className="inline-block bg-primary/10 text-primary p-3 rounded-full">
                <BrainCircuit className="h-8 w-8" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Your Journey in Electronics Starts Here.</h2>
              <p className="text-muted-foreground text-lg">
                EletronicswithVK is a comprehensive platform for students, hobbyists, and professionals. We believe in learning by doing, providing hands-on tutorials, practical projects, and a suite of tools to help you succeed.
              </p>
              <p className="text-muted-foreground">
                Whether you're soldering your first component, programming a microcontroller, or designing complex circuits, you'll find clear, concise, and reliable resources to guide you.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="https://lh3.googleusercontent.com/d/1KoEC6rWkXjXImu7dWCb7IAyLDxtj8HFA"
                alt="A collection of electronic components neatly arranged."
                width={500}
                height={500}
                className="rounded-lg object-cover shadow-xl aspect-square"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Combined Offerings Section */}
      <section className="w-full py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">What We Offer</h2>
            <p className="mt-3 max-w-2xl mx-auto text-muted-foreground md:text-lg">
                Structured learning paths and practical projects to build your skills.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            {/* Left Card - Tutorials */}
            <Card className="flex flex-col shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <BookOpen className="h-6 w-6 text-primary"/>
                  </div>
                  <CardTitle className="text-2xl">Guided Tutorials</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-grow space-y-4">
                <p className="text-muted-foreground">
                  Our tutorials are designed to take you from beginner to advanced. Start with the fundamentals in our comprehensive "Zero to Hero" guides, or dive into specific topics like AC/DC circuits, microcontrollers, and digital logic.
                </p>
                <div className="p-4 rounded-md bg-background border">
                  <h4 className="font-semibold text-primary">Featured Guide:</h4>
                  <p className="text-sm mt-1">Arduino from Zero to Hero</p>
                </div>
              </CardContent>
              <CardContent>
                 <Button asChild>
                    <Link href="/tutorials">
                      Browse All Tutorials <ArrowRight className="ml-2 h-4 w-4"/>
                    </Link>
                  </Button>
              </CardContent>
            </Card>

            {/* Right Card - Projects */}
             <Card className="flex flex-col shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                 <div className="flex items-center gap-3">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <Wrench className="h-6 w-6 text-primary"/>
                    </div>
                    <CardTitle className="text-2xl">Practical Projects</CardTitle>
                  </div>
              </CardHeader>
              <CardContent className="flex-grow space-y-4">
                <p className="text-muted-foreground">
                  Apply your knowledge with hands-on projects. Each project comes with step-by-step instructions, circuit diagrams, and code to help you build real-world electronic devices and systems.
                </p>
                 <div className="p-4 rounded-md bg-background border">
                  <h4 className="font-semibold text-primary">Featured Project:</h4>
                  <p className="text-sm mt-1">ESP32-Based IoT Weather Station</p>
                </div>
              </CardContent>
              <CardContent>
                 <Button asChild>
                    <Link href="/projects">
                      Explore All Projects <ArrowRight className="ml-2 h-4 w-4"/>
                    </Link>
                  </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

    </div>
  );
}
