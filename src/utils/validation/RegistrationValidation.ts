import z from "zod";

export const registerationValidation = z.object({
  params: z.object({
    event_id: z.string({
      required_error: "This is not a valid Event ID",
    }),
  }),
});

export const searchRegisterationValidation = z.object({
  query: z.object({
    email: z.string({
      required_error: "This is not a valid Event ID",
    }),
  }),
});


