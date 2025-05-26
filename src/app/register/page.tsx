
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

export default function RegisterPage() {
  const { signup, user, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (user && !loading) {
      // If user is already logged in, redirect from register page
      router.replace('/');
    }
  }, [user, loading, router]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      toast({
        title: "Registration Failed",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }
    
    const success = await signup(email, password);
    if (success) {
      // Firebase automatically signs in the user after successful creation.
      // onAuthStateChanged in useAuth will handle further state updates.
      // Redirect to homepage, user can then navigate or be redirected if admin by other logic.
      router.push('/'); 
    }
    // Toast notifications for success/failure are handled within the signup function in useAuth
  };
  
  if (loading && !user) {
    return <div className="flex h-screen items-center justify-center"><p>Loading...</p></div>;
  }
  if (user) {
    // Already logged in, should be redirected by useEffect
    return <div className="flex h-screen items-center justify-center"><p>Redirecting...</p></div>;
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] py-12">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <UserPlus className="mx-auto h-10 w-10 text-primary mb-2" />
          <CardTitle className="text-3xl">Create Account</CardTitle>
          <CardDescription>Fill in the details below to create your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="you@example.com" 
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
                minLength={6} // Firebase default minimum
              />
            </div>
             <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input 
                id="confirmPassword" 
                type="password" 
                placeholder="••••••••" 
                required 
                className="h-11 text-base"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)} 
                disabled={loading}
                minLength={6}
              />
            </div>
            <Button type="submit" size="lg" className="w-full transition-transform hover:scale-105" disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center text-sm space-y-2">
           <p className="text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Login
            </Link>
          </p>
          <Link href="/" className="text-primary hover:underline mt-2">
            &larr; Back to Home
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
