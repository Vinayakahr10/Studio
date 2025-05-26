
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { db } from '@/lib/firebase/firebase'; // Import db
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useRouter } from "next/navigation";
import type { Article } from "@/types";

export default function AddBlogPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/[^\w-]+/g, '') // Remove all non-word chars
      .replace(/--+/g, '-'); // Replace multiple - with single -
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.target as HTMLFormElement);
    const title = formData.get("title") as string;
    let slug = formData.get("slug") as string;
    const category = formData.get("category") as string;
    const status = formData.get("status") as Article['status'] || 'draft';
    const summary = formData.get("summary") as string;
    const content = formData.get("content") as string;
    const featuredImage = formData.get("featuredImage") as string;
    const tagsString = formData.get("tags") as string;

    if (!title || !content) {
        toast({ title: "Error", description: "Title and Content are required.", variant: "destructive" });
        setLoading(false);
        return;
    }

    if (!slug && title) {
      slug = generateSlug(title);
    }

    const blogPost: Omit<Article, 'id' | 'href' | 'date'> & { createdAt: any } = {
      title,
      slug,
      category,
      status,
      summary,
      content,
      featuredImage: featuredImage || `https://placehold.co/800x400.png?text=${encodeURIComponent(title)}`,
      imageHint: "blog post image",
      tags: tagsString ? tagsString.split(',').map(tag => tag.trim()).filter(tag => tag) : [],
      author: "Admin", // Placeholder, or get from logged-in user
      createdAt: serverTimestamp(), // Firestore server timestamp
    };

    try {
      if (!db) {
        throw new Error("Firestore database is not available.");
      }
      await addDoc(collection(db, "blogs"), blogPost);
      toast({
        title: "Blog Post Saved!",
        description: "Your new blog post has been successfully saved to Firestore.",
      });
      (event.target as HTMLFormElement).reset();
      router.push('/admin/blogs'); // Redirect to blog list
    } catch (error: any) {
      console.error("Error adding document: ", error);
      toast({
        title: "Error Saving Post",
        description: error.message || "Could not save the blog post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
         <Button variant="outline" size="icon" asChild>
            <Link href="/admin/blogs">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to Blogs</span>
            </Link>
          </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Add New Blog Post</h1>
          <p className="text-muted-foreground">Fill in the details for your new article.</p>
        </div>
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Blog Post Details</CardTitle>
          <CardDescription>Provide all necessary information for the blog post.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input name="title" id="title" placeholder="Enter blog post title" required className="h-11 text-base" />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select name="category" defaultValue="fundamentals">
                    <SelectTrigger className="h-11 text-base">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="techniques">Techniques</SelectItem>
                      <SelectItem value="digital-electronics">Digital Electronics</SelectItem>
                      <SelectItem value="fundamentals">Fundamentals</SelectItem>
                      <SelectItem value="iot">IoT</SelectItem>
                      <SelectItem value="projects">Projects</SelectItem>
                       <SelectItem value="news">News</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                     <Select name="status" defaultValue="draft">
                        <SelectTrigger className="h-11 text-base">
                        <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="slug">Slug (URL Path)</Label>
              <Input name="slug" id="slug" placeholder="e.g., my-awesome-post (auto-generated if blank)" className="h-11 text-base" />
              <p className="text-xs text-muted-foreground">If left blank, it will be generated from the title.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="summary">Summary / Excerpt</Label>
              <Textarea name="summary" id="summary" placeholder="A short summary of the blog post..." rows={3} className="text-base" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Main Content (Markdown Supported)</Label>
              <Textarea name="content" id="content" placeholder="Write your blog post content here..." required rows={10} className="text-base" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="featuredImage">Featured Image URL</Label>
              <Input name="featuredImage" id="featuredImage" type="url" placeholder="https://placehold.co/800x400.png" className="h-11 text-base" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input name="tags" id="tags" placeholder="e.g., arduino, beginner, sensors" className="h-11 text-base" />
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" asChild disabled={loading}>
                <Link href="/admin/blogs">Cancel</Link>
              </Button>
              <Button type="submit" size="lg" className="transition-transform hover:scale-105" disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                {loading ? "Saving..." : "Save Post"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
