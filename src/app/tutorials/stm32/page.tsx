
import { Breadcrumbs, type BreadcrumbItem } from '@/components/ui/breadcrumbs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Cpu, ChevronRight } from 'lucide-react';
import Link from 'next/link';
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
      
      <Card>
        <CardHeader>
          <CardTitle>All Lessons</CardTitle>
          <CardDescription>Browse through the complete list of lessons in the STM32 series.</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {stm32TutorialLessons.map((lesson) => (
              <li key={lesson.slug}>
                <Link href={`/tutorials/stm32/${lesson.slug}`} className="block p-4 rounded-md transition-colors hover:bg-muted/50">
                  <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-primary">{lesson.title.replace(/^\d+\.\s*/, '')}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{lesson.description}</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
