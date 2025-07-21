
"use client";

import { FeaturedProjectsSection, featuredProjectsData } from "@/components/sections/FeaturedProjectsSection";
import type { Project } from '@/types';
import { Breadcrumbs, type BreadcrumbItem } from "@/components/ui/breadcrumbs";

const raspberryPiProjects = featuredProjectsData.filter(p => 
    p.tags?.includes('Raspberry Pi') || p.title.toLowerCase().includes('raspberry pi')
);

export default function RaspberryPiProjectsPage() {
    const breadcrumbItems: BreadcrumbItem[] = [
        { label: "Home", href: "/" },
        { label: "Projects", href: "/projects" },
        { label: "Raspberry Pi Projects" },
    ];
    
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <Breadcrumbs items={breadcrumbItems} />
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl text-foreground">Raspberry Pi Projects</h1>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-lg">
          Explore the capabilities of the Raspberry Pi single-board computer with these projects.
        </p>
      </div>
      <FeaturedProjectsSection projects={raspberryPiProjects} />
    </div>
  );
}
