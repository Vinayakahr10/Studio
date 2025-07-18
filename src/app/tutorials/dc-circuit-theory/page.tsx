
import { Zap, BookOpen, UserCheck, Settings, Sigma, FileText, AlertTriangle, CheckCircle2, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
      
      <header className="text-center pt-10 pb-12 md:pt-16 md:pb-20 mb-12 rounded-xl bg-gradient-to-br from-primary/10 via-background to-background shadow-lg">
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

      <section className="space-y-4">
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dcCircuitLessons.map((lesson) => {
            const LessonIcon = lesson.Icon || Zap;
            return (
              <li key={lesson.slug}>
                <Link href={`/tutorials/dc-circuit-theory/${lesson.slug}`} className="block p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <LessonIcon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{lesson.title.replace(/^\d+\.\s*/, '')}</h3>
                      <p className="text-sm text-muted-foreground">{lesson.description}</p>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
