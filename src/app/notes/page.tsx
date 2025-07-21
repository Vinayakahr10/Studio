
"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
    description: "View and download notes on fundamental principles.",
    Icon: Sigma,
    href: '#', // Placeholder link
  },
  {
    id: 'arduino-microcontrollers',
    title: 'Arduino & Microcontrollers',
    description: "View and download notes for Arduino programming and hardware.",
    Icon: Cpu,
    href: '/tutorials/arduino',
  },
  {
    id: 'digital-logic',
    title: 'Digital Logic',
    description: "View and download notes on binary, logic gates, and more.",
    Icon: Binary,
    href: '/tutorials/digital-electronics',
  },
  {
    id: 'sensors-actuators',
    title: 'Sensors and Actuators',
    description: "View and download notes for interfacing with various sensors.",
    Icon: Gauge,
    href: '/categories/sensors',
  },
  {
    id: 'circuit-analysis',
    title: 'Circuit Analysis Techniques',
    description: "View and download notes covering KVL, KCL, and theorems.",
    Icon: Network,
    href: '/tutorials/dc-circuit-theory',
  },
  {
    id: 'power-electronics',
    title: 'Power Electronics',
    description: "View and download notes on rectifiers, inverters, and converters.",
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
      
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => {
            const NoteIcon = note.Icon;
            return (
              <Link key={note.id} href={note.href} className="group block">
                <Card className="h-full transition-all duration-300 ease-in-out hover:shadow-xl hover:border-primary/50 hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 text-primary p-3 rounded-lg">
                        <NoteIcon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg font-semibold leading-snug mb-1 group-hover:text-primary transition-colors">
                            {note.title}
                        </CardTitle>
                        <CardDescription className="text-sm">
                            {note.description}
                        </CardDescription>
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
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
