
import type { Category } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cpu, Pi, Wifi, Gauge, CircuitBoard, Component, Network, Router, ToggleRight, Activity, Triangle as OpAmpIcon, Binary as DigitalIcon, MemoryStick as SemiconductorIcon, BatteryCharging as PowerIcon, Waves } from 'lucide-react';

export const categoriesData: Category[] = [
  { id: 'arduino', name: 'Arduino', Icon: Cpu, href: '/tutorials/arduino', description: 'Microcontroller projects and guides.' },
  { id: 'stm32', name: 'STM32', Icon: Cpu, href: '/tutorials/stm32', description: 'ARM Cortex-M development with STM32.' },
  { id: 'esp32', name: 'ESP32 & ESP8266', Icon: Router, href: '/tutorials/esp32', description: 'WiFi, Bluetooth, and IoT projects.' },
  { id: 'raspberry-pi', name: 'Raspberry Pi', Icon: Pi, href: '/categories/raspberry-pi', description: 'Single-board computer applications.' },
  { id: 'dc-circuit-theory', name: 'DC Circuit Theory', Icon: Network, href: '/tutorials/dc-circuit-theory', description: 'Fundamentals of DC circuits and analysis.' },
  { id: 'ac-circuits', name: 'AC Circuits', Icon: Activity, href: '/tutorials/ac-circuits', description: 'Explore alternating current, phasors, and impedance.' },
  { id: 'digital-electronics', name: 'Digital Electronics', Icon: DigitalIcon, href: '/tutorials/digital-electronics', description: 'Binary, logic gates, Boolean algebra, and more.' },
  { id: 'semiconductor-devices', name: 'Semiconductor Devices', Icon: SemiconductorIcon, href: '/tutorials/semiconductor-devices', description: 'Diodes, transistors (BJT, FET), and thyristors.' },
  { id: 'operational-amplifiers', name: 'Operational Amplifiers', Icon: OpAmpIcon, href: '/tutorials/operational-amplifiers', description: 'Op-amp basics, configurations, and applications.' },
  { id: 'power-electronics', name: 'Power Electronics', Icon: PowerIcon, href: '/tutorials/power-electronics', description: 'Power supplies, converters, and control.' },
  { id: 'oscillators', name: 'Oscillators', Icon: Waves, href: '/tutorials/oscillators', description: 'Learn about circuits that generate periodic waveforms.' },
  { id: 'bjt-transistors', name: 'BJT Transistors (Legacy)', Icon: ToggleRight, href: '/tutorials/bjt-transistors', description: 'Understanding Bipolar Junction Transistors. (Content may be merged into Semiconductor Devices)' },
  { id: 'iot', name: 'IoT', Icon: Wifi, href: '/categories/iot', description: 'Internet of Things devices and concepts.' },
  { id: 'sensors', name: 'Sensors', Icon: Gauge, href: '/categories/sensors', description: 'Interfacing with various sensors.' },
  { id: 'circuit-design', name: 'Circuit Design', Icon: CircuitBoard, href: '/categories/circuit-design', description: 'Fundamentals of electronic circuits.' },
  { id: 'components', name: 'Components', Icon: Component, href: '/categories/components', description: 'Understanding electronic parts.' },
];

interface TutorialCategoriesSectionProps {
  categories?: Category[];
}

export function TutorialCategoriesSection({ categories }: TutorialCategoriesSectionProps) {
  const categoriesToDisplay = categories || categoriesData;

  return (
    <section className="w-full py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 md:px-6">
        {!categories && ( 
          <div className="mb-8 md:mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Explore Tutorials by Category</h2>
            <p className="mt-3 max-w-2xl mx-auto text-muted-foreground md:text-lg">
              Find tutorials based on your interests and learning goals.
            </p>
          </div>
        )}
        {categoriesToDisplay.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
            {categoriesToDisplay.map((category) => (
              <Link key={category.id} href={category.href} className="group">
                <Card className="h-full flex flex-col items-center justify-start p-0 text-center shadow-md transition-all hover:shadow-xl hover:bg-muted/30 hover:scale-105 overflow-hidden">
                  <CardHeader className="p-0 w-full">
                    <Image
                      src={category.id === 'operational-amplifiers' ? 'https://lh3.googleusercontent.com/d/1Syvg1EnUBduCAxtL1N9TrsHIIG7asWhf' : 'https://placehold.co/400x250.png'}
                      alt={category.name}
                      data-ai-hint={category.id}
                      width={400}
                      height={250}
                      className="w-full h-auto object-cover aspect-video"
                    />
                  </CardHeader>
                  <CardContent className="flex-grow p-4">
                    <CardTitle className="text-md font-semibold">{category.name}</CardTitle>
                    {category.description && <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{category.description}</p>}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            No tutorial categories found matching your criteria.
          </div>
        )}
      </div>
    </section>
  );
}
