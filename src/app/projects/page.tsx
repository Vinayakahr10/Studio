
"use client";

import React, { useState, useEffect } from 'react';
import { FeaturedProjectsSection, featuredProjectsData } from "@/components/sections/FeaturedProjectsSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import type { Project } from '@/types';

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(featuredProjectsData);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredProjects(featuredProjectsData);
    } else {
      const lowercasedFilter = searchTerm.toLowerCase();
      const newFilteredProjects = featuredProjectsData.filter(project =>
        project.title.toLowerCase().includes(lowercasedFilter) ||
        project.description.toLowerCase().includes(lowercasedFilter)
      );
      setFilteredProjects(newFilteredProjects);
    }
  }, [searchTerm]);

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl text-primary">All Projects</h1>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-lg">
          Browse our collection of electronics projects. Use the filter options to find projects matching your skill level and interests.
        </p>
      </div>
      
      <div className="mb-8 max-w-xl mx-auto">
        <div className="relative">
          <Input 
            type="search" 
            placeholder="Search projects by title or description..." 
            className="w-full pl-10 h-12 text-base rounded-lg" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </div>
        {/* Add filter dropdowns here in future */}
      </div>

      <FeaturedProjectsSection projects={filteredProjects} />

      {/* Placeholder: No "Load More" button for now as filtering is client-side on the full dataset */}
      {/* <div className="mt-12 text-center">
        <Button size="lg" variant="outline">Load More Projects</Button>
      </div> */}
    </div>
  );
}
