
"use client";

import Link from 'next/link';
import { BrainCircuit, Menu, LogIn, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';
import { ThemeToggleButton } from '@/components/theme-toggle-button';

const mainNavLinks = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/tutorials', label: 'Tutorials' },
  { href: '/blog', label: 'Blog' },
  { href: '/community', label: 'Community' },
  { href: '/faq', label: 'FAQ' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const utilityNavLinks = [
  { href: '/login', label: 'Login', icon: LogIn, variant: 'ghost' as const },
  { href: '/admin', label: 'Admin Panel', icon: Shield, variant: 'outline' as const },
];


export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <BrainCircuit className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold">ElectroLearn</span>
        </Link>
        
        <nav className="hidden md:flex gap-1 items-center">
          {mainNavLinks.map((link) => (
            <Button variant="link" asChild key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary px-3 py-2"
              >
                {link.label}
              </Link>
            </Button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex gap-2 items-center">
             {utilityNavLinks.map((link) => (
              <Button variant={link.variant} asChild key={link.href} size="sm">
                <Link href={link.href}>
                  {link.icon && <link.icon className="mr-2 h-4 w-4" />}
                  {link.label}
                </Link>
              </Button>
            ))}
            <ThemeToggleButton />
          </div>
         
          <div className="md:hidden flex items-center">
            <ThemeToggleButton />
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-xs">
                <div className="flex flex-col gap-2 p-4">
                  <Link href="/" className="flex items-center gap-2 mb-4" onClick={() => setIsMobileMenuOpen(false)}>
                    <BrainCircuit className="h-7 w-7 text-primary" />
                    <span className="text-xl font-bold">ElectroLearn</span>
                  </Link>
                  {[...mainNavLinks, ...utilityNavLinks].map((link) => (
                     <Button variant="ghost" asChild key={link.href} className="justify-start text-lg">
                        <Link
                            href={link.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                         {link.icon && <link.icon className="mr-2 h-5 w-5" />}
                         {link.label}
                        </Link>
                     </Button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
