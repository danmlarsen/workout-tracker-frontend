import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(
  value: number,
  options?: {
    compact?: boolean;
    maximumFractionDigits?: number;
  },
): string {
  const { compact = false, maximumFractionDigits = 1 } = options || {};

  if (compact) {
    // Use compact notation for large numbers (1M, 1.2K, etc.)
    return new Intl.NumberFormat("en-US", {
      notation: "compact",
      maximumFractionDigits,
    }).format(value);
  }

  // Use standard formatting with commas
  return new Intl.NumberFormat("en-US").format(value);
}

export function formatCompactNumber(value: number): string {
  return formatNumber(value, { compact: true });
}

export function formatWeight(value: number): string {
  return formatNumber(value, { compact: true, maximumFractionDigits: 0 });
}
