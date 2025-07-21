
"use client";

import { FeaturedProjectsSection, featuredProjectsData } from "@/components/sections/FeaturedProjectsSection";
import type { Project } from '@/types';
import { Breadcrumbs, type BreadcrumbItem } from "@/components/ui/breadcrumbs";

const stm32Projects = featuredProjectsData.filter(p => 
    p.tags?.includes('STM32') || p.title.toLowerCase().includes('stm32')
);

export default function STM32ProjectsPage() {
    const breadcrumbItems: BreadcrumbItem[] = [
        { label: "Home", href: "/" },
        { label: "Projects", href: "/projects" },
        { label: "STM32 Projects" },
    ];
    
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <Breadcrumbs items={breadcrumbItems} />
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl text-foreground">STM32 Projects</h1>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-lg">
          Explore powerful projects using the versatile STM32 ARM Cortex-M microcontrollers.
        </p>
      </div>
      <FeaturedProjectsSection projects={stm32Projects} />
    </div>
  );
}
