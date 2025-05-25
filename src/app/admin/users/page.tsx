
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Users, UserPlus, ShieldAlert, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Mock data for users
const mockUsers = [
  { id: "1", name: "Alice Wonderland", email: "alice@example.com", role: "Admin", joined: "2023-01-15", status: "Active" },
  { id: "2", name: "Bob The Builder", email: "bob@example.com", role: "Editor", joined: "2023-03-22", status: "Active" },
  { id: "3", name: "Charlie Brown", email: "charlie@example.com", role: "Subscriber", joined: "2023-05-10", status: "Inactive" },
  { id: "4", name: "Diana Prince", email: "diana@example.com", role: "Contributor", joined: "2023-07-01", status: "Active" },
];

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Users</h1>
          <p className="text-muted-foreground">View, edit, and manage user accounts and roles.</p>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" /> Add New User
        </Button>
      </div>

      <Card className="shadow-md">
        <CardHeader>
           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <CardTitle className="flex items-center"><Users className="mr-2 h-5 w-5 text-primary"/>User Accounts</CardTitle>
            <div className="relative sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search users..." className="pl-8" />
            </div>
          </div>
          <CardDescription>A list of all registered users in the system. User management functionality is not yet implemented.</CardDescription>
        </CardHeader>
        <CardContent>
           {mockUsers.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                       <Badge variant={user.role === 'Admin' ? 'default' : 'secondary'}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.joined}</TableCell>
                     <TableCell>
                      <Badge variant={user.status === 'Active' ? 'outline' : 'destructive'} className={user.status === 'Active' ? 'border-green-500 text-green-600' : ''}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">Edit</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
             <p className="text-muted-foreground text-center py-8">No users found.</p>
          )}
        </CardContent>
      </Card>
      
      <Card className="shadow-md bg-destructive/10 border-destructive">
        <CardHeader>
          <CardTitle className="flex items-center"><ShieldAlert className="mr-2 h-5 w-5 text-destructive"/>Important Note</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-destructive-foreground">
            User management and role assignments are critical security features.
            The UI above is a placeholder. Proper implementation requires secure backend logic and authentication.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
