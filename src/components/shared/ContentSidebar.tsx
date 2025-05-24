
import type { Category, Tag, Article } from '@/types';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { List } from 'lucide-react';

const recentPostsData: Pick<Article, 'id' | 'title' | 'href'>[] = [
  { id: 'post1', title: 'Getting Started with ESP32', href: '/blog/esp32-basics' },
  { id: 'post2', title: 'Understanding Resistors', href: '/blog/resistors-101' },
  { id: 'post3', title: 'Choosing Your First Microcontroller', href: '/blog/first-microcontroller' },
];

const categoriesData: Pick<Category, 'id' | 'name' | 'href'>[] = [
  { id: 'arduino', name: 'Arduino', href: '/categories/arduino' },
  { id: 'raspberry-pi', name: 'Raspberry Pi', href: '/categories/raspberry-pi' },
  { id: 'iot', name: 'IoT', href: '/categories/iot' },
];

const tagsData: Tag[] = [
  { id: 'tag1', name: 'Beginner', href: '/tags/beginner' },
  { id: 'tag2', name: 'Programming', href: '/tags/programming' },
  { id: 'tag3', name: 'Hardware', href: '/tags/hardware' },
  { id: 'tag4', name: 'Sensors', href: '/tags/sensors' },
];

export function ContentSidebar() {
  return (
    <aside className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2"><List className="h-5 w-5 text-primary" />Recent Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {recentPostsData.map((post) => (
              <li key={post.id}>
                <Link href={post.href} className="text-sm text-muted-foreground hover:text-primary hover:underline transition-colors">
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {categoriesData.map((category) => (
              <li key={category.id}>
                <Link href={category.href} className="text-sm text-muted-foreground hover:text-primary hover:underline transition-colors">
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Tags</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {tagsData.map((tag) => (
              <Link key={tag.id} href={tag.href}>
                <Badge variant="secondary" className="transition-colors hover:bg-primary hover:text-primary-foreground cursor-pointer">{tag.name}</Badge>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}
