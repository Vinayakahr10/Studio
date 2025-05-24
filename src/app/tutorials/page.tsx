
import { TutorialCategoriesSection } from "@/components/sections/TutorialCategoriesSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function TutorialsPage() {
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
          <Input type="search" placeholder="Search tutorials..." className="w-full pl-10 h-12 text-base rounded-lg" />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </div>
      </div>
      
      <TutorialCategoriesSection />

      <div className="mt-12 text-center">
        {/* Placeholder for featured tutorials or a list */}
        <p className="text-muted-foreground">More tutorials coming soon...</p>
      </div>
    </div>
  );
}
