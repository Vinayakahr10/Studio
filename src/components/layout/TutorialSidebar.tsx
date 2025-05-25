
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import type { ArduinoLesson } from '@/data/arduino-tutorial-data';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChevronRight } from 'lucide-react';

interface TutorialSidebarProps {
  lessons: ArduinoLesson[];
  basePath: string;
  className?: string;
  tutorialTitle?: string;
}

export function TutorialSidebar({ lessons, basePath, className, tutorialTitle = "Tutorial Lessons" }: TutorialSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className={cn("w-full md:w-72 lg:w-80 border-r border-border h-full flex flex-col", className)}>
      <div className="p-4 border-b">
        <h3 className="text-xl font-semibold text-primary">{tutorialTitle}</h3>
      </div>
      <ScrollArea className="flex-grow">
        <nav className="py-4 px-2">
          <ul>
            {lessons.map((lesson) => {
              const lessonPath = `${basePath}/${lesson.slug}`;
              const isActive = pathname === lessonPath || (pathname === basePath && lesson.slug === 'introduction'); // Highlight intro if on base path
              return (
                <li key={lesson.slug} className="mb-1">
                  <Link
                    href={lessonPath}
                    className={cn(
                      "flex items-center justify-between w-full px-3 py-2.5 text-sm rounded-md transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                    )}
                  >
                    <span className="truncate pr-2">{lesson.title}</span>
                    <ChevronRight className={cn("h-4 w-4 shrink-0 transition-transform", isActive ? "text-primary" : "text-muted-foreground/70", { "transform rotate-0": !isActive })} />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </ScrollArea>
    </aside>
  );
}
