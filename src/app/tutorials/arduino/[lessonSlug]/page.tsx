
import { getArduinoLessonBySlug, arduinoTutorialLessons, type ArduinoLesson } from '@/data/arduino-tutorial-data.tsx'; 
import { Breadcrumbs, type BreadcrumbItem } from '@/components/ui/breadcrumbs';
import { Cpu, ChevronLeft, ChevronRight } from 'lucide-react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface LessonPageProps {
  params: {
    lessonSlug: string;
  };
}

// Generate static paths for all lessons
export async function generateStaticParams() {
  return arduinoTutorialLessons.map((lesson) => ({
    lessonSlug: lesson.slug,
  }));
}

export async function generateMetadata({ params }: LessonPageProps) {
  const lesson = getArduinoLessonBySlug(params.lessonSlug);
  if (!lesson) {
    return {
      title: 'Lesson Not Found - ElectroLearn',
    };
  }
  return {
    title: `${lesson.title} - Arduino Tutorial - ElectroLearn`,
    description: lesson.description,
  };
}

export default function ArduinoLessonPage({ params }: LessonPageProps) {
  const lesson = getArduinoLessonBySlug(params.lessonSlug);

  if (!lesson) {
    notFound(); // Triggers the not-found page
  }

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Tutorials', href: '/tutorials' },
    { label: 'Arduino Tutorial', href: '/tutorials/arduino' },
    { label: lesson.title },
  ];

  const currentIndex = arduinoTutorialLessons.findIndex(l => l.slug === lesson.slug);
  const prevLesson = currentIndex > 0 ? arduinoTutorialLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < arduinoTutorialLessons.length - 1 ? arduinoTutorialLessons[currentIndex + 1] : null;

  return (
    <article className="w-full">
      <Breadcrumbs items={breadcrumbItems} />
      
      <header className="mb-8 md:mb-10 pb-6 border-b">
         <div className="flex items-center text-primary mb-2">
            <Cpu className="h-7 w-7 mr-2" />
            <span className="text-sm font-medium tracking-wide">ARDUINO TUTORIAL</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
          {lesson.mainTitle || lesson.title}
        </h1>
        {lesson.description && (
            <p className="mt-2 text-lg text-muted-foreground">{lesson.description}</p>
        )}
      </header>

      <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl dark:prose-invert max-w-none 
                      prose-headings:font-semibold prose-headings:text-foreground 
                      prose-p:text-muted-foreground prose-li:text-muted-foreground
                      prose-a:text-primary hover:prose-a:underline
                      prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-sm prose-code:text-foreground
                      prose-pre:bg-background prose-pre:shadow-md
                      ">
        {lesson.content}
      </div>

      <Separator className="my-8 md:my-12" />

      <nav className="flex flex-col sm:flex-row sm:justify-between items-stretch sm:items-center gap-4">
        {/* Previous Button Slot */}
        <div className="flex-1 sm:flex-initial"> {/* Allow shrinking on larger screens */}
          {prevLesson && (
            <Button asChild variant="outline" className="w-full sm:w-auto">
              <Link href={`/tutorials/arduino/${prevLesson.slug}`} className="flex items-center justify-center sm:justify-start">
                <ChevronLeft className="mr-2 h-4 w-4" />
                <span>Previous: {prevLesson.title}</span>
              </Link>
            </Button>
          )}
        </div>

        {/* Next Button Slot */}
        <div className="flex-1 sm:flex-initial"> {/* Allow shrinking on larger screens */}
          {nextLesson && (
            <Button asChild variant="outline" className="w-full sm:w-auto">
              <Link href={`/tutorials/arduino/${nextLesson.slug}`} className="flex items-center justify-center sm:justify-end">
                <span>Next: {nextLesson.title}</span>
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>
      </nav>
    </article>
  );
}
