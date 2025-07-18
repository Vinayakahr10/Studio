
import { getArduinoLessonBySlug, arduinoTutorialLessons, type ArduinoLesson } from '@/data/arduino-tutorial-data.tsx'; 
import { ChevronLeft, ChevronRight } from 'lucide-react';
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
      title: 'Lesson Not Found - EletronicswithVK',
    };
  }
  return {
    title: `${lesson.title} - Arduino Tutorial - EletronicswithVK`,
    description: lesson.description,
  };
}

export default function ArduinoLessonPage({ params }: LessonPageProps) {
  const lesson = getArduinoLessonBySlug(params.lessonSlug);

  if (!lesson) {
    notFound(); // Triggers the not-found page
  }

  const currentIndex = arduinoTutorialLessons.findIndex(l => l.slug === lesson.slug);
  const prevLesson = currentIndex > 0 ? arduinoTutorialLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < arduinoTutorialLessons.length - 1 ? arduinoTutorialLessons[currentIndex + 1] : null;

  return (
    <article className="w-full">
      <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl dark:prose-invert max-w-none 
                      prose-headings:font-semibold prose-headings:text-foreground 
                      prose-p:text-muted-foreground prose-li:text-muted-foreground
                      prose-a:text-primary hover:prose-a:underline
                      prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-sm prose-code:text-foreground
                      prose-pre:bg-background prose-pre:shadow-md
                      ">
        <h1>{lesson.mainTitle || lesson.title}</h1>
        {lesson.content}
      </div>

      <Separator className="my-8 md:my-12" />

      <nav className="flex flex-col sm:flex-row sm:justify-between items-stretch sm:items-center gap-4">
        {/* Previous Button Slot */}
        <div className="flex-1 sm:flex-initial"> {/* Allow shrinking on larger screens */}
          {prevLesson && (
            <Button asChild variant="outline" className="w-full sm:w-auto justify-start">
              <Link href={`/tutorials/arduino/${prevLesson.slug}`} className="flex items-center">
                <ChevronLeft className="mr-2 h-4 w-4" />
                <span>Previous: {prevLesson.title}</span>
              </Link>
            </Button>
          )}
        </div>

        {/* Next Button Slot */}
        <div className="flex-1 sm:flex-initial sm:ml-auto"> {/* Allow shrinking on larger screens and push to right */}
          {nextLesson && (
            <Button asChild variant="outline" className="w-full sm:w-auto justify-end">
              <Link href={`/tutorials/arduino/${nextLesson.slug}`} className="flex items-center">
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
