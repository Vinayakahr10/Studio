
"use client";

import { FeaturedProjectsSection, featuredProjectsData } from "@/components/sections/FeaturedProjectsSection";
import type { Project } from '@/types';
import { Breadcrumbs, type BreadcrumbItem } from "@/components/ui/breadcrumbs";

const esp32Projects = featuredProjectsData.filter(p => 
    p.tags?.includes('ESP32') || p.title.toLowerCase().includes('esp32')
);

export default function ESP32ProjectsPage() {
    const breadcrumbItems: BreadcrumbItem[] = [
        { label: "Home", href: "/" },
        { label: "Projects", href: "/projects" },
        { label: "ESP32 Projects" },
    ];

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl text-foreground">ESP32 Projects</h1>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-lg">
                Harness the power of WiFi and Bluetooth with these ESP32-based projects.
            </p>
        </div>
      <FeaturedProjectsSection projects={esp32Projects} />
    </div>
  );
}
