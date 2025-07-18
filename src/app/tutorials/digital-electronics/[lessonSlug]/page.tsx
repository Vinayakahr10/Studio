
import { getDigitalElectronicsLessonBySlug } from '@/data/digital-electronics-lessons'; 
import { notFound } from 'next/navigation';

interface LessonPageProps {
  params: {
    lessonSlug: string;
  };
}

export async function generateStaticParams() {
  const { digitalElectronicsLessons } = await import('@/data/digital-electronics-lessons');
  return digitalElectronicsLessons.map((lesson) => ({
    lessonSlug: lesson.slug,
  }));
}

export async function generateMetadata({ params }: LessonPageProps) {
  const lesson = getDigitalElectronicsLessonBySlug(params.lessonSlug);
  if (!lesson) {
    return {
      title: 'Lesson Not Found - EletronicswithVK',
    };
  }
  return {
    title: `${lesson.mainTitle || lesson.title} - Digital Electronics - EletronicswithVK`,
    description: lesson.description,
  };
}

export default function DigitalElectronicsLessonPage({ params }: LessonPageProps) {
  const lesson = getDigitalElectronicsLessonBySlug(params.lessonSlug);

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
