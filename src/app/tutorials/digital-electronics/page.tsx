
import { Breadcrumbs, type BreadcrumbItem } from '@/components/ui/breadcrumbs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Binary as DigitalIcon, BookOpen, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { digitalElectronicsLessons } from '@/data/digital-electronics-lessons'; 

export default function DigitalElectronicsTutorialPage() {
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Tutorials', href: '/tutorials' },
    { label: 'Digital Electronics' },
  ];

  const firstLessonSlug = digitalElectronicsLessons[0]?.slug || 'introduction-to-digital-electronics';

  return (
    <div className="w-full">
      <Breadcrumbs items={breadcrumbItems} />
      
      <header className="mb-8 md:mb-12 py-8 md:py-12 bg-muted/30 rounded-lg text-center shadow">
        <div className="inline-block bg-primary/10 p-3 rounded-full mb-4">
            <DigitalIcon className="h-12 w-12 md:h-16 md:w-16 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">Digital Electronics Tutorials</h1>
        <p className="mt-3 md:mt-4 max-w-2xl mx-auto text-muted-foreground md:text-lg">
          Explore the world of digital logic, from binary numbers and Boolean algebra to complex combinational and sequential circuits.
        </p>
      </header>

      <section className="mb-8">
        <Image
          src="https://placehold.co/1000x400.png"
          alt="Digital logic gates and circuits"
          data-ai-hint="digital logic gates circuits"
          width={1000}
          height={400}
          className="w-full rounded-lg object-cover shadow-lg"
        />
      </section>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl">Explore Digital Electronics Lessons</CardTitle>
          <CardDescription>Start with the fundamentals or jump into specific topics on digital logic design.</CardDescription>
        </CardHeader>
        <CardContent className="text-muted-foreground space-y-4">
          <p className="text-lg">
            Welcome to the EletronicswithVK Digital Electronics tutorial series! This section will guide you through the essential principles of digital systems.
          </p>
          <p>
            In this series, you will learn about:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-4">
            <li>Number systems (Binary, Hexadecimal) and their conversions.</li>
            <li>Logic gates (AND, OR, NOT, XOR, NAND, NOR) and their truth tables.</li>
            <li>Boolean algebra and logic simplification techniques.</li>
            <li>Combinational logic circuits like adders, multiplexers, and decoders.</li>
            <li>Sequential logic circuits including flip-flops, counters, and registers.</li>
          </ul>
          <p>
            These tutorials are designed to build a strong foundation in digital electronics, crucial for understanding modern computing and embedded systems.
          </p>
          <div className="pt-4">
            <Button asChild size="lg" className="transition-transform hover:scale-105">
              <Link href={`/tutorials/digital-electronics/${firstLessonSlug}`}>
                Start with the First Digital Lesson <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
