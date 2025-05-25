
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, List, Edit, Trash2 } from "lucide-react";
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

// Mock data for blog posts
const mockBlogs = [
  { id: "1", title: "Introduction to Soldering", category: "Techniques", status: "Published", date: "2023-10-26" },
  { id: "2", title: "Understanding Logic Gates", category: "Digital Electronics", status: "Draft", date: "2023-10-22" },
  { id: "3", title: "Choosing a Power Supply", category: "Fundamentals", status: "Published", date: "2023-10-18" },
  { id: "4", title: "ESP32 Web Server Tutorial", category: "IoT", status: "Published", date: "2023-11-01" },
];


export default function AdminBlogsPage() {
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
          <CardDescription>A list of all blog posts in the system.</CardDescription>
        </CardHeader>
        <CardContent>
          {mockBlogs.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockBlogs.map((blog) => (
                  <TableRow key={blog.id}>
                    <TableCell className="font-medium">{blog.title}</TableCell>
                    <TableCell>{blog.category}</TableCell>
                    <TableCell>
                       <span className={`px-2 py-1 text-xs rounded-full ${blog.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {blog.status}
                      </span>
                    </TableCell>
                    <TableCell>{blog.date}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button variant="destructive" size="icon" className="h-8 w-8">
                        <Trash2 className="h-4 w-4" />
                         <span className="sr-only">Delete</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
               <TableCaption>End of blog posts list. Actual data management is not yet implemented.</TableCaption>
            </Table>
          ) : (
            <p className="text-muted-foreground text-center py-8">No blog posts found. <Link href="/admin/blogs/add" className="text-primary hover:underline">Add the first one!</Link></p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
