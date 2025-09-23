import { Exercise } from '../exercises/types';

export interface Workout {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
  userId: number;
  workoutExercises: WorkoutExercise[];
}

export interface WorkoutExercise {
  id: number;
  workoutId: number;
  exerciseId: number;
  createdAt: string;
  updatedAt: string;
  exercise: Exercise;
  workoutSets: WorkoutSet[];
}

export interface WorkoutSet {
  id: number;
  workoutExerciseId: number;
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
  reps: number | null;
  weight: number | null;
  duration: number | null;
}
