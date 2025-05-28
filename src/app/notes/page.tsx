
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
          Notes Section
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl">
          A place for your thoughts, quick references, or important information.
        </p>
      </section>

      <section className="max-w-3xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">My Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              This is a placeholder for the Notes page. You can expand this page to include features like:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
              <li>A rich text editor for creating and saving notes.</li>
              <li>Organizing notes into categories or notebooks.</li>
              <li>Searching through your notes.</li>
              <li>If user accounts are implemented, notes could be saved per user.</li>
            </ul>
            <p className="mt-4 text-muted-foreground">
              For now, this page serves as a structural placeholder.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
