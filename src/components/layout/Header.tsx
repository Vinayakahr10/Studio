
"use client";

import Link from 'next/link';
import { BrainCircuit, Menu, LogIn, Shield, LogOut as LogOutIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState, useEffect } from 'react';
import { ThemeToggleButton } from '@/components/theme-toggle-button';
import { usePathname, useRouter } from 'next/navigation';

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

// Link for non-logged-in users
const loginLink = { href: '/login', label: 'Login', icon: LogIn, variant: 'ghost' as const };

// Links for logged-in admin users
const adminUtilityLinks = [
  { href: '/admin', label: 'Admin Panel', icon: Shield, variant: 'outline' as const },
];


export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const checkLoginStatus = () => {
        setIsAdminLoggedIn(localStorage.getItem('isElectroAdminLoggedIn') === 'true');
      };
      checkLoginStatus();
      // Optional: Listen for storage changes if you want to sync across tabs/windows
      // window.addEventListener('storage', checkLoginStatus);
      // return () => window.removeEventListener('storage', checkLoginStatus);
    }
  }, [isClient, pathname]); // Re-check on pathname change

  const handleLogout = () => {
    if (isClient) {
      localStorage.removeItem('isElectroAdminLoggedIn');
      setIsAdminLoggedIn(false);
      // If on an admin page, redirect to login. Otherwise, can redirect to home or stay.
      if (pathname.startsWith('/admin')) {
        router.push('/login');
      } else {
        router.push('/'); 
      }
      if (isMobileMenuOpen) setIsMobileMenuOpen(false);
    }
  };

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
             {isClient && isAdminLoggedIn ? (
                <>
                  {adminUtilityLinks.map((link) => (
                    <Button variant={link.variant} asChild key={link.href} size="sm">
                      <Link href={link.href}>
                        {link.icon && <link.icon className="mr-2 h-4 w-4" />}
                        {link.label}
                      </Link>
                    </Button>
                  ))}
                  <Button variant="outline" onClick={handleLogout} size="sm">
                    <LogOutIcon className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </>
             ) : (
                isClient && (
                  <Button variant={loginLink.variant} asChild size="sm">
                    <Link href={loginLink.href}>
                      {loginLink.icon && <loginLink.icon className="mr-2 h-4 w-4" />}
                      {loginLink.label}
                    </Link>
                  </Button>
                )
             )}
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
                  
                  {mainNavLinks.map((link) => (
                     <Button variant="ghost" asChild key={link.href} className="justify-start text-lg">
                        <Link
                            href={link.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                         {link.label} {/* Icons removed for brevity in mobile main nav, can be added back if desired */}
                        </Link>
                     </Button>
                  ))}

                  <hr className="my-2" />

                  {isClient && isAdminLoggedIn ? (
                    <>
                      {adminUtilityLinks.map((link) => (
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
                      <Button variant="ghost" onClick={handleLogout} className="justify-start text-lg">
                        <LogOutIcon className="mr-2 h-5 w-5" />
                        Logout
                      </Button>
                    </>
                  ) : (
                     isClient && (
                       <Button variant="ghost" asChild className="justify-start text-lg">
                          <Link
                              href={loginLink.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                          >
                           {loginLink.icon && <loginLink.icon className="mr-2 h-5 w-5" />}
                           {loginLink.label}
                          </Link>
                       </Button>
                     )
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
