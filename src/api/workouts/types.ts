import { type TExercise } from "../exercises/types";

export type TWorkoutsQuery = {
  results: TWorkoutSummary[];
  nextCursor: number;
};

export type TWorkoutSummary = Omit<TWorkout, "workoutExercises"> & {
  workoutExercises: TWorkoutExerciseSummary[];
  totalWeight: number;
  totalCompletedSets: number;
};

export type TWorkoutExerciseSummary = {
  exerciseName: string;
  sets: number;
  bestSet: TWorkoutExerciseBestSet;
};

export type TWorkoutExerciseBestSet = Pick<
  TWorkoutSet,
  "type" | "completed" | "reps" | "weight" | "duration"
>;

export type TWorkout = {
  id: number;
  title?: string;
  createdAt: string;
  updatedAt: string;
  startedAt: string;
  userId: number;
  workoutExercises: TWorkoutExercise[];
  status: TWorkoutStatus;
  notes: string | null;
  isPaused: boolean;
  pauseDuration: number;
  lastPauseStartTime: string | null;
  activeDuration: number;
};

export type TWorkoutExercise = {
  id: number;
  workoutId: number;
  exerciseId: number;
  createdAt: string;
  updatedAt: string;
  exercise: TExercise;
  workoutSets: TWorkoutSet[];
  exerciseOrder: number;
  previousWorkoutExercise?: TWorkoutExercise;
  notes: string | null;
};

export type TWorkoutSet = {
  id: number;
  workoutExerciseId: number;
  createdAt: string;
  updatedAt: string;
  completed: boolean;
  reps: number | null;
  weight: number | null;
  duration: number | null;
  setNumber: number;
  notes: string | null;
  type: TWorkoutSetType;
};

export type TWorkoutSetDto = {
  reps?: number | null;
  weight?: number | null;
  duration?: number | null;
  completed?: boolean;
  type?: TWorkoutSetType;
};

export type TCreateWorkoutDto = {
  title?: string | null;
  notes?: string | null;
  startedAt?: string;
  activeDuration?: number;
};

export type TUpdateWorkoutDto = {
  title?: string | null;
  notes?: string | null;
  startedAt?: string;
  activeDuration?: number;
};

export type TWorkoutStats = {
  totalWorkouts: number;
  totalHours: number;
  totalWeightLifted: number;
};

export type TWorkoutCalendarData = {
  workoutDates: string[];
  totalWorkouts: number;
};

export type TUpdateWorkoutExerciseDto = {
  notes?: string;
};

export type TWorkoutStatus = "DRAFT" | "ACTIVE" | "COMPLETED";

export const WORKOUT_SET_TYPES = [
  "normal",
  "warmup",
  "dropset",
  "failure",
] as const;
export type TWorkoutSetType = (typeof WORKOUT_SET_TYPES)[number];
