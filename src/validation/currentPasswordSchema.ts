import z from "zod";

export const currentPasswordSchema = z.object({
  currentPassword: z.string().min(1, "Password is required"),
});
