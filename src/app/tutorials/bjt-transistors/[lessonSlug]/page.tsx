
import { getBJTLessonBySlug } from '@/data/bjt-transistor-lessons'; 
import { notFound } from 'next/navigation';

interface LessonPageProps {
  params: {
    lessonSlug: string;
  };
}

export async function generateStaticParams() {
  const { bjtTutorialLessons } = await import('@/data/bjt-transistor-lessons');
  return bjtTutorialLessons.map((lesson) => ({
    lessonSlug: lesson.slug,
  }));
}

export async function generateMetadata({ params }: LessonPageProps) {
  const lesson = getBJTLessonBySlug(params.lessonSlug);
  if (!lesson) {
    return {
      title: 'Lesson Not Found - EletronicswithVK',
    };
  }
  return {
    title: `${lesson.mainTitle || lesson.title} - BJT Tutorials - EletronicswithVK`,
    description: lesson.description,
  };
}

export default function BJTLessonPage({ params }: LessonPageProps) {
  const lesson = getBJTLessonBySlug(params.lessonSlug);

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
