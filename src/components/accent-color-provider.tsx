"use client";

import { useAccentColor } from '@/hooks/use-accent-color';
import React from 'react';

export function AccentColorProvider({ children }: { children: React.ReactNode }) {
  const [accent] = useAccentColor();

  // The hook already applies the style to the document element.
  // This provider's main job is to ensure the hook is called.
  // We can return the children directly.
  return <>{children}</>;
}
