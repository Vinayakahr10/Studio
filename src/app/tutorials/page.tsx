
"use client";

import React, { useState, useEffect } from 'react';
import { TutorialCategoriesSection, categoriesData } from "@/components/sections/TutorialCategoriesSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import type { Category } from '@/types';
import Image from 'next/image';

export default function TutorialsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCategories, setFilteredCategories] = useState<Category[]>(categoriesData);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredCategories(categoriesData);
    } else {
      const lowercasedFilter = searchTerm.toLowerCase();
      const newFilteredCategories = categoriesData.filter(category =>
        category.name.toLowerCase().includes(lowercasedFilter) ||
        (category.description && category.description.toLowerCase().includes(lowercasedFilter))
      );
      setFilteredCategories(newFilteredCategories);
    }
  }, [searchTerm]);

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl text-primary">Tutorials</h1>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-lg">
          Explore our extensive library of electronics tutorials. Start learning today!
        </p>
      </div>

       <div className="mb-8 max-w-xl mx-auto">
        <div className="relative">
          <Input 
            type="search" 
            placeholder="Search tutorials by name or description..." 
            className="w-full pl-10 h-12 text-base rounded-lg" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </div>
      </div>
      
      <TutorialCategoriesSection categories={filteredCategories} />

      {/* <div className="mt-12 text-center">
        <p className="text-muted-foreground">More tutorials coming soon...</p>
      </div> */}
    </div>
  );
}
