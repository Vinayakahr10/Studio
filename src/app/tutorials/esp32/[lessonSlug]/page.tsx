
import { getESP32LessonBySlug } from '@/data/esp32-tutorial-data'; 
import { notFound } from 'next/navigation';

interface LessonPageProps {
  params: {
    lessonSlug: string;
  };
}

export async function generateStaticParams() {
  const { esp32TutorialLessons } = await import('@/data/esp32-tutorial-data');
  return esp32TutorialLessons.map((lesson) => ({
    lessonSlug: lesson.slug,
  }));
}

export async function generateMetadata({ params }: LessonPageProps) {
  const lesson = getESP32LessonBySlug(params.lessonSlug);
  if (!lesson) {
    return {
      title: 'Lesson Not Found - EletronicswithVK',
    };
  }
  return {
    title: `${lesson.mainTitle || lesson.title} - ESP32 Tutorials - EletronicswithVK`,
    description: lesson.description,
  };
}

export default function ESP32LessonPage({ params }: LessonPageProps) {
  const lesson = getESP32LessonBySlug(params.lessonSlug);

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
