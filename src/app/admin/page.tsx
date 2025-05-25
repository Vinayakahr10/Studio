
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BarChart, ListChecks, Newspaper, Users } from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Blogs</CardTitle>
            <Newspaper className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">125</div>
            <p className="text-xs text-muted-foreground">
              +10 from last month
            </p>
             <Button asChild size="sm" className="mt-4">
                <Link href="/admin/blogs">Manage Blogs</Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Registered Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">842</div>
            <p className="text-xs text-muted-foreground">
              +52 new users this week
            </p>
            <Button asChild size="sm" variant="outline" className="mt-4">
                <Link href="/admin/users">Manage Users</Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <ListChecks className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              comments and articles
            </p>
             <Button asChild size="sm" variant="outline" className="mt-4">
                <Link href="#">View Approvals</Link>
            </Button>
          </CardContent>
        </Card>
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
          This is a basic admin dashboard. Functionality for managing content and users is not yet implemented.
        </p>
      </div>
    </div>
  );
}
