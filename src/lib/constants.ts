export const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const DEFAULT_LIST_ITEM_AMOUNT = 5;
export const WORKOUT_LIST_ITEM_AMOUNT = 5;
export const EXERCISE_LIST_ITEM_AMOUNT = 20;
export const DATE_LOCALE = "en-US";

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
