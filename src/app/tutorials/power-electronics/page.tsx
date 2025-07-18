
import { notFound } from 'next/navigation';
import { powerElectronicsLessons } from '@/data/power-electronics-lessons';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function PowerElectronicsTutorialPage() {
  const lesson = powerElectronicsLessons[0]; // Get the first lesson
  const nextLesson = powerElectronicsLessons.length > 1 ? powerElectronicsLessons[1] : null;

  if (!lesson) {
    notFound(); 
  }

  return (
    <article className="w-full">
      <div className="prose dark:prose-invert max-w-none 
                      prose-h1:text-4xl prose-h1:font-extrabold prose-h1:tracking-tight prose-h1:mb-4 prose-h1:pb-2 prose-h1:border-b prose-h1:border-primary/50
                      prose-h2:text-3xl prose-h2:font-bold prose-h2:mt-10 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b
                      prose-h3:text-2xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-4
                      prose-p:leading-7 prose-p:[&:not(:first-child)]:mt-6 prose-p:text-lg
                      prose-a:text-primary prose-a:font-medium hover:prose-a:underline
                      prose-ul:mt-6 prose-ul:ml-6 prose-ul:list-disc prose-li:mt-2
                      prose-ol:mt-6 prose-ol:ml-6 prose-ol:list-decimal prose-li:mt-2
                      prose-blockquote:mt-6 prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-muted-foreground
                      prose-code:bg-muted prose-code:px-1.5 prose-code:py-1 prose-code:rounded-md prose-code:font-mono prose-code:text-sm prose-code:text-primary
                      prose-pre:bg-background/95 prose-pre:shadow-lg prose-pre:rounded-lg
                      ">
        <h1>{lesson.mainTitle || lesson.title}</h1>
        {lesson.content}
      </div>

      <Separator className="my-8 md:my-12" />

      <nav className="flex justify-end">
        {nextLesson && (
          <Button asChild variant="outline" className="w-full sm:w-auto justify-end">
            <Link href={`/tutorials/power-electronics/${nextLesson.slug}`} className="flex items-center">
              <span className="truncate">Next: {nextLesson.title.replace(/^\d+\.\s*/, '')}</span>
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        )}
      </nav>
    </article>
  );
}
