
"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';

export default function NotesPage() {

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-16">
      <section className="text-center mb-12 md:mb-16">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-foreground">
          Electronics Notes
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl">
          A collection of curated notes, quick references, and important concepts in electronics.
        </p>
      </section>

      <Card className="mt-12 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 max-w-2xl mx-auto">
        <CardHeader className="flex flex-row items-center gap-4">
            <Info className="h-6 w-6 text-blue-600 dark:text-blue-400"/>
            <CardTitle className="text-blue-800 dark:text-blue-300">Under Development</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-blue-700 dark:text-blue-300/90">
                The full "Notes" section with downloadable PDFs and detailed summaries is currently under construction. 
                Thank you for your patience!
            </p>
        </CardContent>
      </Card>
    </div>
  );
}
