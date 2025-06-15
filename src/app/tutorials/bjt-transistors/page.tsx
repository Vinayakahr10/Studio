
import { Breadcrumbs, type BreadcrumbItem } from '@/components/ui/breadcrumbs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ToggleRight, BookOpen, ChevronRight } from 'lucide-react'; 
import Link from 'next/link';
import Image from 'next/image';
import { bjtTutorialLessons } from '@/data/bjt-transistor-lessons'; 

export default function BJTTutorialPage() {
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Tutorials', href: '/tutorials' },
    { label: 'BJT Transistor Tutorials' },
  ];

  const firstLessonSlug = bjtTutorialLessons[0]?.slug || 'introduction-to-bjt';

  return (
    <div className="w-full">
      <Breadcrumbs items={breadcrumbItems} />
      
      <header className="mb-8 md:mb-12 py-8 md:py-12 bg-muted/30 rounded-lg text-center shadow">
        <div className="inline-block bg-primary/10 p-3 rounded-full mb-4">
            <ToggleRight className="h-12 w-12 md:h-16 md:w-16 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">BJT Transistor Tutorials</h1>
        <p className="mt-3 md:mt-4 max-w-2xl mx-auto text-muted-foreground md:text-lg">
          Learn about Bipolar Junction Transistors (BJTs), their types (NPN, PNP), operating modes, and common applications like switching and amplification.
        </p>
      </header>

      <section className="mb-8">
        <Image
          src="https://placehold.co/1000x400.png"
          alt="Various BJT transistors and circuit diagrams"
          data-ai-hint="bjt transistors circuits variety"
          width={1000}
          height={400}
          className="w-full rounded-lg object-cover shadow-lg"
        />
      </section>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl">Explore BJT Transistor Lessons</CardTitle>
          <CardDescription>Dive into specific topics or follow our guided lessons below.</CardDescription>
        </CardHeader>
        <CardContent className="text-muted-foreground space-y-4">
          <p className="text-lg">
            Welcome to the EletronicswithVK BJT Transistor tutorial series! Bipolar Junction Transistors are fundamental semiconductor devices used for amplification and switching applications.
          </p>
          <p>
            In this series, you will:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-4">
            <li>Understand the basic structure and operation of NPN and PNP transistors.</li>
            <li>Learn about the different operating regions: cutoff, active, and saturation.</li>
            <li>Explore how to use BJTs as electronic switches.</li>
            <li>Discover basic BJT amplifier configurations.</li>
            <li>Analyze BJT circuits using characteristic curves and parameters.</li>
          </ul>
          <p>
            These tutorials aim to provide a clear understanding of BJT theory and practical usage.
          </p>
          <div className="pt-4">
            <Button asChild size="lg" className="transition-transform hover:scale-105">
              <Link href={`/tutorials/bjt-transistors/${firstLessonSlug}`}>
                Start with the First BJT Lesson <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
