
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

// IMPORTANT: Admin email for demonstration purposes.
// In a real app, proper role management is needed.
const ADMIN_EMAIL = "admin@electrolearn.com";

export default function LoginPage() {
  const { login, user, isAdmin, loading } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user && !loading) { // Check !loading to prevent redirect before auth state is confirmed
      if (isAdmin) {
        router.replace('/admin');
      } else {
        // Optional: redirect non-admin users from login if already logged in
        // router.replace('/'); 
      }
    }
  }, [user, isAdmin, loading, router]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await login(email, password);
    // Redirection is handled by onAuthStateChanged in useAuth or the useEffect above
  };
  
  if (loading && !user) { // Show loading only if auth is still resolving and no user yet
    return <div className="flex h-screen items-center justify-center"><p>Loading...</p></div>;
  }
  if (user && isAdmin && !loading) { // Redirect if logged in, admin, and auth loaded
    return <div className="flex h-screen items-center justify-center"><p>Redirecting to admin panel...</p></div>;
  }
  // If user is logged in but not admin, they can still see the login page (or be redirected by useEffect if desired)

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] py-12">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <LogIn className="mx-auto h-10 w-10 text-primary mb-2" />
          <CardTitle className="text-3xl">Admin Login</CardTitle>
          <CardDescription>Enter your credentials to access the admin panel.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="admin@electrolearn.com" 
                required 
                className="h-11 text-base"
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••" 
                required 
                className="h-11 text-base"
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                disabled={loading}
              />
            </div>
            <p className="text-xs text-muted-foreground">Demo admin: {ADMIN_EMAIL} (any password after Firebase setup)</p>
            <Button type="submit" size="lg" className="w-full transition-transform hover:scale-105" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center text-sm space-y-2">
           <p className="text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-primary hover:underline">
              Create an account
            </Link>
          </p>
          <p className="text-muted-foreground px-4 text-center text-xs">
            Reminder: For login to function, ensure your Firebase project is configured correctly (check <code>.env.local</code> for credentials &amp; enable Email/Password sign-in method in your Firebase console).
          </p>
          <Link href="/" className="text-primary hover:underline mt-2">
            &larr; Back to Home
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

