"use client"

import * as React from "react"
import { Wand2, Check, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { useAccentColor } from "@/hooks/use-accent-color"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Label } from "./ui/label"

const accentColors = [
    { name: "blue", color: "220 90% 50%" },
    { name: "green", color: "142.1 76.2% 36.3%" },
    { name: "orange", color: "24.6 95% 53.1%" },
    { name: "purple", color: "262.1 83.3% 57.8%" },
    { name: "red", color: "0 84.2% 60.2%" },
];


export function ThemeCustomizer() {
  const [accent, setAccent] = useAccentColor()
  const { setTheme, theme } = useTheme()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Customize theme">
          <Wand2 className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4 space-y-4">
        <div className="space-y-2">
            <Label>Accent Color</Label>
            <div className="grid grid-cols-5 gap-2">
            {accentColors.map((item) => (
                <Button
                key={item.name}
                variant="outline"
                size="icon"
                className={cn(
                    "h-8 w-8 rounded-full border-2",
                    accent === item.color && "border-foreground"
                )}
                onClick={() => setAccent(item.color)}
                style={{ backgroundColor: `hsl(${item.color})` }}
                aria-label={`Set accent color to ${item.name}`}
                >
                {accent === item.color && (
                    <Check className="h-5 w-5 text-white" />
                )}
                </Button>
            ))}
            </div>
        </div>
         <div className="space-y-2">
            <Label>Theme</Label>
            <div className="grid grid-cols-2 gap-2">
                <Button variant={theme === 'light' ? 'default' : 'outline'} onClick={() => setTheme('light')} size="sm">
                    <Sun className="mr-2 h-4 w-4" /> Light
                </Button>
                <Button variant={theme === 'dark' ? 'default' : 'outline'} onClick={() => setTheme('dark')} size="sm">
                    <Moon className="mr-2 h-4 w-4" /> Dark
                </Button>
            </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
