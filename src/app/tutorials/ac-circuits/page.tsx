
import { Breadcrumbs, type BreadcrumbItem } from '@/components/ui/breadcrumbs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Activity, BookOpen, ChevronRight } from 'lucide-react'; 
import Link from 'next/link';
import Image from 'next/image';
import { acCircuitLessons } from '@/data/ac-circuits-lessons'; 

export default function ACCircuitTutorialPage() {
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Tutorials', href: '/tutorials' },
    { label: 'AC Circuits' },
  ];

  const firstLessonSlug = acCircuitLessons[0]?.slug || 'introduction-to-ac-circuits';

  return (
    <div className="w-full">
      <Breadcrumbs items={breadcrumbItems} />
      
      <header className="mb-8 md:mb-12 py-8 md:py-12 bg-muted/30 rounded-lg text-center shadow">
        <div className="inline-block bg-primary/10 p-3 rounded-full mb-4">
            <Activity className="h-12 w-12 md:h-16 md:w-16 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">AC Circuits Tutorials</h1>
        <p className="mt-3 md:mt-4 max-w-2xl mx-auto text-muted-foreground md:text-lg">
          Dive into Alternating Current (AC) circuits. Learn about sine waves, phasors, impedance, resonance, filters, and transformers.
        </p>
      </header>

      <section className="mb-8">
        <Image
          src="https://placehold.co/1000x400.png"
          alt="AC Circuit concepts and components"
          data-ai-hint="ac circuits transformer inductor capacitor"
          width={1000}
          height={400}
          className="w-full rounded-lg object-cover shadow-lg"
        />
      </section>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl">Explore AC Circuit Lessons</CardTitle>
          <CardDescription>Start with the fundamentals or jump into specific topics on AC analysis.</CardDescription>
        </CardHeader>
        <CardContent className="text-muted-foreground space-y-4">
          <p className="text-lg">
            Welcome to the EletronicswithVK AC Circuits tutorial series! This section will guide you through the essential principles of alternating current.
          </p>
          <p>
            In this series, you will:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-4">
            <li>Understand AC waveforms, frequency, phase, and RMS values.</li>
            <li>Analyze circuits with resistors, capacitors, and inductors (RLC circuits).</li>
            <li>Learn about impedance, reactance, and phasor diagrams.</li>
            <li>Explore concepts like resonance, filters, and transformers.</li>
            <li>Apply AC circuit theory to practical applications.</li>
          </ul>
          <p>
            A solid understanding of DC circuits is recommended before diving deep into AC theory.
          </p>
          <div className="pt-4">
            <Button asChild size="lg" className="transition-transform hover:scale-105">
              <Link href={`/tutorials/ac-circuits/${firstLessonSlug}`}>
                Start with the First AC Lesson <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
