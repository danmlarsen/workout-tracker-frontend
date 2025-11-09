import { type TEquipment, type TMuscleGroup } from "@/lib/constants";
import { type TWorkout, type TWorkoutSet } from "../workouts/types";

export type TExercise = {
  id: number;
  name: string;
  userId: number | null;
  category: "strength" | "cardio";
  targetMuscleGroups: string[];
  secondaryMuscleGroups: string[];
  equipment: string;
  instructions: string | null;
  imageUrls: string[];
  videoUrls: string[];
  timesUsed: number;
};

export type TCreateExerciseDto = {
  name: string;
  category: string;
  targetMuscleGroups: string[];
  secondaryMuscleGroups?: string[];
  equipment: string;
};

export type TExercisesQuery = {
  success: boolean;
  meta: {
    hasNextPage: boolean;
    nextCursor: number;
  };
  data: TExercise[];
};

export type TExercisesQueryFilters = {
  name?: string;
  targetMuscleGroups?: TMuscleGroup[];
  equipment?: TEquipment[];
};

export type TExerciseWorkoutsQuery = {
  success: boolean;
  meta: {
    hasNextPage: boolean;
    nextCursor: number;
  };
  data: TExerciseWorkouts[];
};

export type TExerciseWorkouts = Omit<TWorkout, "workoutExercises"> & {
  workoutSets: TWorkoutSet[];
};
