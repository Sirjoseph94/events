import z from "zod";

export const signupValidation = z.object({
  body: z
    .object({
      name: z
        .string({
          required_error: "Name is required",
          invalid_type_error: "Name must be string",
        })
        .min(3, { message: "must be at least 3 characters long" })
        .regex(/(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/, {
          message: "Must be valid Alphabet",
        }),
      email: z
        .string({
          required_error: "Email is required",
        })
        .email("Not a valid email"),
      password: z
        .string({
          required_error: "Enter valid password",
        })
        .min(6, "Password must be at least 6 characters"),
      confirmPassword: z.string().min(6),
      isAdmin: z.boolean().optional(),
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
      if (confirmPassword !== password) {
        ctx.addIssue({
          code: "custom",
          message: "The passwords did not match",
        });
      }
    }),
});

export const signInValidation = z.object({
  body: z.object({
    email: z
      .string({
        required_error: "Email is required",
      })
      .email("Not a valid email"),
    password: z.string({
      required_error: "Password is required",
    }),
  }),
});
