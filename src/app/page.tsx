
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BookOpen, BrainCircuit, Cpu, Lightbulb, Wrench } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FeaturedProjectsSection } from '@/components/sections/FeaturedProjectsSection';
import { TutorialCategoriesSection } from '@/components/sections/TutorialCategoriesSection';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center text-center text-white">
        <Image
          src="/images/hero-image.jpg"
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
            <div className="grid grid-cols-2 gap-4">
              <Card className="text-center shadow-sm hover:shadow-lg transition-shadow">
                <CardHeader className="p-4">
                  <BookOpen className="h-8 w-8 mx-auto text-primary" />
                  <CardTitle className="mt-2 text-lg">In-Depth Tutorials</CardTitle>
                </CardHeader>
              </Card>
               <Card className="text-center shadow-sm hover:shadow-lg transition-shadow">
                <CardHeader className="p-4">
                  <Wrench className="h-8 w-8 mx-auto text-primary" />
                  <CardTitle className="mt-2 text-lg">Hands-On Projects</CardTitle>
                </CardHeader>
              </Card>
               <Card className="text-center shadow-sm hover:shadow-lg transition-shadow">
                <CardHeader className="p-4">
                  <Cpu className="h-8 w-8 mx-auto text-primary" />
                  <CardTitle className="mt-2 text-lg">Modern Topics</CardTitle>
                </CardHeader>
              </Card>
               <Card className="text-center shadow-sm hover:shadow-lg transition-shadow">
                <CardHeader className="p-4">
                  <Lightbulb className="h-8 w-8 mx-auto text-primary" />
                  <CardTitle className="mt-2 text-lg">Clear Explanations</CardTitle>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <FeaturedProjectsSection />
      
      {/* Featured Categories Section */}
      <TutorialCategoriesSection />

    </div>
  );
}
