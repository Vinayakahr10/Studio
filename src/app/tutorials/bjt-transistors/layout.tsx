
"use client"; 

import type { ReactNode } from 'react';
import { useState } from 'react';
import { TutorialSidebar } from '@/components/layout/TutorialSidebar';
import { bjtTutorialLessons } from '@/data/bjt-transistor-lessons';
import { Button } from '@/components/ui/button'; 
import { ChevronDown, ChevronUp } from 'lucide-react'; 
import type { ArduinoLesson as BJTLesson } from '@/types'; // Reusing type

export default function BJTTutorialLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [isMobileLessonsExpanded, setIsMobileLessonsExpanded] = useState(false);

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-var(--header-height,4rem)-var(--footer-height,4rem))] md:pl-0 md:py-0">
      {/* Desktop Sidebar */}
      <div className="md:w-72 lg:w-80 flex-shrink-0 md:sticky md:top-16 md:max-h-[calc(100vh-var(--header-height,4rem)-2rem)] md:overflow-y-auto hidden md:block border-r border-border bg-background md:bg-transparent z-10 md:pl-4 md:py-8">
         <TutorialSidebar 
            lessons={bjtTutorialLessons as BJTLesson[]}
            basePath="/tutorials/bjt-transistors"
            tutorialTitle="BJT Transistor Tutorials"
        />
      </div>
      
      {/* Mobile Sidebar Section */}
      <div className="md:hidden p-4 border-b border-border bg-card shadow-sm">
         <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-semibold text-primary">
                BJT Transistor Lessons
            </h2>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsMobileLessonsExpanded(!isMobileLessonsExpanded)}
              className="text-primary hover:text-primary/80"
              aria-expanded={isMobileLessonsExpanded}
              aria-controls="mobile-lesson-list-bjt"
            >
              {isMobileLessonsExpanded ? 'Hide Lessons' : 'View Lessons'}
              {isMobileLessonsExpanded ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
            </Button>
         </div>
        {isMobileLessonsExpanded && (
          <div id="mobile-lesson-list-bjt">
              <TutorialSidebar 
                  lessons={bjtTutorialLessons as BJTLesson[]}
                  basePath="/tutorials/bjt-transistors"
                  showSidebarHeader={false} 
              />
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <main className="flex-grow px-2 sm:px-4 md:px-6 lg:px-8 py-6 md:py-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
