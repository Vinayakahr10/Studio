
"use client";

import { FeaturedProjectsSection, featuredProjectsData } from "@/components/sections/FeaturedProjectsSection";
import type { Project } from '@/types';
import { Breadcrumbs, type BreadcrumbItem } from "@/components/ui/breadcrumbs";

const digitalProjects = featuredProjectsData.filter(p => 
    p.tags?.includes('ESP32') || 
    p.tags?.includes('Arduino') ||
    p.tags?.includes('Raspberry Pi') ||
    p.tags?.includes('IoT')
);

export default function DigitalProjectsPage() {
    const breadcrumbItems: BreadcrumbItem[] = [
        { label: "Home", href: "/" },
        { label: "Projects", href: "/projects" },
        { label: "Digital Projects" },
    ];

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <Breadcrumbs items={breadcrumbItems} />
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl text-foreground">Digital Electronics Projects</h1>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-lg">
          Explore projects based on microcontrollers, single-board computers, and digital logic.
        </p>
      </div>
      <FeaturedProjectsSection projects={digitalProjects} />
    </div>
  );
}
