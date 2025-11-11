import z from "zod";

import { EQUIPMENT_OPTIONS, MUSCLE_GROUP_OPTIONS } from "@/lib/constants";

export const exerciseSchema = z.object({
  name: z.string().min(2, "Exercise name too short (min 2 characters)"),
  category: z.enum(["strength", "cardio"], "Invalid type"),
  equipment: z.enum(EQUIPMENT_OPTIONS, "Invalid equipment"),
  targetMuscleGroups: z
    .array(z.enum(MUSCLE_GROUP_OPTIONS))
    .min(1, "Please pick at least one target muscle group"),
  secondaryMuscleGroups: z.array(z.enum(MUSCLE_GROUP_OPTIONS)),
});
