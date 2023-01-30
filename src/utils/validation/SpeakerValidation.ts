import z from "zod";

export const speakerValidation = z.object({
  body: z.object({
    name: z.string({
      required_error: "The name of the Speaker is required",
    }),
    designation: z.string({
      required_error: "The designation of the Speaker is required",
    }),
  }),
});

export type speakerType = z.infer<typeof speakerValidation>["body"];
