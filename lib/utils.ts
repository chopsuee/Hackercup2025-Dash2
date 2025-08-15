import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getQueueColor(status: 'light' | 'moderate' | 'heavy') {
  switch (status) {
    case 'light': return 'bg-green-500'
    case 'moderate': return 'bg-yellow-500'
    case 'heavy': return 'bg-red-500'
    default: return 'bg-gray-500'
  }
}

export function formatTime(minutes: number): string {
  if (minutes < 60) return `${minutes}m`
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return `${hours}h ${mins}m`
}