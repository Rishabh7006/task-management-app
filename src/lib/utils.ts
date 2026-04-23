import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// @RK - Utility function to combine conditional class names and resolve Tailwind class conflicts
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}