
import type { Project } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

export const featuredProjectsData: Project[] = [
  {
    id: '1',
    title: 'DIY Arduino Weather Station',
    description: 'Learn to build your own weather station using an Arduino board and various sensors. Track temperature, humidity, and pressure.',
    imageUrl: 'https://placehold.co/400x300.png',
    imageHint: 'weather station electronics',
    tutorialLink: '/projects/arduino-weather-station', // Placeholder
  },
  {
    id: '2',
    title: 'Raspberry Pi Home Automation Hub',
    description: 'Control your home appliances remotely using a Raspberry Pi. This project covers setting up the Pi and basic automation scripts.',
    imageUrl: 'https://placehold.co/400x300.png',
    imageHint: 'raspberry pi smart home',
    tutorialLink: '/projects/pi-home-automation', // Placeholder
  },
  {
    id: '3',
    title: 'IoT Plant Monitoring System',
    description: 'Build an IoT system to monitor your plants soil moisture, light, and temperature, sending data to the cloud.',
    imageUrl: 'https://placehold.co/400x300.png',
    imageHint: 'iot plant sensor',
    tutorialLink: '/projects/iot-plant-monitor', // Placeholder
  },
  {
    id: 'esp32-weather-station',
    title: 'ESP32 Based Weather Station',
    description: 'Build a comprehensive weather station using the ESP32 to monitor various environmental conditions like temperature, humidity, pressure, and potentially air quality.',
    imageUrl: 'https://placehold.co/400x300.png',
    imageHint: 'esp32 weather station',
    tutorialLink: '/projects/esp32-weather-station',
  },
  {
    id: 'project-555-pwm-generator',
    title: 'Build a 555 Timer PWM Generator',
    description: 'Control LED brightness or motor speed using the classic 555 timer IC configured for Pulse Width Modulation.',
    imageUrl: 'https://placehold.co/400x300.png',
    imageHint: '555 timer pwm circuit breadboard',
    tutorialLink: '/projects/project-555-pwm-generator',
  },
  {
    id: 'esp32-weather-station-vinayakahr10',
    title: 'ESP32 I2C Weather Station (GitHub: Vinayakahr10)',
    description: "Build an ESP32 weather station using I2C for BME280 sensor and OLED display, based on Vinayakahr10's repository.",
    imageUrl: 'https://placehold.co/400x300.png',
    imageHint: 'esp32 weather project custom',
    tutorialLink: '/projects/esp32-weather-station-vinayakahr10',
  },
];

interface FeaturedProjectsSectionProps {
  projects?: Project[];
}

export function FeaturedProjectsSection({ projects }: FeaturedProjectsSectionProps) {
  const projectsToDisplay = projects || featuredProjectsData;

  return (
    <section className="w-full py-12 md:py-16 lg:py-20 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        {!projects && ( // Only show this title if not being used with a custom project list (e.g., on the All Projects page)
          <div className="mb-8 md:mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Featured Projects</h2>
            <p className="mt-3 max-w-2xl mx-auto text-muted-foreground md:text-lg">
              Get hands-on with these exciting electronics projects.
            </p>
          </div>
        )}
        {projectsToDisplay.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projectsToDisplay.map((project) => (
              <Card key={project.id} className="flex flex-col overflow-hidden shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] hover:bg-muted/30">
                <CardHeader className="p-0">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    data-ai-hint={project.imageHint}
                    width={400}
                    height={300}
                    className="aspect-[4/3] w-full object-cover"
                  />
                </CardHeader>
                <CardContent className="flex-grow p-6 space-y-3">
                  <CardTitle className="text-xl font-semibold">{project.title}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground line-clamp-3">{project.description}</CardDescription>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button asChild variant="default" className="w-full transition-colors group">
                    <Link href={project.tutorialLink}>
                      View Tutorial <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            No projects found matching your criteria.
          </div>
        )}
      </div>
    </section>
  );
}
    
