import z from "zod";

export const notesSchema = z.object({
  notes: z.string().max(200, "Max 200 characters"),
});
