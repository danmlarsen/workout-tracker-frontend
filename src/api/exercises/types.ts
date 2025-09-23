export interface Exercise {
  id: number;
  name: string;
  userId: number | null;
  type: string;
  muscleGroup: string;
  equipment: string;
  image: string | null;
}
