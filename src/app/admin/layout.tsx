
"use client";

import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Newspaper, LogOut, ArrowLeftToLine } from 'lucide-react';
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth'; // Import useAuth

const adminNavItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/blogs', label: 'Blogs', icon: Newspaper },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { user, isAdmin, loading, logout } = useAuth(); // Use the auth hook
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!loading) { // Only check after auth state is loaded
      if (!user || !isAdmin) {
        router.replace('/login');
      }
    }
  }, [user, isAdmin, loading, router, pathname]);

  const handleLogout = async () => {
    await logout();
    // Redirection to /login is handled within the logout function in useAuth
  };
  
  if (loading || !user || !isAdmin) {
    // Show loading or redirecting message while auth state is resolving or if not authorized
    return <div className="flex h-screen items-center justify-center"><p>Loading admin panel or redirecting...</p></div>;
  }

  return (
    <SidebarProvider defaultOpen>
      <Sidebar collapsible="icon" className="border-r">
        <SidebarHeader className="p-4">
          <div className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="h-7 w-7 text-primary transition-all group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:w-8">
                <rect width="256" height="256" fill="none"></rect><path d="M128,24A104,104,0,1,0,232,128,104.12041,104.12041,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.09957,88.09957,0,0,1,128,216Z" opacity="0.2"></path><path d="M128,24A104,104,0,1,0,232,128,104.12041,104.12041,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.09957,88.09957,0,0,1,128,216Zm28.62793-58.05664-32-32a8.00011,8.00011,0,0,0-11.31348,0l-32,32A8.00005,8.00005,0,0,0,86.62793,169.94336L112,144.57129V200a8,8,0,0,0,16,0V144.57129l25.37207,25.37207a7.99949,7.99949,0,0,0,11.31348-11.31347ZM156.68652,97.31348a7.99949,7.99949,0,0,0-11.31347-11.31348L120,111.37207,94.62793,86.00049a8.00005,8.00005,0,0,0-11.31348,11.313L108.68652,122.68652a8.00011,8.00011,0,0,0,11.31348,0Z" fill="currentColor"></path>
              </svg>
            <span className="font-semibold text-lg group-data-[collapsible=icon]:hidden transition-opacity duration-200 ease-in-out">Admin Panel</span>
          </div>
        </SidebarHeader>
        <Separator className="mb-2" />
        <SidebarContent>
          <SidebarMenu>
            {adminNavItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Tooltip>
                  <TooltipTrigger asChild>
                     <Link href={item.href} legacyBehavior passHref>
                        <SidebarMenuButton
                          isActive={pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))}
                          className="group-data-[collapsible=icon]:justify-center"
                        >
                          <item.icon className="h-5 w-5" />
                          <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                        </SidebarMenuButton>
                      </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right" align="center" className="group-data-[collapsible=icon]:block hidden">
                    {item.label}
                  </TooltipContent>
                </Tooltip>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <Separator className="mt-2" />
        <SidebarFooter className="p-4 space-y-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/" legacyBehavior passHref>
                <Button variant="outline" className="w-full group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:aspect-square">
                   <ArrowLeftToLine className="h-5 w-5" />
                  <span className="group-data-[collapsible=icon]:hidden ml-2">Back to Site</span>
                </Button>
              </Link>
            </TooltipTrigger>
             <TooltipContent side="right" align="center" className="group-data-[collapsible=icon]:block hidden">
              Back to Site
            </TooltipContent>
          </Tooltip>
          <div className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
            <Avatar className="h-9 w-9">
              <AvatarImage src={user.photoURL || "https://placehold.co/40x40.png"} alt={user.displayName || user.email || "Admin User"} data-ai-hint="user avatar" />
              <AvatarFallback>{user.email ? user.email.substring(0,2).toUpperCase() : 'AD'}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col group-data-[collapsible=icon]:hidden">
              <span className="text-sm font-medium truncate max-w-[120px]">{user.displayName || user.email}</span>
              <button onClick={handleLogout} className="text-xs text-muted-foreground hover:text-primary text-left">
                Logout <LogOut className="inline h-3 w-3" />
              </button>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="flex flex-col">
          <header className="p-4 border-b md:hidden flex items-center gap-2 sticky top-0 bg-background z-10">
            <SidebarTrigger />
            <h2 className="text-lg font-semibold">Admin Panel</h2>
          </header>
          <div className="flex-grow p-4 md:p-6 overflow-auto">
            {children}
          </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
