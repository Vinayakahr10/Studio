"use client";

import Link from "next/link";
import { BrainCircuit, Menu, ChevronDown, FileText, Users, Settings, LogOut, LogIn, LayoutDashboard, Wrench, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useState, useEffect } from 'react';
import { ThemeToggleButton } from '@/components/theme-toggle-button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
// Removed: import { useAuth } from '@/hooks/useAuth';

const mainNavLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/tutorials", label: "Tutorials" },
  { href: "/blog", label: "Blog" },
  { href: "/tools", label: "Tools" },
  { href: "/notes", label: "Notes" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <BrainCircuit className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold">EletronicswithVK</span>
        </Link>
        
        <nav className="hidden md:flex gap-1 items-center">
          {mainNavLinks.map((link) => (
            <Button variant="link" asChild key={link.label}>
              <Link
                href={link.href} 
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary px-3 py-2"
              >
                <span className="flex items-center gap-1.5">
                 {link.label}
                </span>
              </Link>
            </Button>
          ))}
          {/* Removed conditional login/admin/logout links */}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex gap-2 items-center">
            <ThemeToggleButton />
          </div>
         
          <div className="md:hidden flex items-center">
            <ThemeToggleButton />
            {isClient && (
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full max-w-xs">
                  <SheetTitle className="sr-only">Main Navigation Menu</SheetTitle>
                   <SheetHeader className="mb-4 border-b pb-4">
                      <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                          <BrainCircuit className="h-7 w-7 text-primary" />
                          <span className="text-xl font-bold">EletronicswithVK</span>
                      </Link>
                   </SheetHeader>
                  <div className="flex flex-col gap-1">
                    {mainNavLinks.map((link) => (
                         <Button variant="ghost" asChild key={link.label} className="justify-start text-base py-2.5 h-auto">
                            <Link
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                             <span className="flex items-center">
                               {link.label}
                             </span>
                            </Link>
                         </Button>
                    ))}
                    <Button variant="ghost" asChild key="arduino-tutorial-mobile" className="justify-start text-base py-2.5 h-auto">
                      <Link
                        href="/tutorials/arduino"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span className="flex items-center">
                          Arduino Tutorial
                        </span>
                      </Link>
                    </Button>
                    {/* Removed conditional login/admin/logout links from mobile menu */}
                  </div>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
