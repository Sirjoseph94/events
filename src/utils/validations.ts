import z from "zod";

export const signupValidation = z
  .object({
    email: z.string().email(),
    name: z.string(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
    isAdmin: z.boolean(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
      });
    }
  });

  export const signInValidation = z.object({
    email: z.string().email(),
    password: z.string()
  })
