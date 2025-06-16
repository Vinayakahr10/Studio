
import { Breadcrumbs, type BreadcrumbItem } from '@/components/ui/breadcrumbs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Waves, BookOpen, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { oscillatorLessons } from '@/data/oscillator-lessons'; 

export default function OscillatorsTutorialPage() {
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Tutorials', href: '/tutorials' },
    { label: 'Oscillators' },
  ];

  const firstLessonSlug = oscillatorLessons[0]?.slug || 'lc-oscillator-basics';

  return (
    <div className="w-full">
      <Breadcrumbs items={breadcrumbItems} />
      
      <header className="mb-8 md:mb-12 py-8 md:py-12 bg-muted/30 rounded-lg text-center shadow">
        <div className="inline-block bg-primary/10 p-3 rounded-full mb-4">
            <Waves className="h-12 w-12 md:h-16 md:w-16 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">Oscillator Circuits Tutorials</h1>
        <p className="mt-3 md:mt-4 max-w-2xl mx-auto text-muted-foreground md:text-lg">
          Explore the fascinating world of electronic oscillators. Learn how circuits are designed to generate periodic waveforms like sine waves and square waves.
        </p>
      </header>

      <section className="mb-8">
        <Image
          src="https://placehold.co/1000x400.png"
          alt="Various oscillator circuits and waveforms"
          data-ai-hint="oscillator circuits waveforms sine square"
          width={1000}
          height={400}
          className="w-full rounded-lg object-cover shadow-lg"
        />
      </section>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl">Explore Oscillator Topics</CardTitle>
          <CardDescription>From basic LC tank circuits to stable crystal oscillators, understand how periodic signals are generated.</CardDescription>
        </CardHeader>
        <CardContent className="text-muted-foreground space-y-4">
          <p className="text-lg">
            Welcome to the EletronicswithVK Oscillator Circuits tutorial series! Oscillators are essential in electronics for generating signals used in radio, timing, and many other applications.
          </p>
          <p>
            In this series, you will learn about:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-4">
            <li>The fundamental principles of oscillation (feedback and Barkhausen criterion).</li>
            <li>LC oscillators like Hartley and Colpitts.</li>
            <li>RC oscillators such as phase-shift and Wien bridge.</li>
            <li>Crystal oscillators for high stability.</li>
            <li>Practical considerations in oscillator design.</li>
          </ul>
          <p>
            These tutorials aim to provide a clear understanding of different oscillator types and their design considerations.
          </p>
          <div className="pt-4">
            <Button asChild size="lg" className="transition-transform hover:scale-105">
              <Link href={`/tutorials/oscillators/${firstLessonSlug}`}>
                Start with the First Oscillator Lesson <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
