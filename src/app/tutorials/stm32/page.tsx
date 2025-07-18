
import { Breadcrumbs, type BreadcrumbItem } from '@/components/ui/breadcrumbs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Cpu, BookOpen, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { stm32TutorialLessons } from '@/data/stm32-tutorial-lessons';

export default function STM32TutorialPage() {
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Tutorials', href: '/tutorials' },
    { label: 'STM32 Tutorials' },
  ];

  return (
    <div className="w-full">
      <Breadcrumbs items={breadcrumbItems} />
      
      <header className="mb-8 md:mb-12 py-8 md:py-12 bg-muted/30 rounded-lg text-center shadow">
        <div className="inline-block bg-primary/10 p-3 rounded-full mb-4">
            <Cpu className="h-12 w-12 md:h-16 md:w-16 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">STM32 Tutorials</h1>
        <p className="mt-3 md:mt-4 max-w-2xl mx-auto text-muted-foreground md:text-lg">
          Master ARM Cortex-M development with STM32 microcontrollers. From GPIO and timers to FreeRTOS and advanced peripherals.
        </p>
      </header>
      
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {stm32TutorialLessons.map((lesson) => {
          const LessonIcon = lesson.Icon || Cpu;
          return (
          <Card key={lesson.slug} className="flex flex-col overflow-hidden shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] hover:bg-muted/30">
            <CardHeader className="p-0">
              <Link href={`/tutorials/stm32/${lesson.slug}`} className="block" aria-label={`View lesson: ${lesson.title}`}>
                <div className="w-full h-40 bg-primary/5 flex items-center justify-center">
                    <LessonIcon className="h-16 w-16 text-primary/80" />
                </div>
              </Link>
            </CardHeader>
            <CardContent className="flex-grow p-6 space-y-2">
              <CardTitle className="text-lg font-semibold h-12">
                 <Link href={`/tutorials/stm32/${lesson.slug}`} className="hover:text-primary transition-colors">
                    {lesson.title.replace(/^\d+\.\s*/, '')}
                 </Link>
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground line-clamp-3 h-[60px]">
                {lesson.description}
              </CardDescription>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <Button asChild variant="outline" className="w-full transition-colors group">
                <Link href={`/tutorials/stm32/${lesson.slug}`}>
                  Read Lesson <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        )})}
      </section>
    </div>
  );
}
