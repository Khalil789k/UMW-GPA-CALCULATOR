import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateGrade(marks: number): number {
    if (marks > 100) marks = 100;
    if (marks < 0) marks = 0;
    
    if (marks >= 85) return 4.00;
    if (marks >= 84) return 3.94;
    if (marks >= 83) return 3.87;
    if (marks >= 82) return 3.80;
    if (marks >= 81) return 3.74;
    if (marks >= 80) return 3.67;
    if (marks >= 79) return 3.60;
    if (marks >= 78) return 3.54;
    if (marks >= 77) return 3.47;
    if (marks >= 76) return 3.40;
    if (marks >= 75) return 3.34;
    if (marks >= 74) return 3.27;
    if (marks >= 73) return 3.20;
    if (marks >= 72) return 3.14;
    if (marks >= 71) return 3.07;
    if (marks >= 70) return 3.00;
    if (marks >= 69) return 2.95;
    if (marks >= 68) return 2.90;
    if (marks >= 67) return 2.85;
    if (marks >= 66) return 2.80;
    if (marks >= 65) return 2.75;
    if (marks >= 64) return 2.70;
    if (marks >= 63) return 2.65;
    if (marks >= 62) return 2.60;
    if (marks >= 61) return 2.55;
    if (marks >= 60) return 2.50;
    if (marks >= 59) return 2.40;
    if (marks >= 58) return 2.30;
    if (marks >= 57) return 2.20;
    if (marks >= 56) return 2.10;
    if (marks >= 55) return 2.00;
    if (marks >= 54) return 1.90;
    if (marks >= 53) return 1.80;
    if (marks >= 52) return 1.70;
    if (marks >= 51) return 1.60;
    if (marks >= 50) return 1.50;
    return 0.00;
}
