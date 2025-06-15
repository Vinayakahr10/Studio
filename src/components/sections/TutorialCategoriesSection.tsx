
import type { Category } from '@/types';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cpu, Pi, Wifi, Gauge, CircuitBoard, Component, Network, Router, ToggleRight } from 'lucide-react'; // Added ToggleRight

export const categoriesData: Category[] = [
  { id: 'arduino', name: 'Arduino', Icon: Cpu, href: '/tutorials/arduino', description: 'Microcontroller projects and guides.' },
  { id: 'dc-circuit-theory', name: 'DC Circuit Theory', Icon: Network, href: '/tutorials/dc-circuit-theory', description: 'Fundamentals of DC circuits and analysis.' },
  { id: 'esp32', name: 'ESP32 & ESP8266 Tutorials', Icon: Router, href: '/tutorials/esp32', description: 'WiFi, Bluetooth, and IoT projects.' },
  { id: 'bjt-transistors', name: 'BJT Transistors', Icon: ToggleRight, href: '/tutorials/bjt-transistors', description: 'Understanding Bipolar Junction Transistors.' },
  { id: 'raspberry-pi', name: 'Raspberry Pi', Icon: Pi, href: '/categories/raspberry-pi', description: 'Single-board computer applications.' },
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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:gap-6">
            {categoriesToDisplay.map((category) => (
              <Link key={category.id} href={category.href} className="group">
                <Card className="h-full flex flex-col items-center justify-center p-6 text-center shadow-md transition-all hover:shadow-xl hover:bg-muted/30 hover:scale-105">
                  <CardHeader className="p-0 mb-4">
                    <category.Icon className="h-12 w-12 text-primary transition-colors" />
                  </CardHeader>
                  <CardContent className="p-0">
                    <CardTitle className="text-lg font-semibold">{category.name}</CardTitle>
                    {category.description && <p className="text-sm text-muted-foreground mt-1">{category.description}</p>}
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
