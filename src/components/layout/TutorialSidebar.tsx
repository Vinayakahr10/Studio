
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import type { ArduinoLesson } from '@/data/arduino-tutorial-data.tsx';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChevronRight } from 'lucide-react';

interface TutorialSidebarProps {
  lessons: ArduinoLesson[];
  basePath: string;
  className?: string;
  tutorialTitle?: string;
  showSidebarHeader?: boolean;
  isCollapsed?: boolean;
}

export function TutorialSidebar({ 
  lessons, 
  basePath, 
  className, 
  tutorialTitle = "Tutorial Lessons", 
  showSidebarHeader = true,
  isCollapsed = false
}: TutorialSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className={cn(
      "w-full flex flex-col transition-all duration-300", 
      !isCollapsed ? "md:w-72 lg:w-80" : "md:w-14 items-center",
      className
    )}>
      {showSidebarHeader && !isCollapsed && (
        <div className="p-4 border-b border-border">
          <h3 className="text-xl font-semibold text-primary">{tutorialTitle}</h3>
        </div>
      )}
      <ScrollArea className="flex-grow w-full">
        <nav className={cn("py-2", isCollapsed ? "px-2" : "px-4")}>
          <ul>
            {lessons.map((lesson) => {
              const lessonPath = `${basePath}/${lesson.slug}`;
              const isActive = pathname === lessonPath || (pathname === basePath && lesson.slug === 'introduction');
              
              if (isCollapsed) {
                return (
                  <li key={lesson.slug} className="mb-1">
                    <Link
                      href={lessonPath}
                      className={cn(
                        "flex items-center justify-center w-8 h-8 rounded-md transition-colors",
                        isActive
                          ? "bg-primary/20 text-primary"
                          : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                      )}
                      title={lesson.title.replace(/^\d+\.\s*/, '')}
                    >
                      {lesson.Icon ? <lesson.Icon className="h-4 w-4" /> : <span className="text-xs font-bold">{lesson.title.match(/^\d+/)?.[0] || '●'}</span>}
                    </Link>
                  </li>
                );
              }

              return (
                <li key={lesson.slug} className="mb-1">
                  <Link
                    href={lessonPath}
                    className={cn(
                      "flex items-center justify-between w-full px-3 py-2.5 text-sm rounded-md transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground hover:bg-muted/30 hover:text-foreground"
                    )}
                  >
                    <span className="truncate pr-2">{lesson.title}</span>
                    <ChevronRight className={cn("h-4 w-4 shrink-0 transition-transform", isActive ? "text-primary" : "text-muted-foreground/70")} />
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
