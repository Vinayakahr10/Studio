
import { Cpu, Pi, Wifi, Gauge, CircuitBoard, Component, AlertTriangle } from 'lucide-react';
import type { Category } from '@/types'; // Assuming you have a Category type
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

// Mock data - in a real app, this would come from a CMS or database
const categoriesDetails: Record<string, Omit<Category, 'id' | 'href' | 'Icon'> & { IconComponent: Category['Icon'], featuredImage?: string, featuredImageHint?: string, articles?: any[] }> = {
  arduino: { name: 'Arduino', IconComponent: Cpu, description: 'Explore projects, tutorials, and guides focused on the Arduino platform. Perfect for beginners and experienced makers alike.', featuredImage: 'https://placehold.co/800x300.png', featuredImageHint: 'arduino board setup' },
  'raspberry-pi': { name: 'Raspberry Pi', IconComponent: Pi, description: 'Discover the power of Raspberry Pi with our collection of projects, from media centers to robotics and IoT applications.', featuredImage: 'https://placehold.co/800x300.png', featuredImageHint: 'raspberry pi projects' },
  iot: { name: 'IoT (Internet of Things)', IconComponent: Wifi, description: 'Dive into the world of connected devices. Learn to build IoT solutions, understand protocols, and work with cloud platforms.', featuredImage: 'https://placehold.co/800x300.png', featuredImageHint: 'iot devices network' },
  sensors: { name: 'Sensors', IconComponent: Gauge, description: 'Learn how to interface with a wide variety of sensors, from temperature and humidity to motion and light sensors.', featuredImage: 'https://placehold.co/800x300.png', featuredImageHint: 'electronic sensors array' },
  'circuit-design': { name: 'Circuit Design', IconComponent: CircuitBoard, description: 'Master the fundamentals of electronic circuit design, including schematic capture, PCB layout, and simulation.', featuredImage: 'https://placehold.co/800x300.png', featuredImageHint: 'circuit schematic pcb' },
  components: { name: 'Components', IconComponent: Component, description: 'Understand the building blocks of electronics. Learn about resistors, capacitors, transistors, and more.', featuredImage: 'https://placehold.co/800x300.png', featuredImageHint: 'electronic components assortment' },
};

// Placeholder articles/projects for a category
const placeholderItems = [
  { id: '1', title: 'Getting Started with Category', description: 'A beginner-friendly introduction to this category.', imageUrl: 'https://placehold.co/400x250.png', imageHint: 'electronics learning', link: '#' },
  { id: '2', title: 'Advanced Techniques in Category', description: 'Explore more complex topics and projects.', imageUrl: 'https://placehold.co/400x250.png', imageHint: 'complex circuit', link: '#' },
  { id: '3', title: 'Troubleshooting Common Issues', description: 'Learn to identify and fix common problems.', imageUrl: 'https://placehold.co/400x250.png', imageHint: 'electronics repair', link: '#' },
];


export default function CategoryPage({ params }: { params: { categoryName: string } }) {
  const categoryDetail = categoriesDetails[params.categoryName];

  if (!categoryDetail) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <AlertTriangle className="h-16 w-16 text-destructive mx-auto mb-4" />
        <h1 className="text-4xl font-bold mb-2">Category Not Found</h1>
        <p className="text-muted-foreground mb-6">The category "{params.categoryName}" does not exist or is not yet available.</p>
        <Button asChild>
          <Link href="/tutorials">Back to Tutorials</Link>
        </Button>
      </div>
    );
  }

  const { name, IconComponent, description, featuredImage, featuredImageHint } = categoryDetail;

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <section className="mb-12 text-center">
        <IconComponent className="h-16 w-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl text-primary">{name}</h1>
        {description && <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-lg">{description}</p>}
      </section>

      {featuredImage && (
        <section className="mb-12 rounded-lg overflow-hidden shadow-xl">
          <Image
            src={featuredImage}
            alt={`${name} featured image`}
            data-ai-hint={featuredImageHint}
            width={1200}
            height={400}
            className="w-full h-auto object-cover"
            priority
          />
        </section>
      )}
      
      <section>
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 md:mb-8">Tutorials & Projects in {name}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {placeholderItems.map(item => (
            <Card key={item.id} className="flex flex-col overflow-hidden shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] hover:bg-muted/30">
              <CardHeader className="p-0">
                <Image src={item.imageUrl} alt={item.title} data-ai-hint={item.imageHint} width={400} height={250} className="aspect-video w-full object-cover" />
              </CardHeader>
              <CardContent className="flex-grow p-4 md:p-6 space-y-2">
                <CardTitle className="text-lg font-semibold">{item.title}</CardTitle>
                <CardDescription className="text-sm text-muted-foreground line-clamp-3">{item.description}</CardDescription>
              </CardContent>
              <CardFooter className="p-4 md:p-6 pt-0">
                <Button asChild variant="default" className="w-full">
                  <Link href={item.link}>Read More</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        {placeholderItems.length === 0 && (
          <p className="text-muted-foreground text-center py-8">No tutorials or projects found in this category yet. Check back soon!</p>
        )}
      </section>
    </div>
  );
}

// Optional: Generate static paths if you know all categories beforehand
// export async function generateStaticParams() {
//   return Object.keys(categoriesDetails).map((categoryName) => ({
//     categoryName,
//   }));
// }
