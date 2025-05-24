
import { FeaturedProjectsSection } from "@/components/sections/FeaturedProjectsSection"; // Re-use for now
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function ProjectsPage() {
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
          <Input type="search" placeholder="Search projects..." className="w-full pl-10 h-12 text-base rounded-lg" />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </div>
        {/* Add filter dropdowns here in future */}
      </div>

      {/* Using FeaturedProjectsSection as a placeholder for a more detailed project listing */}
      <FeaturedProjectsSection />

      <div className="mt-12 text-center">
        <Button size="lg" variant="outline">Load More Projects</Button>
      </div>
    </div>
  );
}
