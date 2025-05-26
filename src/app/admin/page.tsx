
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BarChart, Newspaper } from "lucide-react"; // Removed ListChecks, Users

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
      <p className="text-muted-foreground">Welcome to the admin panel. Manage your blog posts here.</p>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Blogs</CardTitle>
            <Newspaper className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">125</div>
            <p className="text-xs text-muted-foreground">
              (Mock data)
            </p>
             <Button asChild size="sm" className="mt-4">
                <Link href="/admin/blogs">Manage Blogs</Link>
            </Button>
          </CardContent>
        </Card>
        
        {/* Removed Registered Users Card */}
        {/* Removed Pending Approvals Card */}

      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Site Analytics</CardTitle>
          <CardDescription>Overview of website traffic and engagement. (Placeholder)</CardDescription>
        </CardHeader>
        <CardContent className="h-64 flex items-center justify-center text-muted-foreground bg-muted/30 rounded-md">
          <BarChart className="h-16 w-16" />
          <p className="ml-4">Analytics chart would be displayed here.</p>
        </CardContent>
      </Card>

      <div className="text-center mt-8">
        <p className="text-sm text-muted-foreground">
          This admin panel is focused on blog management.
        </p>
      </div>
    </div>
  );
}
