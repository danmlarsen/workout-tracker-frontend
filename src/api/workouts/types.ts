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
