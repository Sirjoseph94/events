import z from "zod";

export const createEventValidation = z.object({
  body: z
    .object({
      name: z.string({
        required_error: "Event name is required",
      }),
      description: z.string({
        required_error: "Please tell us a little about the event",
      }),
      start_date: z.preprocess(arg => {
        if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
      }, z.date()),

      end_date: z.preprocess(arg => {
        if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
      }, z.date()),

      isPremium: z.boolean({
        required_error: "Is this a premium event?",
      }),
      event_types: z
        .string({
          required_error: "What is the event type?",
        })
        .array()
        .nonempty(),
      speakers: z.array(
        z.object({
          name: z.string({
            required_error: "Speaker name is required",
          }),
          designation: z.string({
            required_error: "Say something about the speaker",
          }),
        }),
        {
          required_error: "Speaker details is required",
        }
      ),
    })
    .refine(
      ({ start_date, end_date }) =>
        start_date < end_date && start_date >= new Date(),
      {
        message:
          "Start date must be before end date and Start date should be in the future",
      }
    ),
});

export type newEvent = z.infer<typeof createEventValidation>;
