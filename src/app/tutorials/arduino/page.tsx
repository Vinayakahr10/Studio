
import { Breadcrumbs, type BreadcrumbItem } from '@/components/ui/breadcrumbs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cpu } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { arduinoTutorialLessons } from '@/data/arduino-tutorial-data';

export default function ArduinoTutorialPage() {
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Tutorials', href: '/tutorials' },
    { label: 'Arduino Tutorial' },
  ];

  const firstLessonSlug = arduinoTutorialLessons[0]?.slug || 'introduction';

  return (
    <div className="w-full">
      <Breadcrumbs items={breadcrumbItems} />
      
      <header className="mb-8 md:mb-12 py-8 md:py-12 bg-muted/30 rounded-lg text-center shadow">
        <div className="inline-block bg-primary/10 p-3 rounded-full mb-4">
            <Cpu className="h-12 w-12 md:h-16 md:w-16 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">Arduino Tutorial</h1>
        <p className="mt-3 md:mt-4 max-w-2xl mx-auto text-muted-foreground md:text-lg">
          Master the fundamentals of Arduino programming and electronics. Start your journey from basics to building exciting projects.
        </p>
      </header>

      <section className="mb-8">
        <Image
          src="https://placehold.co/1000x400.png"
          alt="Arduino board and components"
          data-ai-hint="arduino components setup"
          width={1000}
          height={400}
          className="w-full rounded-lg object-cover shadow-lg"
        />
      </section>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl">Get Started with Arduino</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground space-y-4">
          <p className="text-lg">
            Welcome to the ElectroLearn Arduino Tutorial series! This comprehensive guide is designed for beginners and hobbyists looking to dive into the exciting world of microcontrollers and electronics.
          </p>
          <p>
            In this series, you will:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-4">
            <li>Understand what Arduino is and its capabilities.</li>
            <li>Set up your development environment (Arduino IDE).</li>
            <li>Learn the basics of C/C++ programming for Arduino.</li>
            <li>Interface with sensors, LEDs, motors, and other components.</li>
            <li>Build a variety of fun and practical projects.</li>
          </ul>
          <p>
            No prior electronics or programming experience is required, though any basic understanding will be helpful. We'll start from the very beginning and build up your skills step by step.
          </p>
          <div className="pt-4">
            <Button asChild size="lg" className="transition-transform hover:scale-105">
              <Link href={`/tutorials/arduino/${firstLessonSlug}`}>
                Start with the Introduction <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
// Helper icon, not used in UI directly but might be needed by other components
import { ChevronRight } from 'lucide-react'; 
