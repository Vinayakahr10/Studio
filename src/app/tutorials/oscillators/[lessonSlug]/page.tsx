
import { getOscillatorLessonBySlug } from '@/data/oscillator-lessons'; 
import { notFound } from 'next/navigation';

interface LessonPageProps {
  params: {
    lessonSlug: string;
  };
}

export async function generateStaticParams() {
  const { oscillatorLessons } = await import('@/data/oscillator-lessons');
  return oscillatorLessons.map((lesson) => ({
    lessonSlug: lesson.slug,
  }));
}

export async function generateMetadata({ params }: LessonPageProps) {
  const lesson = getOscillatorLessonBySlug(params.lessonSlug);
  if (!lesson) {
    return {
      title: 'Lesson Not Found - EletronicswithVK',
    };
  }
  return {
    title: `${lesson.mainTitle || lesson.title} - Oscillators - EletronicswithVK`,
    description: lesson.description,
  };
}

export default function OscillatorLessonPage({ params }: LessonPageProps) {
  const lesson = getOscillatorLessonBySlug(params.lessonSlug);

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
