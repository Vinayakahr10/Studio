
import { getSTM32LessonBySlug } from '@/data/stm32-tutorial-lessons'; 
import { notFound } from 'next/navigation';

interface LessonPageProps {
  params: {
    lessonSlug: string;
  };
}

export async function generateStaticParams() {
  const { stm32TutorialLessons } = await import('@/data/stm32-tutorial-lessons');
  return stm32TutorialLessons.map((lesson) => ({
    lessonSlug: lesson.slug,
  }));
}

export async function generateMetadata({ params }: LessonPageProps) {
  const lesson = getSTM32LessonBySlug(params.lessonSlug);
  if (!lesson) {
    return {
      title: 'Lesson Not Found - EletronicswithVK',
    };
  }
  return {
    title: `${lesson.mainTitle || lesson.title} - STM32 - EletronicswithVK`,
    description: lesson.description,
  };
}

export default function STM32LessonPage({ params }: LessonPageProps) {
  const lesson = getSTM32LessonBySlug(params.lessonSlug);

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
