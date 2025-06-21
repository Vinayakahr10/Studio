
import { Breadcrumbs, type BreadcrumbItem } from '@/components/ui/breadcrumbs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
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

  const firstLessonSlug = stm32TutorialLessons[0]?.slug || 'introduction-to-stm32-and-arm-cortex-m';

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

      <section className="mb-8">
        <Image
          src="https://placehold.co/1000x400.png"
          alt="STM32 development boards and components"
          data-ai-hint="stm32 discovery board nucleo"
          width={1000}
          height={400}
          className="w-full rounded-lg object-cover shadow-lg"
        />
      </section>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl">Explore STM32 Lessons</CardTitle>
          <CardDescription>Dive into specific topics or follow our guided lessons below.</CardDescription>
        </CardHeader>
        <CardContent className="text-muted-foreground space-y-4">
          <p className="text-lg">
            Welcome to the EletronicswithVK STM32 tutorial series! This comprehensive guide is designed for those looking to get started with or deepen their knowledge of the powerful and popular STM32 family of microcontrollers.
          </p>
          <p>
            In this series, you will:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-4">
            <li>Set up a professional development environment with STM32CubeIDE.</li>
            <li>Master core peripherals like GPIO, UART, I2C, SPI, ADC, and Timers.</li>
            <li>Understand advanced concepts like DMA, Interrupts, and Low Power Modes.</li>
            <li>Get started with a Real-Time Operating System (FreeRTOS) for complex applications.</li>
            <li>Explore advanced topics like bootloaders and security features.</li>
          </ul>
          <p>
            These tutorials will equip you with the skills needed for professional embedded systems development using STM32.
          </p>
          <div className="pt-4">
            <Button asChild size="lg" className="transition-transform hover:scale-105">
              <Link href={`/tutorials/stm32/${firstLessonSlug}`}>
                Start with the First STM32 Lesson <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
