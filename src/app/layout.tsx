
'use client';

import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { AccentColorProvider } from '@/components/accent-color-provider';
import { ThemeProvider } from '@/components/theme-provider';
import Link from 'next/link';
import { Calculator } from 'lucide-react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
  useSidebar,
} from '@/components/ui/sidebar';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ThemeCustomizer } from '@/components/theme-customizer';


const navItems = [
  { href: '/', label: 'Home' },
  { href: '/cgpa-calculator', label: 'CGPA Calculator' },
  { href: '/about', label: 'About' },
  { href: '/instructions', label: 'Instructions' },
  { href: '/faq', label: 'Help & FAQs' },
  { href: '/share', label: 'Share' },
  { href: '/copyright', label: 'Copyright' },
];

function NavMenu() {
  const { setOpenMobile } = useSidebar();
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton 
            href={item.href} 
            asChild
            isActive={pathname === item.href}
            onClick={() => setOpenMobile(false)}
          >
            <Link href={item.href}>{item.label}</Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}

function AppLogo() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <div
        className={cn(
          'flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground',
        )}
      >
        <Calculator className={cn('h-5 w-5')} />
      </div>
      <div
        className={cn(
          'flex flex-col',
        )}
      >
        <span className="font-bold text-base tracking-tight">
          UMW GPA CALCULATOR
        </span>
      </div>
    </Link>
  );
}

function ZenHeader() {
  return (
    <div className="flex flex-col items-center gap-4 text-center p-4 h-[92px] justify-center group-data-[collapsible=icon]:p-2">
      <div className="group-data-[collapsible=icon]:hidden">
        <p className="text-sm text-muted-foreground font-medium px-2">
          "An investment in knowledge pays the best interest."
        </p>
      </div>
    </div>
  )
}


function MainHeader() {
  const { state } = useSidebar();
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
       <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60" />
    );
  }

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Mobile Header */}
      <div className="flex items-center gap-2 md:hidden">
        <SidebarTrigger />
        <AppLogo />
      </div>

      {/* Desktop Header */}
      <div className="hidden md:flex items-center gap-4">
        <SidebarTrigger />
         <div className={cn("group-data-[state=expanded]:hidden")}>
           <AppLogo />
        </div>
      </div>
      
      <div className="flex-1" />
    </header>
  );
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>UMW GPA CALCULATOR</title>
        <meta name="description" content="A GPA calculator for University of Mianwali students" />
        <link rel="icon" href="/calculator-icon.svg" type="image/svg+xml" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0066FF" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <AccentColorProvider>
            <SidebarProvider>
              <Sidebar>
                <SidebarHeader className="p-0 border-b">
                  <ZenHeader />
                </SidebarHeader>
                <SidebarContent>
                  <NavMenu />
                </SidebarContent>
                <SidebarFooter>
                  <ThemeCustomizer />
                </SidebarFooter>
              </Sidebar>

              <SidebarInset>
                 <MainHeader />
                <main className="flex-1 p-4 md:p-6 lg:p-8">
                  {children}
                </main>
              </SidebarInset>
            </SidebarProvider>
            <Toaster />
          </AccentColorProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
