
import { getSemiconductorDeviceLessonBySlug } from '@/data/semiconductor-devices-lessons'; 
import { notFound } from 'next/navigation';

interface LessonPageProps {
  params: {
    lessonSlug: string;
  };
}

export async function generateStaticParams() {
  const { semiconductorDeviceLessons } = await import('@/data/semiconductor-devices-lessons');
  return semiconductorDeviceLessons.map((lesson) => ({
    lessonSlug: lesson.slug,
  }));
}

export async function generateMetadata({ params }: LessonPageProps) {
  const lesson = getSemiconductorDeviceLessonBySlug(params.lessonSlug);
  if (!lesson) {
    return {
      title: 'Lesson Not Found - EletronicswithVK',
    };
  }
  return {
    title: `${lesson.mainTitle || lesson.title} - Semiconductor Devices - EletronicswithVK`,
    description: lesson.description,
  };
}

export default function SemiconductorDeviceLessonPage({ params }: LessonPageProps) {
  const lesson = getSemiconductorDeviceLessonBySlug(params.lessonSlug);

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
