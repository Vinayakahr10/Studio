
import type { ReactNode } from 'react';
import { TutorialSidebar } from '@/components/layout/TutorialSidebar';
import { arduinoTutorialLessons } from '@/data/arduino-tutorial-data.tsx';
import { Cpu } from 'lucide-react';


export const metadata = {
  title: 'Arduino Tutorials - EletronicswithVK',
  description: 'Learn Arduino programming and electronics with step-by-step tutorials on EletronicswithVK.',
};

export default function ArduinoTutorialLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-var(--header-height,4rem)-var(--footer-height,4rem))] md:pl-0 md:py-0">
      <div className="md:w-72 lg:w-80 flex-shrink-0 md:sticky md:top-16 md:max-h-[calc(100vh-var(--header-height,4rem)-2rem)] md:overflow-y-auto hidden md:block border-r border-border bg-background md:bg-transparent z-10 md:pl-4 md:py-8">
         <TutorialSidebar 
            lessons={arduinoTutorialLessons} 
            basePath="/tutorials/arduino"
            tutorialTitle="Arduino Tutorial"
        />
      </div>
      
      {/* Mobile Sidebar Section */}
      <div className="md:hidden p-4 border-b border-border bg-card shadow-sm"> {/* Changed styling for the container */}
         <h2 className="text-xl font-semibold text-primary mb-3"> {/* Changed heading style */}
            Arduino Tutorial
        </h2>
        <div>
            <TutorialSidebar 
                lessons={arduinoTutorialLessons} 
                basePath="/tutorials/arduino"
                showSidebarHeader={false}
            />
        </div>
      </div>
      <main className="flex-grow px-2 sm:px-4 md:px-6 lg:px-8 py-6 md:py-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
