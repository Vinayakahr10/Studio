
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight, BookOpen, Wrench, Package, BrainCircuit } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FeaturedProjectsSection } from '@/components/sections/FeaturedProjectsSection';
import { ContactCallToActionSection } from '@/components/sections/ContactCallToActionSection';
import { TutorialCategoriesSection } from '@/components/sections/TutorialCategoriesSection';

const featuredTutorialCategories = [
  { id: 'arduino', name: 'Arduino', Icon: BrainCircuit, href: '/tutorials/arduino', description: 'Master the most popular microcontroller for beginners and pros alike.' },
  { id: 'esp32', name: 'ESP32 & IoT', Icon: Package, href: '/tutorials/esp32', description: 'Dive into the Internet of Things with WiFi and Bluetooth projects.' },
  { id: 'dc-circuit-theory', name: 'DC Circuit Theory', Icon: BookOpen, href: '/tutorials/dc-circuit-theory', description: 'Learn the fundamental principles that govern all electronics.' },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full h-[70vh] min-h-[400px] flex items-center justify-center text-center text-white">
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

      {/* What We Offer Section */}
      <section className="w-full py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What We Offer</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mt-4">
              Everything you need to succeed in your electronics journey, all in one place.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <Card className="shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <CardHeader>
                <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-3">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Comprehensive Tutorials</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Step-by-step guides on everything from basic DC theory to advanced microcontroller programming.
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <CardHeader>
                <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-3">
                  <Wrench className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Hands-On Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Apply your knowledge with practical, real-world projects complete with code and circuit diagrams.
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <CardHeader>
                <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-3">
                  <Package className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Practical Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  A suite of online calculators and tools to simplify your electronics calculations and designs.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Featured Tutorials Section */}
      <section className="w-full py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6 space-y-12">
           <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Start Your Learning Path</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mt-4">
              Dive into our most popular tutorial series and begin building your skills today.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredTutorialCategories.map((category) => {
              const Icon = category.Icon;
              return (
                <Card key={category.id} className="flex flex-col shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]">
                  <CardHeader className="items-center text-center">
                    <div className="p-4 bg-primary/10 rounded-full w-fit mb-3">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{category.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow text-center">
                    <CardDescription>{category.description}</CardDescription>
                  </CardContent>
                  <CardContent className="text-center">
                    <Button asChild>
                      <Link href={category.href}>Start Tutorial <ArrowRight className="ml-2 h-4 w-4"/></Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* Featured Projects Section */}
      <FeaturedProjectsSection />

      {/* CTA Section */}
      <ContactCallToActionSection />

    </div>
  );
}
