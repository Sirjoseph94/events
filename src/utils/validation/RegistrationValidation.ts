import z from "zod";

export const registerationValidation = z.object({
  params: z.object({
    eventId: z.string({
      required_error: "This is not a valid Event ID",
    }).uuid(),
  }),
});

export const searchRegisterationValidation = z.object({
  query: z.object({
    email: z.string().email({ message: "Invalid email address" }),
  }),
});
