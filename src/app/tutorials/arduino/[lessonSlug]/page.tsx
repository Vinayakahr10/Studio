
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
      <div className="prose dark:prose-invert max-w-none 
                      prose-h1:text-4xl prose-h1:font-extrabold prose-h1:tracking-tight prose-h1:mb-4 prose-h1:pb-2 prose-h1:border-b prose-h1:border-primary/50
                      prose-h2:text-3xl prose-h2:font-bold prose-h2:mt-10 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b
                      prose-h3:text-2xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-4
                      prose-p:leading-8 prose-p:[&:not(:first-child)]:mt-6 prose-p:text-lg
                      prose-a:text-primary prose-a:font-medium hover:prose-a:underline
                      prose-ul:mt-6 prose-ul:ml-6 prose-ul:list-disc prose-li:mt-2
                      prose-ol:mt-6 prose-ol:ml-6 prose-ol:list-decimal prose-li:mt-2
                      prose-blockquote:mt-6 prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-muted-foreground
                      prose-code:bg-muted prose-code:px-1.5 prose-code:py-1 prose-code:rounded-md prose-code:font-mono prose-code:text-sm prose-code:text-primary
                      prose-pre:bg-background/95 prose-pre:shadow-lg prose-pre:rounded-lg
                      ">
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
