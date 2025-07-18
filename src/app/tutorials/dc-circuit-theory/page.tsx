
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
      
      <section className="text-center pt-10 pb-12 md:pt-16 md:pb-20 mb-12 rounded-xl bg-gradient-to-br from-primary/10 via-background to-background shadow-lg">
        <div className="inline-block bg-primary/10 p-3 md:p-4 rounded-full mb-4 md:mb-6">
          <Zap className="h-10 w-10 md:h-12 md:w-12 text-primary" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl">
          Master DC Circuit Theory
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-muted-foreground md:text-xl">
          A comprehensive guide to understanding and analyzing DC circuits, from fundamentals to advanced techniques.
        </p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {dcCircuitLessons.map((lesson) => {
          const LessonIcon = lesson.Icon || Zap;
          return (
          <Card key={lesson.slug} className="flex flex-col overflow-hidden shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] hover:bg-muted/30">
            <CardHeader className="p-0">
              <Link href={`/tutorials/dc-circuit-theory/${lesson.slug}`} className="block" aria-label={`View lesson: ${lesson.title}`}>
                <div className="w-full h-40 bg-primary/5 flex items-center justify-center">
                    <LessonIcon className="h-16 w-16 text-primary/80" />
                </div>
              </Link>
            </CardHeader>
            <CardContent className="flex-grow p-6 space-y-2">
              <CardTitle className="text-lg font-semibold h-12">
                 <Link href={`/tutorials/dc-circuit-theory/${lesson.slug}`} className="hover:text-primary transition-colors">
                    {lesson.title.replace(/^\d+\.\s*/, '')}
                 </Link>
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground line-clamp-3 h-[60px]">
                {lesson.description}
              </CardDescription>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <Button asChild variant="outline" className="w-full transition-colors group">
                <Link href={`/tutorials/dc-circuit-theory/${lesson.slug}`}>
                  Read Lesson <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        )})}
      </section>
    </div>
  );
}
