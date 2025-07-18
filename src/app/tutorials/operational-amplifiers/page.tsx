
import { notFound } from 'next/navigation';
import { opAmpLessons } from '@/data/operational-amplifiers-lessons';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function OperationalAmplifiersTutorialPage() {
  const lesson = opAmpLessons[0]; // Get the first lesson
  const nextLesson = opAmpLessons.length > 1 ? opAmpLessons[1] : null;

  if (!lesson) {
    notFound(); 
  }

  return (
    <article className="w-full">
      <div className="prose dark:prose-invert max-w-none 
                      prose-headings:text-primary prose-headings:font-bold prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                      prose-p:leading-relaxed prose-p:text-lg prose-p:text-foreground/80
                      prose-a:text-primary prose-a:font-medium hover:prose-a:underline
                      prose-ul:list-disc prose-ul:pl-6 prose-li:text-lg prose-li:text-foreground/80 prose-li:my-1
                      prose-ol:list-decimal prose-ol:pl-6 prose-ol:text-lg prose-ol:text-foreground/80
                      prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-foreground/60
                      prose-code:bg-muted prose-code:px-1.5 prose-code:py-1 prose-code:rounded-md prose-code:font-mono prose-code:text-sm prose-code:text-foreground
                      prose-pre:bg-background/95 prose-pre:shadow-lg prose-pre:rounded-lg
                      ">
        <h1>{lesson.mainTitle || lesson.title}</h1>
        {lesson.content}
      </div>

      <Separator className="my-8 md:my-12" />

      <nav className="flex justify-end">
        {nextLesson && (
          <Button asChild variant="outline" className="w-full sm:w-auto justify-end">
            <Link href={`/tutorials/operational-amplifiers/${nextLesson.slug}`} className="flex items-center">
              <span className="truncate">Next: {nextLesson.title.replace(/^\d+\.\s*/, '')}</span>
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        )}
      </nav>
    </article>
  );
}
