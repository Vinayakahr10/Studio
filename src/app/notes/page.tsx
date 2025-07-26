
"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, Sigma, Cpu, Binary, Gauge, Network, BatteryCharging, ArrowRight, FileText, Info } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface NoteCategory {
  id: string;
  title: string;
  description: string;
  Icon: LucideIcon;
  href?: string;
  isReady: boolean;
}

const notesData: NoteCategory[] = [
  {
    id: 'basic-electronics',
    title: 'Basic Electronics Concepts',
    description: "Fundamental principles of electronics.",
    Icon: Sigma,
    isReady: false,
  },
  {
    id: 'arduino-microcontrollers',
    title: 'Arduino & Microcontrollers',
    description: "Notes for Arduino programming and hardware.",
    Icon: Cpu,
    href: '/tutorials/arduino',
    isReady: true, // Assuming the tutorial link is a valid substitute for now
  },
  {
    id: 'digital-logic',
    title: 'Digital Logic',
    description: "Notes on binary, logic gates, and more.",
    Icon: Binary,
    href: '/tutorials/digital-electronics',
    isReady: true,
  },
  {
    id: 'sensors-actuators',
    title: 'Sensors and Actuators',
    description: "Interfacing with various sensors and actuators.",
    Icon: Gauge,
    href: '/categories/sensors',
    isReady: true,
  },
  {
    id: 'circuit-analysis',
    title: 'Circuit Analysis Techniques',
    description: "Covering KVL, KCL, and theorems.",
    Icon: Network,
    href: '/tutorials/dc-circuit-theory',
    isReady: true,
  },
  {
    id: 'power-electronics',
    title: 'Power Electronics',
    description: "Notes on rectifiers, inverters, and converters.",
    Icon: BatteryCharging,
    href: '/tutorials/power-electronics',
    isReady: true,
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
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-foreground">
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
            placeholder="Search notes categories..." 
            className="w-full pl-10 h-12 text-base rounded-lg border-foreground/50 focus-visible:ring-primary" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </div>
      </div>
      
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => {
            const NoteIcon = note.Icon;
            const cardContent = (
              <Card className="h-full shadow-md border-border/80 group">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 text-primary p-3 rounded-lg">
                      <NoteIcon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg font-semibold leading-snug mb-1 text-primary group-hover:text-foreground transition-colors">
                          {note.title}
                      </CardTitle>
                      <CardDescription className="text-sm">
                          {note.description}
                      </CardDescription>
                      {!note.isReady && (
                        <Badge variant="secondary" className="mt-2 text-xs">Coming Soon</Badge>
                      )}
                    </div>
                    {note.isReady && <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />}
                  </div>
                </CardContent>
              </Card>
            );

            return note.isReady && note.href ? (
              <Link key={note.id} href={note.href} className="block">
                {cardContent}
              </Link>
            ) : (
              <div key={note.id} className="cursor-not-allowed opacity-70">
                {cardContent}
              </div>
            );
          })
        ) : (
          <div className="col-span-full text-center py-16">
            <p className="text-muted-foreground text-lg">No note categories found matching your search.</p>
          </div>
        )}
      </section>
      <Card className="mt-12 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <CardHeader className="flex flex-row items-center gap-4">
            <Info className="h-6 w-6 text-blue-600 dark:text-blue-400"/>
            <CardTitle className="text-blue-800 dark:text-blue-300">Under Development</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-blue-700 dark:text-blue-300/90">
                The full "Notes" section with downloadable PDFs and detailed summaries is currently under construction. 
                For now, some categories link to relevant tutorial sections. Thank you for your patience!
            </p>
        </CardContent>
      </Card>
    </div>
  );
}
