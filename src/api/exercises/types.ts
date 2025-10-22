import { type TEquipment, type TMuscleGroup } from "@/lib/constants";
import { type TWorkout, type TWorkoutSet } from "../workouts/types";

export type TExercise = {
  id: number;
  name: string;
  userId: number | null;
  exerciseType: string;
  targetMuscleGroups: string[];
  secondaryMuscleGroups: string[];
  equipment: string;
  imageUrls: string[];
  videoUrls: string[];
  timesUsed: number;
};

export type TCreateExerciseDto = {
  name: string;
  exerciseType: string;
  targetMuscleGroups: string[];
  secondaryMuscleGroups?: string[];
  equipment: string;
};

export type TExercisesQuery = {
  results: TExercise[];
  nextCursor: number;
};

export type TExercisesQueryFilters = {
  name?: string;
  targetMuscleGroups?: TMuscleGroup[];
  equipment?: TEquipment[];
};

export type TExerciseWorkoutsQuery = {
  results: TExerciseWorkouts[];
  nextCursor: number;
};

export type TExerciseWorkouts = Omit<TWorkout, "workoutExercises"> & {
  workoutSets: TWorkoutSet[];
};
