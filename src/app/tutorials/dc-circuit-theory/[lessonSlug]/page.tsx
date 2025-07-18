
import { getDCCircuitLessonBySlug, dcCircuitLessons } from '@/data/dc-circuit-theory-lessons'; 
import { notFound } from 'next/navigation';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface LessonPageProps {
  params: {
    lessonSlug: string;
  };
}

export async function generateStaticParams() {
  return dcCircuitLessons.map((lesson) => ({
    lessonSlug: lesson.slug,
  }));
}

export async function generateMetadata({ params }: LessonPageProps) {
  const lesson = getDCCircuitLessonBySlug(params.lessonSlug);
  if (!lesson) {
    return {
      title: 'Lesson Not Found - EletronicswithVK',
    };
  }
  return {
    title: `${lesson.mainTitle || lesson.title} - DC Circuits - EletronicswithVK`,
    description: lesson.description,
  };
}

export default function DCCircuitLessonPage({ params }: LessonPageProps) {
  const lesson = getDCCircuitLessonBySlug(params.lessonSlug);

  if (!lesson) {
    notFound(); 
  }

  const currentIndex = dcCircuitLessons.findIndex(l => l.slug === params.lessonSlug);
  const prevLesson = currentIndex > 0 ? dcCircuitLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < dcCircuitLessons.length - 1 ? dcCircuitLessons[currentIndex + 1] : null;

  return (
    <article className="w-full">
      <div className="tutorial-content">
        {lesson.content}
      </div>

      <Separator className="my-8 md:my-12" />

      <nav className="flex justify-between items-center">
        <div>
          {prevLesson && (
            <Button asChild variant="outline">
              <Link href={`/tutorials/dc-circuit-theory/${prevLesson.slug}`} className="flex items-center">
                <ChevronLeft className="mr-2 h-4 w-4" />
                <span className="truncate">Prev: {prevLesson.title.replace(/^\d+\.\s*/, '')}</span>
              </Link>
            </Button>
          )}
        </div>
        <div>
          {nextLesson && (
            <Button asChild variant="outline">
              <Link href={`/tutorials/dc-circuit-theory/${nextLesson.slug}`} className="flex items-center">
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
