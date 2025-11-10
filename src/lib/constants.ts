export const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const DEFAULT_LIST_ITEM_AMOUNT = 5;

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL environment variable is required");
}

export const API_TESTING_TOKEN = process.env.NEXT_PUBLIC_TESTING_TOKEN;

export const EQUIPMENT_OPTIONS = [
  "barbell",
  "dumbbell",
  "kettlebell",
  "machine",
  "bodyweight",
  "cardio",
  "smith machine",
  "cable",
  "safety bar",
  "other",
] as const;

export const MUSCLE_GROUP_OPTIONS = [
  "chest",
  "front delts",
  "middle delts",
  "rear delts",
  "biceps",
  "triceps",
  "forearms",
  "lats",
  "upper back",
  "lower back",
  "neck",
  "abs",
  "glutes",
  "hamstrings",
  "quadriceps",
  "abductors",
  "adductors",
  "calves",
  "olympic",
  "full-body",
  "other",
] as const;

export type TEquipment = (typeof EQUIPMENT_OPTIONS)[number];
export type TMuscleGroup = (typeof MUSCLE_GROUP_OPTIONS)[number];
