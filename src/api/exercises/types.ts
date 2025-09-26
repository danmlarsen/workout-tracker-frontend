export type TExercise = {
  id: number;
  name: string;
  userId: number | null;
  type: string;
  muscleGroups: string[];
  equipment: string;
  image: string | null;
  timesUsed: number;
};
