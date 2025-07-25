
"use client";

import Link from "next/link";
import { Menu } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '@/components/ui/sheet';
import { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { ClientOnly } from '@/components/shared/ClientOnly';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ThemeToggleButton } from "../theme-toggle-button";

const navItems = [
  { href: "/", label: "Home" },
  {
    label: "Projects",
    href: "/projects",
    submenu: [
      { href: "/projects/arduino", label: "Arduino Projects" },
      { href: "/projects/esp32", label: "ESP32 Projects" },
      { href: "/projects/stm32", label: "STM32 Projects" },
      { href: "/projects/raspberry-pi", label: "Raspberry Pi Projects" },
      { href: "/projects/analog", label: "Analog Projects" },
      { href: "/projects/digital", label: "Digital Projects" },
      { href: "/projects", label: "View All Projects" },
    ],
  },
  {
    label: "Tutorials",
    href: "/tutorials",
  },
  { href: "/blog", label: "Blog" },
  { href: "/tools", label: "Tools" },
  { href: "/notes", label: "Notes" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];


export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const hasSeenAnimation = sessionStorage.getItem('hasSeenIntroAnimation');
    if (hasSeenAnimation) {
      setShowContent(true);
    } else {
      // If animation hasn't been seen, wait for it to finish
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 2500); // Matches animation duration + delay
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <span className="text-xl font-bold">EletronicswithVK</span>
        </Link>
        
        <nav className={cn(
            "hidden md:flex gap-1 items-center transition-opacity duration-1000",
            showContent ? 'opacity-100' : 'opacity-0'
          )}>
          {navItems.map((item) => (
            item.submenu ? (
              <DropdownMenu 
                key={item.label} 
                open={openDropdown === item.label} 
                onOpenChange={(isOpen) => setOpenDropdown(isOpen ? item.label : null)}
              >
                <DropdownMenuTrigger asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      "text-sm font-medium text-foreground transition-colors hover:text-primary px-3 py-2 flex items-center gap-1 hover:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                    )}
                    onMouseEnter={() => setOpenDropdown(item.label)}
                  >
                    {item.label}
                  </Link>
                </DropdownMenuTrigger>
                <DropdownMenuContent onMouseLeave={() => setOpenDropdown(null)}>
                  {item.submenu.map((subItem) => (
                    <DropdownMenuItem key={subItem.label} asChild>
                      <Link href={subItem.href}>{subItem.label}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                key={item.href}
                href={item.href} 
                className={cn(
                  buttonVariants({ variant: "link" }),
                  "text-sm font-medium text-foreground transition-colors hover:text-primary px-3 py-2"
                )}
              >
                <span className="flex items-center gap-1.5">
                 {item.label}
                </span>
              </Link>
            )
          ))}
        </nav>

        <div className={cn(
            "flex items-center gap-2 transition-opacity duration-1000",
            showContent ? 'opacity-100' : 'opacity-0'
          )}>
           <div className="hidden md:flex gap-2 items-center">
            <ClientOnly>
              <ThemeToggleButton />
            </ClientOnly>
          </div>
         
          <div className="md:hidden flex items-center">
             <ClientOnly>
                <ThemeToggleButton />
              </ClientOnly>
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-xs pr-0">
                  <SheetHeader className="mb-4 border-b pb-4 pr-6">
                    <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                        <span className="text-xl font-bold">EletronicswithVK</span>
                    </Link>
                  </SheetHeader>
                <div className="flex flex-col gap-1 pr-6">
                   <Accordion type="multiple" className="w-full">
                    {navItems.map((item) => (
                      item.submenu ? (
                        <AccordionItem value={item.label} key={item.label} className="border-b-0">
                          <AccordionTrigger className={cn(buttonVariants({ variant: "ghost" }), "justify-between text-base py-2.5 h-auto hover:no-underline")}>
                            {item.label}
                          </AccordionTrigger>
                          <AccordionContent className="pl-4">
                            <div className="flex flex-col gap-1 mt-1">
                              {item.submenu.map((subItem) => (
                                <Link
                                  key={subItem.label}
                                  href={subItem.href}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className={cn(
                                    buttonVariants({ variant: "ghost" }),
                                    "justify-start text-base py-2.5 h-auto"
                                  )}
                                >
                                  {subItem.label}
                                </Link>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ) : (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={cn(
                            buttonVariants({ variant: "ghost" }),
                            "justify-start text-base py-2.5 h-auto"
                          )}
                        >
                         {item.label}
                        </Link>
                      )
                    ))}
                  </Accordion>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
