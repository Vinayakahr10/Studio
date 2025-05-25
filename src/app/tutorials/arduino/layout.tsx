
import type { ReactNode } from 'react';
import { TutorialSidebar } from '@/components/layout/TutorialSidebar';
import { arduinoTutorialLessons } from '@/data/arduino-tutorial-data.tsx';
import { Cpu } from 'lucide-react';


export const metadata = {
  title: 'Arduino Tutorials - ElectroLearn',
  description: 'Learn Arduino programming and electronics with step-by-step tutorials on ElectroLearn.',
};

export default function ArduinoTutorialLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="container mx-auto px-0 md:px-2 py-0 md:py-8 flex flex-col md:flex-row min-h-[calc(100vh-var(--header-height,4rem)-var(--footer-height,4rem))]">
      <div className="md:w-72 lg:w-80 flex-shrink-0 md:sticky md:top-16 md:max-h-[calc(100vh-var(--header-height,4rem)-2rem)] md:overflow-y-auto hidden md:block border-r border-border">
         <TutorialSidebar 
            lessons={arduinoTutorialLessons} 
            basePath="/tutorials/arduino"
            tutorialTitle="Arduino Tutorial"
        />
      </div>
      
      {/* Mobile Sidebar Section */}
      <div className="md:hidden px-2 py-3 border-b border-border">
         <h2 className="text-xl font-semibold text-primary mb-3">
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
      <main className="flex-grow pl-2 pr-4 py-4 md:pl-2 md:pr-4 lg:pl-4 lg:pr-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
