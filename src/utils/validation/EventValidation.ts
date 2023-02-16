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
      location: z.string({
        required_error: "Where is it holding?",
      }),
      startDate: z.preprocess(arg => {
        if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
      }, z.date()),

      endDate: z.preprocess(arg => {
        if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
      }, z.date()),

      isPremium: z.boolean({
        required_error: "Is this a premium event?",
      }),
      eventTypes: z
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
      ({ startDate, endDate }) =>
        startDate < endDate && startDate >= new Date(),
      {
        message:
          "Start date must be before end date and Start date should be in the future",
      }
    ),
});

export type newEvent = z.infer<typeof createEventValidation>["body"];

export const updateEventValidation = z.object({
  body: z
    .object({
      name: z
        .string({
          required_error: "Event name is required",
        })
        .optional(),
      description: z
        .string({
          required_error: "Please tell us a little about the event",
        })
        .optional(),
      location: z
        .string({
          required_error: "Please tell us a little about the event",
        })
        .optional(),
      startDate: z.preprocess(arg => {
        if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
      }, z.date()),

      endDate: z.preprocess(arg => {
        if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
      }, z.date()),

      isPremium: z
        .boolean({
          required_error: "Is this a premium event?",
        })
        .optional(),
      eventTypes: z
        .string({
          required_error: "What is the event type?",
        })
        .array()
        .optional(),
      speakers: z
        .array(
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
        )
        .optional(),
    })
    .refine(
      ({ startDate, endDate }) =>
        startDate < endDate && startDate >= new Date(),
      {
        message:
          "Start date must be before end date and Start date should be in the future",
      }
    ),
});

export type updateEvent = z.infer<typeof updateEventValidation>["body"];

export const id = z.object({
  params: z.object({
    id: z
      .string({
        required_error: "this is not a valid UUID",
      })
      .min(36),
  }),
});

export const searchEventValidation = z.object({
  query: z.object({
    name: z.string({ required_error: "Name of event is required" }),
  }),
});
