import {
  TWorkout,
  TWorkoutExerciseBestSet,
  TWorkoutSet,
} from "@/api/workouts/types";
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

export function getBestSetByDuration(sets: TWorkoutSet[]): TWorkoutSet | null {
  if (sets.length === 0) return null;

  return sets.reduce((best, current) =>
    current.duration! > best.duration! ? current : best,
  );
}

export function formatBestSet(bestSet: TWorkoutExerciseBestSet | null): string {
  if (bestSet?.reps && bestSet.weight) {
    return bestSet ? `${bestSet.weight} kg x ${bestSet.reps}` : "-";
  }

  if (bestSet?.duration) {
    return `${bestSet.duration} min`;
  }

  return "";
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
  currentWorkoutSets?: TWorkoutSet[],
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

  // Check for completed sets in current workout exercise
  if (currentWorkoutSets && currentWorkoutSets.length > 0) {
    // Filter for completed sets with data (weight/reps or duration)
    const completedSets = currentWorkoutSets.filter(
      (set) =>
        set.completed &&
        ((set.weight && set.reps && set.weight > 0 && set.reps > 0) ||
          (set.duration && set.duration > 0)),
    );

    if (completedSets.length > 0) {
      // Return the most recent completed set, or the set at the same index if it exists
      const sameIndexSet = completedSets.find(
        (set) => set.setNumber === setIndex + 1,
      );
      if (sameIndexSet) {
        return sameIndexSet;
      }

      // Otherwise return the last completed set
      return completedSets[completedSets.length - 1];
    }
  }

  return undefined;
}

export function parseWorkoutTitle(
  workout: Pick<TWorkout, "title" | "startedAt">,
) {
  return workout.title
    ? workout.title
    : new Date(workout.startedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }) + " Workout";
}

export const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return `${hours ? `${hours.toString().padStart(2, "0")}:` : ""}${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
};

export const formatTimeFromMs = (milliseconds: number): string => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${hours ? `${hours.toString().padStart(2, "0")}:` : ""}${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

export function getDayRangeUTC(date = new Date()) {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0); // local start of day

  const end = new Date(date);
  end.setHours(23, 59, 59, 999); // local end of day

  return {
    from: start.toISOString(),
    to: end.toISOString(),
  };
}
