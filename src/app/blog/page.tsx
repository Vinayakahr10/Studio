
"use client";

import React, { useState } from 'react';
import { BlogLayoutSection } from "@/components/sections/BlogLayoutSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
// Removed Firebase/Firestore related imports

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("");

  // Since Firestore is removed, BlogLayoutSection will use its internal staticArticlesData by default
  // If you want to filter these static articles, you'd do it here.
  // For now, we'll just pass an empty array to show the "coming soon" message.

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl text-foreground">EletronicswithVK Blog</h1>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-lg">
          Articles, news, and insights from the world of electronics.
        </p>
      </div>

      <div className="mb-8 max-w-xl mx-auto">
        <div className="relative">
          <Input 
            type="search" 
            placeholder="Search articles..." 
            className="w-full pl-10 h-12 text-base rounded-lg border-foreground/50 focus-visible:ring-primary" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            disabled // Since there are no articles yet
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </div>
      </div>
      
      {/* 
        We pass an empty array to the `articles` prop. This tells the component
        to not use its internal static data and instead show the "no articles" message.
      */}
      <BlogLayoutSection 
        title="" 
        description=""
        showViewAllButton={false}
        articles={[]}
      />
      
      <div className="mt-12 text-center">
        <Button variant="outline" size="lg" disabled>Older Posts (Placeholder)</Button>
        <Button variant="outline" size="lg" className="ml-4" disabled>Newer Posts (Placeholder)</Button>
      </div>
    </div>
  );
}
