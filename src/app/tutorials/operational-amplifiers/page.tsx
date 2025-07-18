
import { Breadcrumbs, type BreadcrumbItem } from '@/components/ui/breadcrumbs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Triangle as OpAmpIcon, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { opAmpLessons } from '@/data/operational-amplifiers-lessons';

export default function OperationalAmplifiersTutorialPage() {
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Tutorials', href: '/tutorials' },
    { label: 'Operational Amplifiers' },
  ];

  return (
    <div className="w-full">
      <Breadcrumbs items={breadcrumbItems} />
      
      <header className="mb-8 md:mb-12 py-8 md:py-12 bg-muted/30 rounded-lg text-center shadow">
        <div className="flex justify-center mb-4">
            <Image
              src="https://lh3.googleusercontent.com/d/1Syvg1EnUBduCAxtL1N9TrsHIIG7asWhf"
              alt="Operational Amplifier Icon"
              data-ai-hint="opamp symbol"
              width={100}
              height={100}
              className="rounded-full bg-primary/10 p-3 shadow-md h-auto"
              style={{height: 'auto'}}
            />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">Operational Amplifier Tutorials</h1>
        <p className="mt-3 md:mt-4 max-w-2xl mx-auto text-muted-foreground md:text-lg">
          Master operational amplifiers (Op-Amps), from their ideal characteristics to practical applications in amplification, filtering, and signal conditioning.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>All Lessons</CardTitle>
          <CardDescription>Browse through the complete list of lessons in the Operational Amplifiers series.</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {opAmpLessons.map((lesson) => (
              <li key={lesson.slug}>
                <Link href={`/tutorials/operational-amplifiers/${lesson.slug}`} className="block p-4 rounded-md transition-colors hover:bg-muted/50">
                  <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-primary">{lesson.title.replace(/^\d+\.\s*/, '')}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{lesson.description}</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
