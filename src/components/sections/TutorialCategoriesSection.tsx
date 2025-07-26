
import type { Category } from '@/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Cpu, Pi, Wifi, Gauge, CircuitBoard, Component, Network, Router, ToggleRight, Activity, Triangle as OpAmpIcon, Binary as DigitalIcon, MemoryStick as SemiconductorIcon, BatteryCharging as PowerIcon, Waves, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export const categoriesData: Category[] = [
  { id: 'arduino', name: 'Arduino', Icon: Cpu, href: '/tutorials/arduino', description: 'Microcontroller projects and guides.' },
  { id: 'stm32', name: 'STM32', Icon: Cpu, href: '/tutorials/stm32', description: 'ARM Cortex-M development with STM32.' },
  { id: 'esp32', name: 'ESP32 & ESP8266', Icon: Router, href: '/tutorials/esp32', description: 'WiFi, Bluetooth, and IoT projects.' },
  { id: 'dc-circuit-theory', name: 'DC Circuit Theory', Icon: Network, href: '/tutorials/dc-circuit-theory', description: 'Fundamentals of DC circuits and analysis.' },
  { id: 'digital-electronics', name: 'Digital Electronics', Icon: DigitalIcon, href: '/tutorials/digital-electronics', description: 'Binary, logic gates, Boolean algebra, and more.' },
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
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categoriesToDisplay.map((category) => {
                const CategoryIcon = category.Icon;
                return(
                <Card key={category.id} className="group flex flex-col overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-300">
                  <CardHeader className="p-0 border-b overflow-hidden">
                    <Link href={category.href} className="block" aria-label={`View tutorials for ${category.name}`}>
                      <div className="relative aspect-[4/3] w-full bg-primary/5 rounded-t-lg overflow-hidden">
                        {category.id === 'arduino' ? (
                          <Image src="https://lh3.googleusercontent.com/d/1DbG4WUFIwootjZkxJge08T61zvgDjfsD" alt="Arduino" layout="fill" className="object-cover" />
                        ) : category.id === 'operational-amplifiers' ? (
                           <Image src="https://lh3.googleusercontent.com/d/1Syvg1EnUBduCAxtL1N9TrsHIIG7asWhf" alt="Operational Amplifier" layout="fill" className="object-cover" />
                        ) : category.id === 'dc-circuit-theory' ? (
                            <Image src="https://lh3.googleusercontent.com/d/1NNNvw3vFslKZz4mrHcX2r8XGS0OAmfn0" alt="DC Circuit Theory" layout="fill" className="object-cover" />
                        ) : category.id === 'digital-electronics' ? (
                            <Image src="https://lh3.googleusercontent.com/d/1H1hbyiHN0idqgCJ7GsCFE18JYufHkzVr" alt="Digital Electronics" layout="fill" className="object-cover" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <CategoryIcon className="h-16 w-16 text-primary/80" />
                          </div>
                        )}
                      </div>
                    </Link>
                  </CardHeader>
                  <CardContent className="flex-grow p-4 md:p-6 space-y-2">
                    <CardTitle className="text-xl font-semibold leading-snug">
                      <Link href={category.href} className="hover:text-foreground transition-colors duration-200">
                        {category.name}
                      </Link>
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground line-clamp-3">
                      {category.description}
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="p-4 md:p-6 pt-0 mt-auto">
                    <Button asChild variant="outline" className="w-auto transition-colors group hover:bg-black hover:text-white">
                      <Link href={category.href}>
                        View Tutorials <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
            )})}
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
