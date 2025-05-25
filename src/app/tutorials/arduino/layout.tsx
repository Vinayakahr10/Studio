
import type { ReactNode } from 'react';
import { TutorialSidebar } from '@/components/layout/TutorialSidebar';
import { arduinoTutorialLessons } from '@/data/arduino-tutorial-data.tsx'; // Updated import
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
    <div className="container mx-auto px-0 md:px-4 py-0 md:py-8 flex flex-col md:flex-row min-h-[calc(100vh-var(--header-height,4rem)-var(--footer-height,4rem))]">
      {/* On mobile, sidebar could be a drawer or top section if needed. For now, standard layout */}
      <div className="md:w-72 lg:w-80 flex-shrink-0 md:sticky md:top-16 md:max-h-[calc(100vh-var(--header-height,4rem)-2rem)] md:overflow-y-auto hidden md:block">
         <TutorialSidebar 
            lessons={arduinoTutorialLessons} 
            basePath="/tutorials/arduino"
            tutorialTitle="Arduino Tutorial"
        />
      </div>
      {/* Mobile Sidebar Trigger (placeholder, actual implementation would use Sheet) */}
      <div className="md:hidden p-4 border-b">
         <h2 className="text-xl font-semibold flex items-center text-primary">
            <Cpu className="h-6 w-6 mr-2"/> Arduino Tutorial Menu
        </h2>
        {/* Add a button here to toggle a mobile sidebar/drawer if desired */}
      </div>
      <main className="flex-grow p-4 md:p-6 lg:p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
