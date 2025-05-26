
'use client';

import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { User } from 'firebase/auth';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut as firebaseSignOut, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase/firebase';
import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<boolean>;
  logout: () => Promise<void>;
  signup: (email: string, pass: string) => Promise<boolean>; // Added signup
  isAdmin: boolean; 
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_EMAIL = "admin@electrolearn.com";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (auth) {
      try {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
          setIsAdmin(currentUser?.email === ADMIN_EMAIL);
          setLoading(false);
        });
        return () => unsubscribe();
      } catch (error) {
        console.error("Error setting up Firebase onAuthStateChanged listener:", error);
        setLoading(false); 
        toast({ title: "Auth Error", description: "Could not connect to authentication service.", variant: "destructive" });
      }
    } else {
      console.warn("Firebase auth object is null. Skipping onAuthStateChanged listener. Ensure Firebase is configured correctly.");
      setLoading(false);
    }
  }, []); 

  const login = async (email: string, pass: string): Promise<boolean> => {
    if (!auth) {
      toast({ title: "Login Error", description: "Firebase authentication is not available. Please check configuration.", variant: "destructive" });
      return false;
    }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, pass);
      toast({ title: "Login Successful", description: "Redirecting..." });
      // Redirection handled by AdminLayout or LoginPage based on user state
      return true;
    } catch (error: any) {
      console.error("Firebase login error:", error);
      toast({ title: "Login Failed", description: error.message || "Invalid email or password.", variant: "destructive" });
      setLoading(false);
      return false;
    }
  };

  const signup = async (email: string, pass: string): Promise<boolean> => {
    if (!auth) {
      toast({ title: "Sign Up Error", description: "Firebase authentication is not available. Please check configuration.", variant: "destructive" });
      return false;
    }
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, pass);
      // Firebase automatically signs in the user. onAuthStateChanged will update state.
      toast({ title: "Account Created Successfully!", description: "You are now logged in." });
      // setLoading(false) will be handled by onAuthStateChanged
      return true;
    } catch (error: any) {
      console.error("Firebase signup error:", error);
      let errorMessage = "An unexpected error occurred during sign up.";
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = "This email address is already in use.";
      } else if (error.code === 'auth/weak-password') {
        errorMessage = "Password is too weak. It should be at least 6 characters.";
      } else if (error.message) {
        errorMessage = error.message;
      }
      toast({ title: "Sign Up Failed", description: errorMessage, variant: "destructive" });
      setLoading(false);
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    if (!auth) {
      toast({ title: "Logout Error", description: "Firebase authentication is not available.", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      await firebaseSignOut(auth);
      toast({ title: "Logout Successful" });
      router.push('/login'); 
    } catch (error: any) {
      console.error("Firebase logout error:", error);
      toast({ title: "Logout Failed", description: error.message, variant: "destructive" });
    } finally {
      if (loading && !user) { // Ensure loading stops if onAuthStateChanged doesn't fire or logout happens when already logged out
         setLoading(false);
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, signup, isAdmin }}>
      {!loading || user ? children : <div className="flex h-screen items-center justify-center"><p>Loading application...</p></div>}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
