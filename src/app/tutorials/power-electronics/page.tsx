
import { Breadcrumbs, type BreadcrumbItem } from '@/components/ui/breadcrumbs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BatteryCharging as PowerIcon, BookOpen, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { powerElectronicsLessons } from '@/data/power-electronics-lessons'; 

export default function PowerElectronicsTutorialPage() {
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Tutorials', href: '/tutorials' },
    { label: 'Power Electronics' },
  ];

  const firstLessonSlug = powerElectronicsLessons[0]?.slug || 'introduction-to-power-electronics';

  return (
    <div className="w-full">
      <Breadcrumbs items={breadcrumbItems} />
      
      <header className="mb-8 md:mb-12 py-8 md:py-12 bg-muted/30 rounded-lg text-center shadow">
        <div className="inline-block bg-primary/10 p-3 rounded-full mb-4">
            <PowerIcon className="h-12 w-12 md:h-16 md:w-16 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">Power Electronics Tutorials</h1>
        <p className="mt-3 md:mt-4 max-w-2xl mx-auto text-muted-foreground md:text-lg">
          Dive into the world of power conversion and control. Learn about power supplies, converters (AC-DC, DC-DC, DC-AC), and their applications.
        </p>
      </header>

      <section className="mb-8">
        <Image
          src="https://placehold.co/1000x400.png"
          alt="Power electronics components and circuit diagrams"
          data-ai-hint="power electronics converters supplies circuits"
          width={1000}
          height={400}
          className="w-full rounded-lg object-cover shadow-lg"
        />
      </section>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl">Explore Power Electronics Lessons</CardTitle>
          <CardDescription>Understand the principles of efficient power management and conversion.</CardDescription>
        </CardHeader>
        <CardContent className="text-muted-foreground space-y-4">
          <p className="text-lg">
            Welcome to the EletronicswithVK Power Electronics tutorial series! This field focuses on the processing and control of electrical power.
          </p>
          <p>
            In this series, you will learn about:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-4">
            <li>Introduction to power electronic devices and their characteristics.</li>
            <li>Rectifiers (AC-DC converters).</li>
            <li>DC-DC converters (Buck, Boost, Buck-Boost).</li>
            <li>Inverters (DC-AC converters).</li>
            <li>Design and analysis of various power supply topologies.</li>
          </ul>
          <p>
            These tutorials will cover both theoretical concepts and practical design considerations for power electronic systems.
          </p>
          <div className="pt-4">
            <Button asChild size="lg" className="transition-transform hover:scale-105">
              <Link href={`/tutorials/power-electronics/${firstLessonSlug}`}>
                Start with the First Power Electronics Lesson <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
