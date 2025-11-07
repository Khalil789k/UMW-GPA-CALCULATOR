"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface GpaChartProps {
  gpa: number;
  title?: string;
  label?: string;
}

export default function GpaChart({ gpa, title = "GPA Visualization", label = "Current GPA" }: GpaChartProps) {
  const [animatedGpa, setAnimatedGpa] = useState(0);
  const [strokeDashoffset, setStrokeDashoffset] = useState(283);

  const maxGpa = 4.0;
  const radius = 45;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      setAnimatedGpa(currentGpa => {
        const difference = gpa - currentGpa;
        if (Math.abs(difference) < 0.01) {
          cancelAnimationFrame(animationFrameId);
          return gpa;
        }
        const nextGpa = currentGpa + difference * 0.1;
        
        const progress = Math.max(0, Math.min(nextGpa / maxGpa, 1));
        setStrokeDashoffset(circumference - progress * circumference);

        return nextGpa;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [gpa, circumference]);

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Your academic performance at a glance.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex items-center justify-center pb-6">
        <div className="relative h-48 w-48">
          <svg className="h-full w-full" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              strokeWidth="10"
              className="stroke-muted"
              fill="transparent"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              strokeWidth="10"
              className="stroke-primary transition-all duration-300 ease-out"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-semibold text-lg text-muted-foreground">{label}</span>
            <span className="font-bold text-5xl text-foreground -mt-1">
              {gpa.toFixed(2)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
