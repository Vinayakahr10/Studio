
import { Breadcrumbs, type BreadcrumbItem } from '@/components/ui/breadcrumbs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BatteryCharging as PowerIcon, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { powerElectronicsLessons } from '@/data/power-electronics-lessons';

export default function PowerElectronicsTutorialPage() {
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Tutorials', href: '/tutorials' },
    { label: 'Power Electronics' },
  ];

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
      
      <Card>
        <CardHeader>
          <CardTitle>All Lessons</CardTitle>
          <CardDescription>Browse through the complete list of lessons in the Power Electronics series.</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {powerElectronicsLessons.map((lesson) => (
              <li key={lesson.slug}>
                <Link href={`/tutorials/power-electronics/${lesson.slug}`} className="block p-4 rounded-md transition-colors hover:bg-muted/50">
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
