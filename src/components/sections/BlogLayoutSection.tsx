
import type { Article } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ContentSidebar } from '@/components/shared/ContentSidebar';
import { CalendarDays, UserCircle } from 'lucide-react';

const articlesData: Article[] = [
  {
    id: '1',
    title: 'Introduction to Soldering Techniques',
    summary: 'Master the art of soldering with this beginner-friendly guide. Learn about tools, safety, and common pitfalls.',
    imageUrl: 'https://placehold.co/400x250.png',
    imageHint: 'soldering iron circuit',
    href: '/blog/intro-to-soldering',
    category: 'Techniques',
    date: 'October 26, 2023',
    author: 'Jane Doe'
  },
  {
    id: '2',
    title: 'Understanding Logic Gates',
    summary: 'A fundamental concept in digital electronics. This article breaks down AND, OR, NOT, XOR gates and their applications.',
    imageUrl: 'https://placehold.co/400x250.png',
    imageHint: 'logic gates diagram',
    href: '/blog/understanding-logic-gates',
    category: 'Digital Electronics',
    date: 'October 22, 2023',
    author: 'John Smith'
  },
   {
    id: '3',
    title: 'Choosing the Right Power Supply for Your Project',
    summary: 'Power supplies are crucial. Learn how to select the appropriate one based on voltage, current, and form factor.',
    imageUrl: 'https://placehold.co/400x250.png',
    imageHint: 'electronic power supply',
    href: '/blog/choosing-power-supply',
    category: 'Fundamentals',
    date: 'October 18, 2023',
    author: 'Alex Green'
  },
];

export function BlogLayoutSection() {
  return (
    <section className="w-full py-12 md:py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-8 md:mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Latest Articles & News</h2>
          <p className="mt-3 max-w-2xl mx-auto text-muted-foreground md:text-lg">
            Stay updated with our newest tutorials, project ideas, and industry insights.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
          <div className="lg:col-span-2 space-y-8">
            {articlesData.map((article) => (
              <Card key={article.id} className="overflow-hidden shadow-lg transition-all hover:shadow-xl flex flex-col md:flex-row">
                <div className="md:w-1/3">
                  <Image
                    src={article.imageUrl}
                    alt={article.title}
                    data-ai-hint={article.imageHint}
                    width={400}
                    height={250}
                    className="aspect-video w-full h-full object-cover"
                  />
                </div>
                <div className="md:w-2/3 flex flex-col">
                  <CardHeader className="p-4 md:p-6">
                    <CardTitle className="text-xl font-semibold hover:text-primary transition-colors">
                      <Link href={article.href}>{article.title}</Link>
                    </CardTitle>
                     <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-2">
                      {article.date && <span className="flex items-center"><CalendarDays className="mr-1 h-3 w-3" /> {article.date}</span>}
                      {article.author && <span className="flex items-center"><UserCircle className="mr-1 h-3 w-3" /> {article.author}</span>}
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow p-4 md:p-6 pt-0">
                    <CardDescription className="text-sm text-muted-foreground line-clamp-3">{article.summary}</CardDescription>
                  </CardContent>
                  <CardFooter className="p-4 md:p-6 pt-0">
                    <Button asChild variant="link" className="p-0 h-auto text-primary hover:underline">
                      <Link href={article.href}>Read More &rarr;</Link>
                    </Button>
                  </CardFooter>
                </div>
              </Card>
            ))}
             <div className="text-center mt-8">
                <Button asChild variant="default" size="lg" className="transition-transform hover:scale-105">
                    <Link href="/blog">View All Articles</Link>
                </Button>
            </div>
          </div>
          <div className="lg:col-span-1">
            <ContentSidebar />
          </div>
        </div>
      </div>
    </section>
  );
}
