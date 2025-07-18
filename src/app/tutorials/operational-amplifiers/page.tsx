
import { Breadcrumbs, type BreadcrumbItem } from '@/components/ui/breadcrumbs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Triangle as OpAmpIcon, BookOpen, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { opAmpLessons } from '@/data/operational-amplifiers-lessons'; 

export default function OperationalAmplifiersTutorialPage() {
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Tutorials', href: '/tutorials' },
    { label: 'Operational Amplifiers' },
  ];

  const firstLessonSlug = opAmpLessons[0]?.slug || 'introduction-to-op-amps';

  return (
    <div className="w-full">
      <Breadcrumbs items={breadcrumbItems} />
      
      <header className="mb-8 md:mb-12 py-8 md:py-12 bg-muted/30 rounded-lg text-center shadow">
        <div className="inline-block bg-primary/10 p-3 rounded-full mb-4">
            <OpAmpIcon className="h-12 w-12 md:h-16 md:w-16 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">Operational Amplifier Tutorials</h1>
        <p className="mt-3 md:mt-4 max-w-2xl mx-auto text-muted-foreground md:text-lg">
          Master operational amplifiers (Op-Amps), from their ideal characteristics to practical applications in amplification, filtering, and signal conditioning.
        </p>
      </header>

      <section className="mb-8">
        <Image
          src="https://lh3.googleusercontent.com/d/1Syvg1EnUBduCAxtL1N9TrsHIIG7asWhf"
          alt="Operational amplifier circuits and applications"
          data-ai-hint="opamp circuits amplifier filter"
          width={1000}
          height={400}
          className="w-full rounded-lg object-cover shadow-lg"
        />
      </section>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl">Explore Op-Amp Lessons</CardTitle>
          <CardDescription>Dive into the versatile world of operational amplifiers.</CardDescription>
        </CardHeader>
        <CardContent className="text-muted-foreground space-y-4">
          <p className="text-lg">
            Welcome to the EletronicswithVK Operational Amplifier tutorial series! Op-Amps are high-gain voltage amplifiers and are fundamental building blocks in analog electronics.
          </p>
          <p>
            In this series, you will learn about:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-4">
            <li>Ideal and practical characteristics of Op-Amps.</li>
            <li>Basic Op-Amp configurations like inverting and non-inverting amplifiers.</li>
            <li>Applications such as summing amplifiers, difference amplifiers, integrators, and differentiators.</li>
            <li>Op-Amps in active filters and oscillators.</li>
            <li>Comparators and other non-linear applications.</li>
          </ul>
          <p>
            These tutorials will equip you with the knowledge to analyze and design a wide range of analog circuits using Op-Amps.
          </p>
          <div className="pt-4">
            <Button asChild size="lg" className="transition-transform hover:scale-105">
              <Link href={`/tutorials/operational-amplifiers/${firstLessonSlug}`}>
                Start with the First Op-Amp Lesson <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
