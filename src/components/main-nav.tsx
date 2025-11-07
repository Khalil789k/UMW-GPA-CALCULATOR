"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { SidebarMenuButton } from "./ui/sidebar"

import { cn } from "@/lib/utils"

interface MainNavProps {
  items: {
    href: string
    label: string
  }[]
}

export function MainNav({ items }: MainNavProps) {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col gap-1 p-2">
      {items.map((item) => (
        <SidebarMenuButton
          key={item.href}
          asChild
          isActive={pathname === item.href}
        >
          <Link href={item.href}>
            {item.label}
          </Link>
        </SidebarMenuButton>
      ))}
    </nav>
  )
}
