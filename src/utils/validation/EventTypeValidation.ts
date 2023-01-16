import z from "zod";

export const eventTypeValidation = z.object({
  body: z.object({
    name: z.string({
      required_error: "The name of the event type is required",
    }),
  }),
});

export type eventType = z.infer<typeof eventTypeValidation>["body"];
