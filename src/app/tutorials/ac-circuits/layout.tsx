
"use client"; 

import type { ReactNode } from 'react';
import { useState } from 'react';
import { TutorialSidebar } from '@/components/layout/TutorialSidebar';
import { acCircuitLessons } from '@/data/ac-circuits-lessons';
import { Button } from '@/components/ui/button'; 
import { ChevronDown, ChevronUp, ChevronsRight, ChevronsLeft } from 'lucide-react'; 
import type { ArduinoLesson } from '@/types'; // Using ArduinoLesson as a generic lesson type for sidebar
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

const sidebarLessons = acCircuitLessons.map(lesson => ({
  slug: lesson.slug,
  title: lesson.title, 
  description: lesson.description, 
}));


export default function ACCircuitTheoryLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileLessonsExpanded, setIsMobileLessonsExpanded] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-var(--header-height,4rem)-var(--footer-height,4rem))]">
      {/* Desktop Sidebar */}
      <div className={cn(
        "hidden md:flex flex-col flex-shrink-0 transition-all duration-300 ease-in-out border-r",
        isSidebarOpen ? "w-72 lg:w-80" : "w-14"
      )}>
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className={cn("text-xl font-semibold text-primary", !isSidebarOpen && "hidden")}>AC Circuit Lessons</h3>
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="text-primary hover:text-primary/80">
            {isSidebarOpen ? <ChevronsLeft className="h-5 w-5" /> : <ChevronsRight className="h-5 w-5" />}
          </Button>
        </div>
         <div className={cn("flex-grow overflow-y-auto", !isSidebarOpen && "overflow-y-hidden")}>
          <TutorialSidebar 
              lessons={sidebarLessons as ArduinoLesson[]} 
              basePath="/tutorials/ac-circuits"
              showSidebarHeader={false}
              isCollapsed={!isSidebarOpen}
          />
        </div>
      </div>
      
      {/* Mobile Sidebar Section */}
      <div className="md:hidden p-4 border-b border-border bg-card shadow-sm">
         <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-semibold text-primary">
                AC Circuit Lessons
            </h2>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsMobileLessonsExpanded(!isMobileLessonsExpanded)}
              className="text-primary hover:text-primary/80"
              aria-expanded={isMobileLessonsExpanded}
              aria-controls="mobile-lesson-list-ac"
            >
              {isMobileLessonsExpanded ? 'Hide' : 'View'}
              {isMobileLessonsExpanded ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
            </Button>
         </div>
        {isMobileLessonsExpanded && (
          <div id="mobile-lesson-list-ac">
              <TutorialSidebar 
                  lessons={sidebarLessons as ArduinoLesson[]} 
                  basePath="/tutorials/ac-circuits"
                  showSidebarHeader={false} 
              />
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <main className="flex-grow p-4 sm:p-6 md:p-8 overflow-y-auto bg-background">
        {children}
         <Separator className="my-8 md:my-12" />
        {/* Placeholder for Next/Prev buttons which will be in the [lessonSlug] page */}
      </main>
    </div>
  );
}
