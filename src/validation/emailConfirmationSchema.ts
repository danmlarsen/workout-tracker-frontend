import z from "zod";

export const emailConfirmationSchema = z.object({
  email: z.email(),
});
