
import { getACCircuitLessonBySlug, acCircuitLessons, type ACCircuitLesson } from '@/data/ac-circuits-lessons'; 
import { Breadcrumbs, type BreadcrumbItem } from '@/components/ui/breadcrumbs';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, AlertTriangle, Activity } from 'lucide-react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

interface LessonPageProps {
  params: {
    lessonSlug: string;
  };
}

export async function generateStaticParams() {
  return acCircuitLessons.map((lesson) => ({
    lessonSlug: lesson.slug,
  }));
}

export async function generateMetadata({ params }: LessonPageProps) {
  const lesson = getACCircuitLessonBySlug(params.lessonSlug);
  if (!lesson) {
    return {
      title: 'Lesson Not Found - EletronicswithVK',
    };
  }
  return {
    title: `${lesson.mainTitle || lesson.title} - AC Circuits - EletronicswithVK`,
    description: lesson.description,
  };
}

export default function ACCircuitLessonPage({ params }: LessonPageProps) {
  const lesson = getACCircuitLessonBySlug(params.lessonSlug);

  if (!lesson) {
    notFound(); 
  }

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Tutorials', href: '/tutorials' },
    { label: 'AC Circuits', href: '/tutorials/ac-circuits' },
    { label: lesson.title.replace(/^\d+\.\s*/, '') }, 
  ];

  const currentIndex = acCircuitLessons.findIndex(l => l.slug === lesson.slug);
  const prevLesson = currentIndex > 0 ? acCircuitLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < acCircuitLessons.length - 1 ? acCircuitLessons[currentIndex + 1] : null;
  const TopicIcon = lesson.Icon || Activity; // Default icon

  return (
    <article className="w-full">
      <Breadcrumbs items={breadcrumbItems} />
      
      <header className="mb-8 md:mb-10 pb-6 border-b">
         <div className="flex items-center text-primary mb-3">
            <TopicIcon className="h-7 w-7 mr-2.5" />
            <span className="text-sm font-medium tracking-wide uppercase">AC CIRCUIT THEORY</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            {lesson.mainTitle || lesson.title}
            </h1>
        </div>
        {lesson.description && (
            <p className="mt-3 text-lg text-muted-foreground">{lesson.description}</p>
        )}
      </header>

      <Card className="mt-6 shadow-lg">
        <CardContent className="pt-6">
          <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl dark:prose-invert max-w-none 
                          prose-headings:font-semibold prose-headings:text-foreground 
                          prose-p:text-muted-foreground prose-li:text-muted-foreground
                          prose-a:text-primary hover:prose-a:underline
                          prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-sm prose-code:text-foreground
                          prose-pre:bg-background prose-pre:shadow-md
                          ">
            {lesson.content}
          </div>
        </CardContent>
      </Card>

      <Separator className="my-8 md:my-12" />

      <nav className="flex flex-col sm:flex-row sm:justify-between items-stretch sm:items-center gap-4">
        <div className="flex-1 sm:flex-initial">
          {prevLesson && (
            <Button asChild variant="outline" className="w-full sm:w-auto justify-start">
              <Link href={`/tutorials/ac-circuits/${prevLesson.slug}`} className="flex items-center">
                <ChevronLeft className="mr-2 h-4 w-4" />
                <span className="truncate">Previous: {prevLesson.title.replace(/^\d+\.\s*/, '')}</span>
              </Link>
            </Button>
          )}
        </div>

        <div className="flex-1 sm:flex-initial sm:ml-auto"> 
          {nextLesson && (
            <Button asChild variant="outline" className="w-full sm:w-auto justify-end">
              <Link href={`/tutorials/ac-circuits/${nextLesson.slug}`} className="flex items-center">
                <span className="truncate">Next: {nextLesson.title.replace(/^\d+\.\s*/, '')}</span>
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>
      </nav>
    </article>
  );
}
