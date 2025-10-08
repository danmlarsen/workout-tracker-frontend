export const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL environment variable is required");
}

export const API_TESTING_TOKEN = process.env.NEXT_PUBLIC_TESTING_TOKEN;

export const EQUIPMENT_OPTIONS = [
  "Barbell",
  "Dumbbell",
  "Kettlebell",
  "Machine",
  "Bodyweight",
  "Cardio",
  "Smith Machine",
  "Cable",
  "Safety Bar",
  "Other",
] as const;

export const MUSCLE_GROUP_OPTIONS = [
  "Chest",
  "Front Delts",
  "Middle Delts",
  "Rear Delts",
  "Biceps",
  "Triceps",
  "Forearms",
  "Lats",
  "Upper Back",
  "Lower Back",
  "Neck",
  "Abs",
  "Glutes",
  "Hamstrings",
  "Quadriceps",
  "Abductors",
  "Adductors",
  "Calves",
  "Olympic",
  "Full-Body",
  "Other",
] as const;

export type TEquipment = (typeof EQUIPMENT_OPTIONS)[number];
export type TMuscleGroup = (typeof MUSCLE_GROUP_OPTIONS)[number];
