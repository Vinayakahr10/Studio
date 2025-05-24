
// This page would eventually have pagination and more advanced filtering
import { BlogLayoutSection } from "@/components/sections/BlogLayoutSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl text-primary">ElectroLearn Blog</h1>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-lg">
          Articles, news, and insights from the world of electronics.
        </p>
      </div>

      <div className="mb-8 max-w-xl mx-auto">
        <div className="relative">
          <Input type="search" placeholder="Search articles..." className="w-full pl-10 h-12 text-base rounded-lg" />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </div>
      </div>

      {/* Re-using BlogLayoutSection structure. In a real app, this would be a more dedicated blog list. */}
      <BlogLayoutSection />
      
      {/* Placeholder for pagination controls */}
      <div className="mt-12 text-center">
        <Button variant="outline" size="lg">Older Posts</Button>
        <Button variant="outline" size="lg" className="ml-4">Newer Posts</Button>
      </div>
    </div>
  );
}
