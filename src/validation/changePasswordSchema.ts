import z from "zod";
import { passwordSchema } from "./passwordSchema";

export const changePasswordSchema = z
  .object({
    newPassword: passwordSchema,
    newPasswordConfirm: z.string(),
  })
  .refine((data) => data.newPassword === data.newPasswordConfirm, {
    message: "Passwords dont match",
    path: ["newPasswordConfirm"],
  });
