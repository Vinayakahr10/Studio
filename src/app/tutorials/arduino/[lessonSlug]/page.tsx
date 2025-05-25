
import { getArduinoLessonBySlug, arduinoTutorialLessons, type ArduinoLesson } from '@/data/arduino-tutorial-data';
import { Breadcrumbs, type BreadcrumbItem } from '@/components/ui/breadcrumbs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, Cpu } from 'lucide-react';
import { notFound } from 'next/navigation';

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

      {/* TODO: Add Next/Previous lesson navigation buttons */}
    </article>
  );
}

// Component to render code blocks, assuming it's located here for the data file
// In a real app, this would be a shared component.
// For this example, ensure CodeBlock is imported in arduino-tutorial-data.ts or defined globally.
// If you create a shared one: src/components/content/CodeBlock.tsx
const CodeBlock = ({ code, language }: { code: string; language: string }) => {
  // This is a simplified placeholder. Use your actual CodeBlock component.
  // Make sure your actual CodeBlock component is available and correctly imported in arduino-tutorial-data.ts
  return (
    <pre className="bg-muted p-4 rounded-md overflow-x-auto my-4 text-sm">
      <code className={`language-${language}`}>{code.trim()}</code>
    </pre>
  );
};
export { CodeBlock }; // Export if used in arduino-tutorial-data.ts
