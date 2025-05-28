
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

export default function NotesPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-16">
      <section className="text-center mb-12 md:mb-16">
        <div className="inline-block bg-primary/10 p-3 rounded-full mb-4 mx-auto w-fit">
          <FileText className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-primary">
          Electronics Concept Notes
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl">
          A collection of curated notes, quick references, and important concepts in electronics from EletronicswithVK.
        </p>
      </section>

      <section className="max-w-3xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Browse Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              This section will feature a variety of notes covering fundamental electronics principles, component guides, circuit analysis techniques, and more.
            </p>
            <p className="mt-4 text-muted-foreground">
              Currently, this page serves as a placeholder. Future updates will include organized categories and individual notes for you to explore.
            </p>
            {/* Placeholder for future listing of notes or categories */}
            <div className="mt-6 space-y-3">
                <div className="p-4 bg-muted/50 rounded-md">
                    <h3 className="font-semibold text-primary">Ohm's Law Explained (Coming Soon)</h3>
                    <p className="text-sm text-muted-foreground">A quick reference guide to understanding and applying Ohm's Law.</p>
                </div>
                 <div className="p-4 bg-muted/50 rounded-md">
                    <h3 className="font-semibold text-primary">Capacitor Basics (Coming Soon)</h3>
                    <p className="text-sm text-muted-foreground">Notes on capacitor types, markings, and common applications.</p>
                </div>
                 <div className="p-4 bg-muted/50 rounded-md">
                    <h3 className="font-semibold text-primary">Transistor Fundamentals (Coming Soon)</h3>
                    <p className="text-sm text-muted-foreground">An overview of BJT and MOSFET transistors and their operating principles.</p>
                </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
