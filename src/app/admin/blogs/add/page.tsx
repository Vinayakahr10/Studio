
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function AddBlogPage() {
  const { toast } = useToast();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // In a real app, you would handle form submission to save the blog post
    toast({
      title: "Blog Post Submitted (Placeholder)",
      description: "This form is a placeholder. Data is not actually saved.",
    });
    (event.target as HTMLFormElement).reset();
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
              <Input id="title" placeholder="Enter blog post title" required className="h-11 text-base" />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select name="category">
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
              <Input id="slug" placeholder="e.g., my-awesome-post" className="h-11 text-base" />
              <p className="text-xs text-muted-foreground">If left blank, it will be generated from the title.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="summary">Summary / Excerpt</Label>
              <Textarea id="summary" placeholder="A short summary of the blog post..." rows={3} className="text-base" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Main Content (Markdown Supported)</Label>
              <Textarea id="content" placeholder="Write your blog post content here..." required rows={10} className="text-base" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="featuredImage">Featured Image URL</Label>
              <Input id="featuredImage" type="url" placeholder="https://placehold.co/800x400.png" className="h-11 text-base" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input id="tags" placeholder="e.g., arduino, beginner, sensors" className="h-11 text-base" />
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" asChild>
                <Link href="/admin/blogs">Cancel</Link>
              </Button>
              <Button type="submit" size="lg" className="transition-transform hover:scale-105">
                <Save className="mr-2 h-4 w-4" /> Save Post
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
