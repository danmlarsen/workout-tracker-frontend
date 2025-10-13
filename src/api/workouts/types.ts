import { type TExercise } from "../exercises/types";

export type TWorkoutsQuery = {
  results: TWorkout[];
  nextCursor: number;
};

export type TWorkout = {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
  userId: number;
  workoutExercises: TWorkoutExercise[];
  status: "DRAFT" | "ACTIVE" | "COMPLETED";
  notes: string | null;
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
};

export type TWorkoutSetDto = {
  reps?: number | null;
  weight?: number | null;
  duration?: number | null;
  completed?: boolean;
};

export type TUpdateWorkoutDto = {
  title?: string;
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
