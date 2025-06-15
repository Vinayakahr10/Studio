
import { Breadcrumbs, type BreadcrumbItem } from '@/components/ui/breadcrumbs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Router, BookOpen, ChevronRight } from 'lucide-react'; // Changed Cpu to Router
import Link from 'next/link';
import Image from 'next/image';
import { esp32TutorialLessons } from '@/data/esp32-tutorial-data'; 

export default function ESP32TutorialPage() {
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Tutorials', href: '/tutorials' },
    { label: 'ESP32 & ESP8266 Tutorials' },
  ];

  const firstLessonSlug = esp32TutorialLessons[0]?.slug || 'introduction-to-esp32';

  return (
    <div className="w-full">
      <Breadcrumbs items={breadcrumbItems} />
      
      <header className="mb-8 md:mb-12 py-8 md:py-12 bg-muted/30 rounded-lg text-center shadow">
        <div className="inline-block bg-primary/10 p-3 rounded-full mb-4">
            <Router className="h-12 w-12 md:h-16 md:w-16 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">ESP32 & ESP8266 Tutorials</h1>
        <p className="mt-3 md:mt-4 max-w-2xl mx-auto text-muted-foreground md:text-lg">
          Unlock the power of ESP32 and ESP8266 for your IoT, WiFi, and Bluetooth projects. From basics to advanced applications.
        </p>
      </header>

      <section className="mb-8">
        <Image
          src="https://placehold.co/1000x400.png"
          alt="ESP32 and ESP8266 boards with various components"
          data-ai-hint="esp32 esp8266 components projects"
          width={1000}
          height={400}
          className="w-full rounded-lg object-cover shadow-lg"
        />
      </section>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl">Explore ESP32/ESP8266 Lessons</CardTitle>
          <CardDescription>Dive into specific topics or follow our guided lessons below.</CardDescription>
        </CardHeader>
        <CardContent className="text-muted-foreground space-y-4">
          <p className="text-lg">
            Welcome to the EletronicswithVK ESP32 and ESP8266 tutorial series! These powerful microcontrollers are perfect for building connected projects.
          </p>
          <p>
            In this series, you will:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-4">
            <li>Learn the differences and capabilities of ESP32 and ESP8266.</li>
            <li>Set up your development environment using the Arduino IDE or other platforms like ESP-IDF.</li>
            <li>Master WiFi and Bluetooth Low Energy (BLE) communication.</li>
            <li>Interface with a wide variety of sensors and actuators.</li>
            <li>Build practical IoT projects, web servers, and more.</li>
          </ul>
          <p>
            Whether you're new to these chips or looking to expand your skills, our tutorials will guide you through.
          </p>
          <div className="pt-4">
            <Button asChild size="lg" className="transition-transform hover:scale-105">
              <Link href={`/tutorials/esp32/${firstLessonSlug}`}>
                Start with the First ESP32 Lesson <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
