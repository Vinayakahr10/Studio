
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { ArrowRight, BookOpen, BrainCircuit, Wrench } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full h-[80vh] flex items-center justify-center text-center text-white">
        <Image
          src="https://lh3.googleusercontent.com/d/1KoEC6rWkXjXImu7dWCb7IAyLDxtj8HFA"
          alt="An intricate circuit board with glowing pathways, representing the world of electronics."
          layout="fill"
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

      {/* Introduction Section */}
      <section className="w-full py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-1 gap-12 items-center">
            <div className="space-y-4 text-center">
              <div className="inline-block bg-primary/10 text-primary p-3 rounded-full">
                <BrainCircuit className="h-8 w-8" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Your Journey in Electronics Starts Here.</h2>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                EletronicswithVK is a comprehensive platform for students, hobbyists, and professionals. We believe in learning by doing, providing hands-on tutorials, practical projects, and a suite of tools to help you succeed.
              </p>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                Whether you're soldering your first component, programming a microcontroller, or designing complex circuits, you'll find clear, concise, and reliable resources to guide you.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Offerings Section */}
      <section className="w-full py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6 space-y-12">
          
          {/* Guided Tutorials Section */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
            <div className="grid md:grid-cols-2 items-center">
                <div className="p-8 md:p-12">
                  <div className="p-3 bg-primary/10 rounded-full w-fit mb-4">
                      <BookOpen className="h-8 w-8 text-primary"/>
                  </div>
                  <h3 className="text-3xl font-bold">Guided Tutorials</h3>
                  <p className="mt-4 text-muted-foreground">
                    Our tutorials are designed to take you from beginner to advanced. Start with the fundamentals in our comprehensive "Zero to Hero" guides, or dive into specific topics like AC/DC circuits, microcontrollers, and digital logic.
                  </p>
                  <div className="mt-6 p-4 rounded-md bg-background border">
                    <h4 className="font-semibold text-primary">Featured Guide:</h4>
                    <p className="text-sm mt-1">Arduino from Zero to Hero</p>
                  </div>
                  <Button asChild className="mt-8">
                      <Link href="/tutorials">
                        Browse All Tutorials <ArrowRight className="ml-2 h-4 w-4"/>
                      </Link>
                  </Button>
                </div>
                <div className="h-64 md:h-full w-full">
                    <Image src="https://placehold.co/600x600.png" data-ai-hint="learning electronics tutorials" alt="A person studying electronics tutorials" width={600} height={600} className="w-full h-full object-cover" />
                </div>
            </div>
          </Card>

          {/* Practical Projects Section */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
            <div className="grid md:grid-cols-2 items-center">
                <div className="h-64 md:h-full w-full md:order-last">
                    <Image src="https://placehold.co/600x600.png" data-ai-hint="hands-on electronics project" alt="Hands-on electronics project with various components" width={600} height={600} className="w-full h-full object-cover" />
                </div>
                <div className="p-8 md:p-12">
                  <div className="p-3 bg-primary/10 rounded-full w-fit mb-4">
                      <Wrench className="h-8 w-8 text-primary"/>
                  </div>
                  <h3 className="text-3xl font-bold">Practical Projects</h3>
                  <p className="mt-4 text-muted-foreground">
                    Apply your knowledge with hands-on projects. Each project comes with step-by-step instructions, circuit diagrams, and code to help you build real-world electronic devices and systems.
                  </p>
                   <div className="mt-6 p-4 rounded-md bg-background border">
                    <h4 className="font-semibold text-primary">Featured Project:</h4>
                    <p className="text-sm mt-1">ESP32-Based IoT Weather Station</p>
                  </div>
                   <Button asChild className="mt-8">
                      <Link href="/projects">
                        Explore All Projects <ArrowRight className="ml-2 h-4 w-4"/>
                      </Link>
                  </Button>
                </div>
            </div>
          </Card>

        </div>
      </section>

    </div>
  );
}
