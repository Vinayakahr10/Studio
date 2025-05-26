
'use client';

import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { User } from 'firebase/auth';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from '@/lib/firebase/firebase';
import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isAdmin: boolean; // For demo purposes, check email
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// IMPORTANT: Hardcoded admin email for demonstration.
// In a real app, use custom claims or a database role system for admin checks.
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
        // This might happen if the auth object is partially initialized due to config errors
        setLoading(false); // Ensure loading is set to false to unblock UI
      }
    } else {
      // If auth is null, Firebase isn't initialized (e.g. missing config).
      console.warn("Firebase auth object is null. Skipping onAuthStateChanged listener. Ensure Firebase is configured correctly in .env.local and the server is restarted.");
      setLoading(false);
    }
  }, []); // Empty dependency array means it runs once on mount

  const login = async (email: string, pass: string): Promise<boolean> => {
    if (!auth) {
      toast({ title: "Login Error", description: "Firebase authentication is not available. Please check configuration.", variant: "destructive" });
      return false;
    }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, pass);
      // onAuthStateChanged will update user and isAdmin state
      toast({ title: "Login Successful", description: "Redirecting..." });
      // Redirection is handled by useEffect in AdminLayout or LoginPage based on user state
      // setLoading(false) is handled by onAuthStateChanged
      return true;
    } catch (error: any) {
      console.error("Firebase login error:", error);
      toast({ title: "Login Failed", description: error.message || "Invalid email or password.", variant: "destructive" });
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
      // onAuthStateChanged will update user state to null and isAdmin to false
      toast({ title: "Logout Successful" });
      router.push('/login'); // Redirect to login page after logout
    } catch (error: any) {
      console.error("Firebase logout error:", error);
      toast({ title: "Logout Failed", description: error.message, variant: "destructive" });
    } finally {
      // setLoading(false) is handled by onAuthStateChanged or if an error occurs above.
      // However, if signOut itself doesn't trigger onAuthStateChanged immediately or fails before, ensure loading stops.
      // A more robust way would be to rely on onAuthStateChanged setting loading to false.
      // For now, let's ensure it's set if not already done by onAuthStateChanged.
      if (loading) {
         setLoading(false);
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAdmin }}>
      {!loading ? children : <div className="flex h-screen items-center justify-center"><p>Loading application...</p></div>}
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
