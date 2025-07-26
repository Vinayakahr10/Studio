
"use client";

import React, { useState, useEffect } from 'react';
import { TutorialCategoriesSection, categoriesData } from "@/components/sections/TutorialCategoriesSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Code, BookOpen } from "lucide-react";
import type { Category } from '@/types';

// Split categories into two types
const programmingCategoriesData = categoriesData.filter(c => ['arduino', 'stm32', 'esp32'].includes(c.id));
const theoryCategoriesData = categoriesData.filter(c => ['dc-circuit-theory', 'digital-electronics'].includes(c.id));


export default function TutorialsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const [filteredProgrammingCategories, setFilteredProgrammingCategories] = useState<Category[]>(programmingCategoriesData);
  const [filteredTheoryCategories, setFilteredTheoryCategories] = useState<Category[]>(theoryCategoriesData);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredProgrammingCategories(programmingCategoriesData);
      setFilteredTheoryCategories(theoryCategoriesData);
    } else {
      const lowercasedFilter = searchTerm.toLowerCase();
      
      const newFilteredProgramming = programmingCategoriesData.filter(category =>
        category.name.toLowerCase().includes(lowercasedFilter) ||
        (category.description && category.description.toLowerCase().includes(lowercasedFilter))
      );
      setFilteredProgrammingCategories(newFilteredProgramming);
      
      const newFilteredTheory = theoryCategoriesData.filter(category =>
        category.name.toLowerCase().includes(lowercasedFilter) ||
        (category.description && category.description.toLowerCase().includes(lowercasedFilter))
      );
      setFilteredTheoryCategories(newFilteredTheory);
    }
  }, [searchTerm]);

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl text-foreground">Tutorials</h1>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-lg">
          Explore our extensive library of electronics tutorials. Start learning today!
        </p>
      </div>

       <div className="mb-12 max-w-xl mx-auto">
        <div className="relative">
          <Input 
            type="search" 
            placeholder="Search all tutorials..." 
            className="w-full pl-10 h-12 text-base rounded-lg border-foreground/50 focus-visible:ring-primary" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </div>
      </div>
      
      {/* Programming Section */}
      <div id="programming" className="mb-12 md:mb-16 scroll-mt-20">
        <div className="mb-8 md:mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl flex items-center justify-center gap-3">
              <Code className="h-8 w-8 text-primary"/>
              Programming & Microcontrollers
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-muted-foreground md:text-lg">
              Dive into coding with popular platforms like Arduino, ESP32, and STM32.
            </p>
        </div>
        <TutorialCategoriesSection categories={filteredProgrammingCategories} showSectionTitle={false} />
      </div>

      {/* Theory Section */}
       <div id="theory" className="scroll-mt-20">
        <div className="mb-8 md:mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl flex items-center justify-center gap-3">
              <BookOpen className="h-8 w-8 text-primary"/>
              Fundamentals & Theory
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-muted-foreground md:text-lg">
             Strengthen your understanding of core electronics principles.
            </p>
        </div>
        <TutorialCategoriesSection categories={filteredTheoryCategories} showSectionTitle={false} />
      </div>

    </div>
  );
}
