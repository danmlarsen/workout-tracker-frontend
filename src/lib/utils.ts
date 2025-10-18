import { TWorkout, TWorkoutSet } from "@/api/workouts/types";
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

export function calculateOneRepMax(weight: number, reps: number): number {
  if (reps === 1) return weight;
  // Epley formula
  return weight * (1 + reps / 30);
}

export function getBestSetByOneRM(sets: TWorkoutSet[]): TWorkoutSet | null {
  if (sets.length === 0) return null;

  return sets.reduce((best, current) => {
    const currentOneRM = calculateOneRepMax(current.weight!, current.reps!);
    const bestOneRM = calculateOneRepMax(best.weight!, best.reps!);

    return currentOneRM > bestOneRM ? current : best;
  });
}

export function formatBestSet(bestSet: TWorkoutSet | null): string {
  return bestSet ? `${bestSet.weight} kg x ${bestSet.reps}` : "-";
}

export function findBestWorkoutSetWithIndex(workoutSets: TWorkoutSet[]): {
  bestSet: TWorkoutSet | null;
  bestSetIndex: number;
} {
  let bestSet: TWorkoutSet | null = null;
  let bestSetIndex = -1;

  workoutSets.forEach((set, index) => {
    if (set.weight && set.reps && set.weight > 0 && set.reps > 0) {
      if (!bestSet) {
        bestSet = set;
        bestSetIndex = index;
      } else {
        const currentVolume = (set.weight || 0) * (set.reps || 0);
        const currentOneRM = calculateOneRepMax(set.weight || 0, set.reps || 0);

        const bestVolume = (bestSet.weight || 0) * (bestSet.reps || 0);
        const bestOneRM = calculateOneRepMax(
          bestSet.weight || 0,
          bestSet.reps || 0,
        );

        // Prioritize 1RM, then volume as tiebreaker
        if (
          currentOneRM > bestOneRM ||
          (currentOneRM === bestOneRM && currentVolume > bestVolume)
        ) {
          bestSet = set;
          bestSetIndex = index;
        }
      }
    }
  });

  return { bestSet, bestSetIndex };
}

export function isSetBetter(
  currentSet: TWorkoutSet,
  referenceSet: TWorkoutSet,
): boolean {
  const currentOneRM = calculateOneRepMax(
    currentSet.weight || 0,
    currentSet.reps || 0,
  );
  const referenceOneRM = calculateOneRepMax(
    referenceSet.weight || 0,
    referenceSet.reps || 0,
  );

  const currentVolume = (currentSet.weight || 0) * (currentSet.reps || 0);
  const referenceVolume = (referenceSet.weight || 0) * (referenceSet.reps || 0);

  return (
    currentOneRM > referenceOneRM ||
    (currentOneRM === referenceOneRM && currentVolume > referenceVolume)
  );
}

export function getPlaceholderWorkoutSet(
  setIndex: number,
  bestCurrentSet: TWorkoutSet | null,
  bestSetIndex: number,
  previousWorkoutSets: TWorkoutSet[] | undefined,
): TWorkoutSet | undefined {
  // Only use current workout's best set for subsequent sets
  if (
    bestCurrentSet &&
    bestSetIndex >= 0 &&
    setIndex > bestSetIndex &&
    previousWorkoutSets
  ) {
    const previousSet = previousWorkoutSets[setIndex];
    const lastPreviousSet = previousWorkoutSets[previousWorkoutSets.length - 1];
    const referenceSet = previousSet || lastPreviousSet;

    if (referenceSet && isSetBetter(bestCurrentSet, referenceSet)) {
      return bestCurrentSet;
    }
  }

  // Fall back to previous workout logic for all other cases
  if (previousWorkoutSets) {
    return (
      previousWorkoutSets[setIndex] ||
      previousWorkoutSets[previousWorkoutSets.length - 1]
    );
  }

  return undefined;
}

export function parseWorkoutTitle(workout: TWorkout) {
  return workout.title
    ? workout.title
    : new Date(workout.startedAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
      }) + " Workout";
}
