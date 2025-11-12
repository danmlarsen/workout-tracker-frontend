import { type TEquipment, type TMuscleGroup } from "@/lib/constants";
import { type TWorkout, type TWorkoutSet } from "../workouts/types";

export type ExerciseData = {
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

export type CreateExerciseDto = {
  name: string;
  category: string;
  targetMuscleGroups: string[];
  secondaryMuscleGroups?: string[];
  equipment: string;
};

export type ExercisesResponse = {
  success: boolean;
  meta: {
    hasNextPage: boolean;
    nextCursor: number;
  };
  data: ExerciseData[];
};

export type ExercisesQueryFilters = {
  name?: string;
  targetMuscleGroups?: TMuscleGroup[];
  equipment?: TEquipment[];
};

export type ExerciseWorkoutsResponse = {
  success: boolean;
  meta: {
    hasNextPage: boolean;
    nextCursor: number;
  };
  data: ExerciseWorkoutsData[];
};

export type ExerciseWorkoutsData = Omit<TWorkout, "workoutExercises"> & {
  workoutSets: TWorkoutSet[];
};
