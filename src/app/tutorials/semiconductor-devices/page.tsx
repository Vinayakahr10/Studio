
import { Breadcrumbs, type BreadcrumbItem } from '@/components/ui/breadcrumbs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Chip as SemiconductorIcon, BookOpen, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { semiconductorDeviceLessons } from '@/data/semiconductor-devices-lessons'; 

export default function SemiconductorDevicesTutorialPage() {
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Tutorials', href: '/tutorials' },
    { label: 'Semiconductor Devices' },
  ];

  const firstLessonSlug = semiconductorDeviceLessons[0]?.slug || 'introduction-to-semiconductors';

  return (
    <div className="w-full">
      <Breadcrumbs items={breadcrumbItems} />
      
      <header className="mb-8 md:mb-12 py-8 md:py-12 bg-muted/30 rounded-lg text-center shadow">
        <div className="inline-block bg-primary/10 p-3 rounded-full mb-4">
            <SemiconductorIcon className="h-12 w-12 md:h-16 md:w-16 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">Semiconductor Device Tutorials</h1>
        <p className="mt-3 md:mt-4 max-w-2xl mx-auto text-muted-foreground md:text-lg">
          Learn about diodes, transistors (BJT, FETs), thyristors, and other essential semiconductor components that form the backbone of modern electronics.
        </p>
      </header>

      <section className="mb-8">
        <Image
          src="https://placehold.co/1000x400.png"
          alt="Various semiconductor devices like diodes, transistors, ICs"
          data-ai-hint="semiconductor devices diodes transistors ics"
          width={1000}
          height={400}
          className="w-full rounded-lg object-cover shadow-lg"
        />
      </section>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl">Explore Semiconductor Device Lessons</CardTitle>
          <CardDescription>Understand the principles and applications of key semiconductor devices.</CardDescription>
        </CardHeader>
        <CardContent className="text-muted-foreground space-y-4">
          <p className="text-lg">
            Welcome to the EletronicswithVK Semiconductor Devices tutorial series! This section delves into the characteristics and uses of crucial components that enable electronic circuits.
          </p>
          <p>
            In this series, you will learn about:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-4">
            <li>The basics of semiconductor physics.</li>
            <li>Diodes: PN junction, Zener, LED, Schottky, and their applications.</li>
            <li>Bipolar Junction Transistors (BJTs): NPN, PNP, operation as switches and amplifiers.</li>
            <li>Field-Effect Transistors (FETs): JFETs, MOSFETs (enhancement, depletion), and their uses.</li>
            <li>Thyristors like SCRs and TRIACs for power control.</li>
          </ul>
          <p>
            These tutorials aim to provide a solid understanding of how these devices work and how to use them effectively in circuit design.
          </p>
          <div className="pt-4">
            <Button asChild size="lg" className="transition-transform hover:scale-105">
              <Link href={`/tutorials/semiconductor-devices/${firstLessonSlug}`}>
                Start with the First Semiconductor Lesson <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
