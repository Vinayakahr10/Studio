
"use client";

import Link from "next/link";
import { BrainCircuit, Menu, LogIn, Shield, LogOut as LogOutIcon, ChevronDown, Wrench } from 'lucide-react'; // Added Wrench
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useState, useEffect } from 'react';
import { ThemeToggleButton } from '@/components/theme-toggle-button';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

const mainNavLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/tutorials", label: "Tutorials" },
  { href: "/blog", label: "Blog" },
  {
    label: "Tools",
    icon: Wrench, // Added icon for the main "Tools" dropdown trigger
    href: "/tools", // Main link for the Tools item itself
    dropdown: [
      { href: "/tools", label: "All Tools" }, // Link to the main tools page
      { type: 'separator' as const }, // Separator
      { href: "/tools/ohms-law-calculator", label: "Ohm's Law Calculator" },
      { href: "/tools/resistance-calculator", label: "Resistor Color Code Calculator" },
      { href: "/tools/555-timer-calculator", label: "555 Timer Calculator" },
      { href: "/tools/capacitor-code-calculator", label: "Capacitor Code Calculator" },
    ],
  },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

// Link for non-logged-in users
const loginLink = { href: '/login', label: 'Login', icon: LogIn, variant: 'ghost' as const };

// Links for logged-in admin users
const adminUtilityLinks = [
  { href: '/admin', label: 'Admin Panel', icon: Shield, variant: 'outline' as const },
];


export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAdmin, logout, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await logout();
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <BrainCircuit className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold">EletronicswithVK</span>
        </Link>
        
        <nav className="hidden md:flex gap-1 items-center">
          {mainNavLinks.map((link) => (
            link.dropdown ? (
              <DropdownMenu key={link.label}>
                <DropdownMenuTrigger asChild>
                  <Button variant="link" asChild={!link.href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary px-3 py-2">
                     {link.href ? (
                        <Link href={link.href} className="flex items-center gap-1.5">
                            {link.icon && <link.icon className="h-4 w-4" />}
                            {link.label} <ChevronDown className="ml-1 h-4 w-4" />
                        </Link>
                     ) : (
                        <span className="flex items-center gap-1.5">
                            {link.icon && <link.icon className="h-4 w-4" />}
                            {link.label} <ChevronDown className="ml-1 h-4 w-4" />
                        </span>
                     )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {link.dropdown.map((item, index) => (
                    item.type === 'separator' ? (
                      <DropdownMenuSeparator key={`separator-${index}`} />
                    ) : (
                    <DropdownMenuItem key={item.href} asChild>
                      <Link href={item.href}>{item.label}</Link>
                    </DropdownMenuItem>
                    )
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="link" asChild key={link.label}>
                <Link
                  href={link.href!} 
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary px-3 py-2"
                >
                  <span className="flex items-center gap-1.5">
                    {link.icon && <link.icon className="h-4 w-4" />}
                    {link.label}
                  </span>
                </Link>
              </Button>
            )
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex gap-2 items-center">
             {!loading && user && isAdmin ? (
                <>
                  {adminUtilityLinks.map((link) => (
                    <Button variant={link.variant} asChild key={link.href} size="sm">
                      <Link href={link.href}>
                         <span className="flex items-center gap-2">
                            {link.icon && <link.icon className="h-4 w-4" />}
                            {link.label}
                         </span>
                      </Link>
                    </Button>
                  ))}
                  <Button variant="outline" onClick={handleLogout} size="sm">
                    <LogOutIcon className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </>
             ) : !loading && !user ? (
                  <Button variant={loginLink.variant} asChild size="sm" key={loginLink.href}>
                    <Link href={loginLink.href}>
                      <span className="flex items-center gap-2">
                        {loginLink.icon && <loginLink.icon className="h-4 w-4" />}
                        {loginLink.label}
                      </span>
                    </Link>
                  </Button>
             ) : null}
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
                <SheetTitle className="sr-only">Main Navigation Menu</SheetTitle>
                 <SheetHeader className="mb-4 border-b pb-4">
                    <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                        <BrainCircuit className="h-7 w-7 text-primary" />
                        <span className="text-xl font-bold">EletronicswithVK</span>
                    </Link>
                 </SheetHeader>
                <div className="flex flex-col gap-1">
                  {mainNavLinks.map((link) => (
                    link.dropdown ? (
                      <Accordion type="single" collapsible className="w-full" key={link.label}>
                        <AccordionItem value={link.label} className="border-b-0">
                          <AccordionTrigger className="text-base py-2.5 h-auto hover:no-underline hover:bg-muted/50 rounded-md px-3 font-medium text-muted-foreground justify-start group">
                             <span className="flex items-center">
                                {link.icon && <link.icon className="mr-2 h-5 w-5" />}
                                {link.href ? (
                                  <Link href={link.href} onClick={(e) => { e.stopPropagation(); setIsMobileMenuOpen(false); }} className="group-hover:underline">
                                    {link.label}
                                  </Link>
                                ) : (
                                  <span>{link.label}</span>
                                )}
                             </span>
                          </AccordionTrigger>
                          <AccordionContent className="pt-1 pb-0 pl-7">
                            <div className="flex flex-col gap-0.5">
                              {link.dropdown.map((item, index) => (
                                item.type === 'separator' ? (
                                  <hr key={`separator-mobile-${index}`} className="my-1"/>
                                ) : (
                                <Button variant="ghost" asChild key={item.href} className="justify-start text-base py-2.5 h-auto font-normal text-muted-foreground">
                                  <Link
                                    href={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                  >
                                    {item.label}
                                  </Link>
                                </Button>
                                )
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    ) : (
                       <Button variant="ghost" asChild key={link.label} className="justify-start text-base py-2.5 h-auto">
                          <Link
                              href={link.href!}
                              onClick={() => setIsMobileMenuOpen(false)}
                          >
                           <span className="flex items-center">
                             {link.icon && <link.icon className="mr-2 h-5 w-5" />}
                             {link.label}
                           </span>
                          </Link>
                       </Button>
                    )
                  ))}

                  <hr className="my-3" />

                  {!loading && user && isAdmin ? (
                    <>
                      {adminUtilityLinks.map((link) => (
                         <Button variant="ghost" asChild key={link.href} className="justify-start text-base py-2.5 h-auto">
                            <Link
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                             <span className="flex items-center gap-2">
                               {link.icon && <link.icon className="h-5 w-5" />}
                               {link.label}
                             </span>
                            </Link>
                         </Button>
                      ))}
                      <Button variant="ghost" onClick={handleLogout} className="justify-start text-base py-2.5 h-auto">
                        <LogOutIcon className="mr-2 h-5 w-5" />
                        Logout
                      </Button>
                    </>
                  ) : !loading && !user ? (
                       <Button variant="ghost" asChild className="justify-start text-base py-2.5 h-auto" key={loginLink.href}>
                          <Link
                              href={loginLink.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                          >
                           <span className="flex items-center gap-2">
                             {loginLink.icon && <loginLink.icon className="h-5 w-5" />}
                             {loginLink.label}
                           </span>
                          </Link>
                       </Button>
                  ) : null}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

