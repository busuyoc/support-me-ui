import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) { // cn() concatenates a bunch of css class names ???
  return twMerge(clsx(inputs)) // tailwind merge makes sure we don't have conflicting classes
}
