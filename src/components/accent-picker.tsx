"use client"

import * as React from "react"
import { Paintbrush, Check } from "lucide-react"

import { useAccentColor } from "@/hooks/use-accent-color"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const accentColors = [
    { name: "blue", color: "220 90% 50%" },
    { name: "green", color: "142.1 76.2% 36.3%" },
    { name: "orange", color: "24.6 95% 53.1%" },
    { name: "purple", color: "262.1 83.3% 57.8%" },
    { name: "red", color: "0 84.2% 60.2%" },
];


export function AccentPicker() {
  const [accent, setAccent] = useAccentColor()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Select accent color">
          <Paintbrush className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-2">
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
      </PopoverContent>
    </Popover>
  )
}
