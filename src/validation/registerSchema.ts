import z from "zod";

import { passwordSchema } from "./passwordSchema";

export const registerSchema = z
  .object({
    email: z.email(),
    password: passwordSchema,
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords dont match",
    path: ["passwordConfirm"],
  });
