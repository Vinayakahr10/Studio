
import { Zap, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';
import { dcCircuitLessons } from '@/data/dc-circuit-theory-lessons';
import { Breadcrumbs, type BreadcrumbItem } from '@/components/ui/breadcrumbs';

export default function DCCircuitsTutorialPage() {
    const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Tutorials', href: '/tutorials' },
    { label: 'DC Circuit Theory' },
  ];

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12 selection:bg-primary/20">
      <Breadcrumbs items={breadcrumbItems} />
      
      <header className="mb-8 md:mb-12 py-8 md:py-12 bg-muted/30 rounded-lg text-center shadow">
        <div className="inline-block bg-primary/10 p-3 md:p-4 rounded-full mb-4 md:mb-6">
          <Zap className="h-10 w-10 md:h-12 md:w-12 text-primary" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl">
          Master DC Circuit Theory
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-muted-foreground md:text-xl">
          A comprehensive guide to understanding and analyzing DC circuits, from fundamentals to advanced techniques.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>All Lessons</CardTitle>
          <CardDescription>Browse through the complete list of lessons in the DC Circuit Theory series.</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {dcCircuitLessons.map((lesson) => (
              <li key={lesson.slug}>
                <Link href={`/tutorials/dc-circuit-theory/${lesson.slug}`} className="block p-4 rounded-md transition-colors hover:bg-muted/50">
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
