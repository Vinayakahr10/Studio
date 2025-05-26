
"use client";

import React, { useState, useEffect } from 'react';
import { BlogLayoutSection } from "@/components/sections/BlogLayoutSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Loader2, AlertTriangle } from "lucide-react";
import { db } from '@/lib/firebase/firebase';
import { collection, query, where, orderBy, getDocs, Timestamp } from 'firebase/firestore';
import type { Article } from "@/types";
import { format } from 'date-fns';

export default function BlogPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState(""); // For future client-side filtering if needed

  useEffect(() => {
    const fetchPublishedBlogs = async () => {
      setLoading(true);
      setError(null);
      if (!db) {
        setError("Firestore is not initialized. Please check Firebase configuration.");
        setLoading(false);
        return;
      }
      try {
        const blogsCollection = collection(db, "blogs");
        // Query for posts where status is 'published', order by creation date descending
        const q = query(
          blogsCollection, 
          where("status", "==", "published"), 
          orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);
        const fetchedBlogs: Article[] = querySnapshot.docs.map(doc => {
          const data = doc.data();
          let displayDate = 'N/A';
          if (data.createdAt && data.createdAt instanceof Timestamp) {
            displayDate = format(data.createdAt.toDate(), 'MMMM dd, yyyy');
          }

          return {
            id: doc.id,
            title: data.title || "No Title",
            slug: data.slug || doc.id,
            summary: data.summary || "No summary available.",
            imageUrl: data.featuredImage || data.imageUrl || `https://placehold.co/400x250.png?text=${encodeURIComponent(data.title || 'Blog Post')}`,
            imageHint: data.imageHint || "blog feature image",
            href: `/blog/${data.slug || doc.id}`, // Adjust if you create individual blog pages
            category: data.category || "Uncategorized",
            date: displayDate,
            author: data.author || "EletronicswithVK Team",
            status: data.status,
            content: data.content,
            tags: data.tags,
            createdAt: data.createdAt,
          } as Article;
        });
        setArticles(fetchedBlogs);
      } catch (err: any) {
        console.error("Error fetching published blogs:", err);
        setError(err.message || "Failed to fetch blog posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchPublishedBlogs();
  }, []);

  // Client-side search (can be enhanced with server-side search for larger datasets)
  const filteredArticles = articles.filter(article => 
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (article.summary && article.summary.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (article.category && article.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl text-primary">EletronicswithVK Blog</h1>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-lg">
          Articles, news, and insights from the world of electronics.
        </p>
      </div>

      <div className="mb-8 max-w-xl mx-auto">
        <div className="relative">
          <Input 
            type="search" 
            placeholder="Search articles..." 
            className="w-full pl-10 h-12 text-base rounded-lg" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </div>
      </div>
      
      {loading && (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="ml-2">Loading articles...</p>
        </div>
      )}

      {error && (
        <div className="text-center py-8 text-destructive bg-destructive/10 p-4 rounded-md">
          <AlertTriangle className="h-10 w-10 mx-auto mb-2" />
          <p className="text-lg font-semibold">Error loading articles</p>
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && (
        <BlogLayoutSection 
          articles={filteredArticles} 
          title="" // Title is already on the page
          description="" // Description is already on the page
          showViewAllButton={false} // No "View All" button needed here
        />
      )}
      
      {!loading && !error && filteredArticles.length > 0 && (
        <div className="mt-12 text-center">
          <Button variant="outline" size="lg" disabled>Older Posts (Placeholder)</Button>
          <Button variant="outline" size="lg" className="ml-4" disabled>Newer Posts (Placeholder)</Button>
        </div>
      )}
    </div>
  );
}
