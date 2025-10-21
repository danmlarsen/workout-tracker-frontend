import { type TExercise } from "../exercises/types";

export type TWorkoutsQuery = {
  results: TWorkout[];
  nextCursor: number;
};

export type TWorkout = {
  id: number;
  title?: string;
  createdAt: string;
  updatedAt: string;
  startedAt: string;
  userId: number;
  workoutExercises: TWorkoutExercise[];
  status: "DRAFT" | "ACTIVE" | "COMPLETED";
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
  completedAt: string | null;
  reps: number | null;
  weight: number | null;
  duration: number | null;
  setNumber: number;
  notes: string | null;
  type: "normal" | "warmup";
};

export type TWorkoutSetDto = {
  reps?: number | null;
  weight?: number | null;
  duration?: number | null;
  completed?: boolean;
  type?: "normal" | "warmup";
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
