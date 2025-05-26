
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { LogIn } from "lucide-react";
import Link from "next/link";

// IMPORTANT: Hardcoded credentials for demonstration purposes only.
// In a real application, use a secure backend authentication system.
const ADMIN_EMAIL = "admin@electrolearn.com";
const ADMIN_PASSWORD = "admin123";

export default function LoginPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // Simulate successful login
      try {
        localStorage.setItem('isElectroAdminLoggedIn', 'true');
        toast({
          title: "Login Successful",
          description: "Redirecting to admin panel...",
        });
        router.push('/admin');
      } catch (error) {
        toast({
          title: "Login Error",
          description: "Could not save login state. Please ensure cookies/localStorage are enabled.",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid email or password.",
        variant: "destructive",
      });
    }
  };

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
              />
            </div>
            <p className="text-xs text-muted-foreground">Demo credentials: {ADMIN_EMAIL} / {ADMIN_PASSWORD}</p>
            <Button type="submit" size="lg" className="w-full transition-transform hover:scale-105">
              Login
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center text-sm space-y-2">
          <p className="text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="#" className="text-primary hover:underline">
              Create an account
            </Link>
          </p>
          <p className="text-muted-foreground">
            This is a placeholder login form for demonstration.
          </p>
          <Link href="/" className="text-primary hover:underline mt-2">
            &larr; Back to Home
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
