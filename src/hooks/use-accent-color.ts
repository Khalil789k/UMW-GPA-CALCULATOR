"use client"

import { useState, useEffect } from "react"

const DEFAULT_ACCENT = "220 90% 50%"; // blue
const ACCENT_COLOR_KEY = "accent-color"

export function useAccentColor(): [string, (accent: string) => void] {
  const [accent, setAccentState] = useState(DEFAULT_ACCENT)

  useEffect(() => {
    const storedAccent = localStorage.getItem(ACCENT_COLOR_KEY)
    if (storedAccent) {
      setAccentState(storedAccent)
    }
  }, [])

  useEffect(() => {
    document.documentElement.style.setProperty("--primary", accent)
    document.documentElement.style.setProperty("--ring", accent)
    document.documentElement.style.setProperty("--chart-1", accent)
  }, [accent])

  const setAccent = (newAccent: string) => {
    setAccentState(newAccent)
    localStorage.setItem(ACCENT_COLOR_KEY, newAccent)
  }

  return [accent, setAccent]
}
