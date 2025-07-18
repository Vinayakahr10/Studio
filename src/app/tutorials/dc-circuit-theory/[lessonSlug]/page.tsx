
import { getDCCircuitLessonBySlug } from '@/data/dc-circuit-theory-lessons'; 
import { notFound } from 'next/navigation';

interface LessonPageProps {
  params: {
    lessonSlug: string;
  };
}

export async function generateStaticParams() {
  const { dcCircuitLessons } = await import('@/data/dc-circuit-theory-lessons');
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

  return (
    <article className="w-full">
      <div className="tutorial-content">
        {lesson.content}
      </div>
    </article>
  );
}
