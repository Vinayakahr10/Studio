
"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, List, Edit, Trash2, Loader2, AlertTriangle } from "lucide-react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { db } from '@/lib/firebase/firebase';
import { collection, query, orderBy, getDocs, Timestamp } from 'firebase/firestore';
import type { Article } from "@/types";
import { format } from 'date-fns';

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      setError(null);
      if (!db) {
        setError("Firestore is not initialized. Please check Firebase configuration.");
        setLoading(false);
        return;
      }
      try {
        const blogsCollection = collection(db, "blogs");
        const q = query(blogsCollection, orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const fetchedBlogs: Article[] = querySnapshot.docs.map(doc => {
          const data = doc.data();
          let displayDate = 'N/A';
          if (data.createdAt && data.createdAt instanceof Timestamp) {
            displayDate = format(data.createdAt.toDate(), 'yyyy-MM-dd');
          } else if (data.createdAt) {
            // Attempt to handle if it's already a string or number (less ideal)
            try {
              displayDate = format(new Date(data.createdAt), 'yyyy-MM-dd');
            } catch (e) { console.warn("Could not format date:", data.createdAt)}
          }

          return {
            id: doc.id,
            title: data.title || "No Title",
            category: data.category || "Uncategorized",
            status: data.status || "draft",
            slug: data.slug || doc.id,
            summary: data.summary || "",
            imageUrl: data.imageUrl || "",
            href: `/blog/${data.slug || doc.id}`,
            date: displayDate, // Formatted date
            createdAt: data.createdAt, // Keep original for sorting if needed elsewhere
          } as Article;
        });
        setBlogs(fetchedBlogs);
      } catch (err: any) {
        console.error("Error fetching blogs:", err);
        setError(err.message || "Failed to fetch blog posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-2">Loading blog posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-destructive bg-destructive/10 p-4 rounded-md">
        <AlertTriangle className="h-10 w-10 mx-auto mb-2" />
        <p className="text-lg font-semibold">Error loading blog posts</p>
        <p>{error}</p>
        <p className="mt-2 text-sm">Please ensure Firebase is configured correctly and Firestore security rules allow access.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Blogs</h1>
          <p className="text-muted-foreground">View, edit, and create blog posts.</p>
        </div>
        <Button asChild>
          <Link href="/admin/blogs/add">
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Blog
          </Link>
        </Button>
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center"><List className="mr-2 h-5 w-5 text-primary"/>Blog Posts</CardTitle>
          <CardDescription>A list of all blog posts from Firestore.</CardDescription>
        </CardHeader>
        <CardContent>
          {blogs.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {blogs.map((blog) => (
                  <TableRow key={blog.id}>
                    <TableCell className="font-medium">{blog.title}</TableCell>
                    <TableCell>{blog.category}</TableCell>
                    <TableCell>
                       <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                         blog.status === 'published' ? 'bg-green-100 text-green-700 dark:bg-green-700/30 dark:text-green-300' :
                         blog.status === 'draft' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-700/30 dark:text-yellow-300' :
                         'bg-gray-100 text-gray-700 dark:bg-gray-700/30 dark:text-gray-300'
                        }`}>
                        {blog.status?.charAt(0).toUpperCase() + blog.status!.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell>{blog.date}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="outline" size="icon" className="h-8 w-8" disabled>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit (Placeholder)</span>
                      </Button>
                      <Button variant="destructive" size="icon" className="h-8 w-8" disabled>
                        <Trash2 className="h-4 w-4" />
                         <span className="sr-only">Delete (Placeholder)</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
               <TableCaption>End of blog posts list. Edit/Delete functionality is not yet implemented.</TableCaption>
            </Table>
          ) : (
            <p className="text-muted-foreground text-center py-8">No blog posts found. <Link href="/admin/blogs/add" className="text-primary hover:underline">Add the first one!</Link></p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
