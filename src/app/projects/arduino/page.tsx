
"use client";

import { FeaturedProjectsSection, featuredProjectsData } from "@/components/sections/FeaturedProjectsSection";
import type { Project } from '@/types';
import { Breadcrumbs, type BreadcrumbItem } from "@/components/ui/breadcrumbs";

const arduinoProjects = featuredProjectsData.filter(p => 
    p.tags?.includes('Arduino') || p.title.toLowerCase().includes('arduino')
);

export default function ArduinoProjectsPage() {
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "Arduino Projects" },
  ];

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <Breadcrumbs items={breadcrumbItems} />
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl text-foreground">Arduino Projects</h1>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-lg">
          Discover a variety of projects built on the versatile Arduino platform.
        </p>
      </div>
      <FeaturedProjectsSection projects={arduinoProjects} />
    </div>
  );
}
