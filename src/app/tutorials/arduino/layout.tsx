
"use client"; // Required for useState

import type { ReactNode } from 'react';
import { useState } from 'react'; // Added for state management
import { TutorialSidebar } from '@/components/layout/TutorialSidebar';
import { arduinoTutorialLessons } from '@/data/arduino-tutorial-data.tsx';
import { Button } from '@/components/ui/button'; // Added for the toggle button
import { ChevronDown, ChevronUp } from 'lucide-react'; // Added for icons

// Metadata can still be exported from client components in Next.js 13+ App Router
// export const metadata = {
//   title: 'Arduino Tutorials - EletronicswithVK',
//   description: 'Learn Arduino programming and electronics with step-by-step tutorials on EletronicswithVK.',
// };
// However, for dynamic metadata or if preferred, this can be moved or handled differently.
// For simplicity, we'll keep it commented for now if static export from client component causes issues,
// or assume it works as per latest Next.js capabilities. If an error arises, we'd move it.

export default function ArduinoTutorialLayout({
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
            lessons={arduinoTutorialLessons} 
            basePath="/tutorials/arduino"
            tutorialTitle="Arduino Tutorial"
        />
      </div>
      
      {/* Mobile Sidebar Section */}
      <div className="md:hidden p-4 border-b border-border bg-card shadow-sm">
         <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-semibold text-primary">
                Arduino Tutorial
            </h2>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsMobileLessonsExpanded(!isMobileLessonsExpanded)}
              className="text-primary hover:text-primary/80"
              aria-expanded={isMobileLessonsExpanded}
              aria-controls="mobile-lesson-list"
            >
              {isMobileLessonsExpanded ? 'Hide Lessons' : 'View Lessons'}
              {isMobileLessonsExpanded ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
            </Button>
         </div>
        {isMobileLessonsExpanded && (
          <div id="mobile-lesson-list">
              <TutorialSidebar 
                  lessons={arduinoTutorialLessons} 
                  basePath="/tutorials/arduino"
                  showSidebarHeader={false} // Title is handled above
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
