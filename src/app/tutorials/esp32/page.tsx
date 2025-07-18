
import { notFound } from 'next/navigation';
import { esp32TutorialLessons } from '@/data/esp32-tutorial-data';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function ESP32TutorialPage() {
  const lesson = esp32TutorialLessons[0]; // Get the first lesson
  const nextLesson = esp32TutorialLessons.length > 1 ? esp32TutorialLessons[1] : null;

  if (!lesson) {
    notFound(); 
  }

  return (
    <article className="w-full">
      <div className="tutorial-content">
        <h1>{lesson.mainTitle || lesson.title}</h1>
        {lesson.content}
      </div>

      <Separator className="my-8 md:my-12" />

      <nav className="flex justify-end">
        {nextLesson && (
          <Button asChild variant="outline">
            <Link href={`/tutorials/esp32/${nextLesson.slug}`} className="flex items-center">
              <span className="truncate">Next: {nextLesson.title.replace(/^\d+\.\s*/, '')}</span>
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        )}
      </nav>
    </article>
  );
}
