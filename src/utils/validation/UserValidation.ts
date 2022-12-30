import z from "zod";

export const signupValidation = z.object({
  body: z
    .object({
      email: z
        .string({
          required_error: "Email is required",
        })
        .email("Not a valid email"),
      name: z.string({
        required_error: "Name is required",
      }),
      password: z
        .string({
          required_error: "Enter valid password",
        })
        .min(6, "Password must be at least 6 characters"),
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
