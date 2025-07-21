
"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, Sigma, Cpu, Binary, Gauge, Network, BatteryCharging, ArrowRight, FileText } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface NoteCategory {
  id: string;
  title: string;
  description: string;
  Icon: LucideIcon;
  href: string;
}

const notesData: NoteCategory[] = [
  {
    id: 'basic-electronics',
    title: 'Basic Electronics Concepts',
    description: "Download Notes Here",
    Icon: Sigma,
    href: '#', // Placeholder link
  },
  {
    id: 'arduino-microcontrollers',
    title: 'Arduino & Microcontrollers',
    description: "Download Notes Here",
    Icon: Cpu,
    href: '/tutorials/arduino',
  },
  {
    id: 'digital-logic',
    title: 'Digital Logic',
    description: "Download Notes Here",
    Icon: Binary,
    href: '/tutorials/digital-electronics',
  },
  {
    id: 'sensors-actuators',
    title: 'Sensors and Actuators',
    description: "Download Notes Here",
    Icon: Gauge,
    href: '/categories/sensors',
  },
  {
    id: 'circuit-analysis',
    title: 'Circuit Analysis Techniques',
    description: "Download Notes Here",
    Icon: Network,
    href: '/tutorials/dc-circuit-theory',
  },
  {
    id: 'power-electronics',
    title: 'Power Electronics',
    description: "Download Notes Here",
    Icon: BatteryCharging,
    href: '/tutorials/power-electronics',
  },
];


export default function NotesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredNotes, setFilteredNotes] = useState<NoteCategory[]>(notesData);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredNotes(notesData);
    } else {
      const lowercasedFilter = searchTerm.toLowerCase();
      const newFilteredNotes = notesData.filter(note =>
        note.title.toLowerCase().includes(lowercasedFilter) ||
        note.description.toLowerCase().includes(lowercasedFilter)
      );
      setFilteredNotes(newFilteredNotes);
    }
  }, [searchTerm]);

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-16">
      <section className="text-center mb-12 md:mb-16">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-primary">
          Electronics Notes
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl">
          A collection of curated notes, quick references, and important concepts in electronics.
        </p>
      </section>

      <div className="mb-12 max-w-2xl mx-auto">
        <div className="relative">
          <Input 
            type="search" 
            placeholder="Search notes..." 
            className="w-full pl-10 h-12 text-base rounded-lg border-foreground/50 focus-visible:ring-primary" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </div>
      </div>
      
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => {
            const NoteIcon = note.Icon;
            return (
              <Card key={note.id} className="text-center flex flex-col justify-between transition-all duration-300 ease-in-out hover:shadow-xl hover:border-primary/50 hover:-translate-y-1">
                <CardHeader className="items-center">
                    <div className="p-4 bg-primary/10 rounded-full w-fit mb-4">
                        <NoteIcon className="h-12 w-12 text-primary" />
                    </div>
                    <CardTitle className="text-xl font-semibold leading-snug">
                        {note.title}
                    </CardTitle>
                    <CardDescription>
                        {note.description}
                    </CardDescription>
                </CardHeader>
                <CardFooter className="flex-col sm:flex-row gap-2 justify-center">
                  <Button asChild variant="outline" className="w-full sm:w-auto">
                    <Link href={note.href}>PDF Notes</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full sm:w-auto">
                    <Link href={note.href}>Chapterwise Notes</Link>
                  </Button>
                </CardFooter>
              </Card>
            )
          })
        ) : (
          <div className="col-span-full text-center py-16">
            <p className="text-muted-foreground text-lg">No notes found matching your search.</p>
          </div>
        )}
      </section>
    </div>
  );
}
