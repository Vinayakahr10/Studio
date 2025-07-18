
import { getOpAmpLessonBySlug } from '@/data/operational-amplifiers-lessons'; 
import { notFound } from 'next/navigation';

interface LessonPageProps {
  params: {
    lessonSlug: string;
  };
}

export async function generateStaticParams() {
  const { opAmpLessons } = await import('@/data/operational-amplifiers-lessons');
  return opAmpLessons.map((lesson) => ({
    lessonSlug: lesson.slug,
  }));
}

export async function generateMetadata({ params }: LessonPageProps) {
  const lesson = getOpAmpLessonBySlug(params.lessonSlug);
  if (!lesson) {
    return {
      title: 'Lesson Not Found - EletronicswithVK',
    };
  }
  return {
    title: `${lesson.mainTitle || lesson.title} - Op-Amps - EletronicswithVK`,
    description: lesson.description,
  };
}

export default function OpAmpLessonPage({ params }: LessonPageProps) {
  const lesson = getOpAmpLessonBySlug(params.lessonSlug);

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
