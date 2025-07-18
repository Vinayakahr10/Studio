
import { Breadcrumbs, type BreadcrumbItem } from '@/components/ui/breadcrumbs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MemoryStick as SemiconductorIcon, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { semiconductorDeviceLessons } from '@/data/semiconductor-devices-lessons';

export default function SemiconductorDevicesTutorialPage() {
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Tutorials', href: '/tutorials' },
    { label: 'Semiconductor Devices' },
  ];

  return (
    <div className="w-full">
      <Breadcrumbs items={breadcrumbItems} />
      
      <header className="mb-8 md:mb-12 py-8 md:py-12 bg-muted/30 rounded-lg text-center shadow">
        <div className="inline-block bg-primary/10 p-3 rounded-full mb-4">
            <SemiconductorIcon className="h-12 w-12 md:h-16 md:w-16 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">Semiconductor Device Tutorials</h1>
        <p className="mt-3 md:mt-4 max-w-2xl mx-auto text-muted-foreground md:text-lg">
          Learn about diodes, transistors (BJT, FETs), thyristors, and other essential semiconductor components that form the backbone of modern electronics.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>All Lessons</CardTitle>
          <CardDescription>Browse through the complete list of lessons in the Semiconductor Devices series.</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {semiconductorDeviceLessons.map((lesson) => (
              <li key={lesson.slug}>
                <Link href={`/tutorials/semiconductor-devices/${lesson.slug}`} className="block p-4 rounded-md transition-colors hover:bg-muted/50">
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
