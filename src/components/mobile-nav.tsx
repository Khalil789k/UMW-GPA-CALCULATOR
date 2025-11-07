"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu, Calculator } from "lucide-react"
import { cn } from "@/lib/utils"
import { useSidebar } from "./ui/sidebar"

interface MobileNavProps {
  items: {
    href: string
    label: string
  }[]
}

export function MobileNav({ items }: MobileNavProps) {
    const { toggleSidebar } = useSidebar();
  
    return (
      <Button
        variant="ghost"
        className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        onClick={toggleSidebar}
      >
        <Menu className="h-6 w-6" />
        <span className="sr-only">Toggle Menu</span>
      </Button>
    )
}
