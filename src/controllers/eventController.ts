import prisma from "../config/prismaClient";
import isAdmin from "../utils/isAdmin";
import { newEvent } from "../utils/validation/EventValidation";

export const allEvents = async () => {
  const events = await prisma.event.findMany({
    include: {
      event_types: true,
      author: {
        select: {
          name: true,
        },
      },
      speakers: true,
    },
  });
  if (!events || events.length < 1) {
    return "Its pretty quiet in here. No event";
  }
  return events;
};

export const createEvent = async (payload: newEvent["body"], id: string) => {
  if ((await isAdmin(id)) === true) {
    const response = await prisma.event.create({
      data: {
        name: payload.name,
        description: payload.description,
        start_date: payload.start_date,
        end_date: payload.end_date,
        isPremium: payload.isPremium,
        author_id: id,
        event_types: {
          connectOrCreate: payload.event_types.map(type => {
            return {
              where: { name: type },
              create: { name: type },
            };
          }),
        },
        speakers: {
          connectOrCreate: payload.speakers.map(speaker => {
            return {
              where: { name: speaker.name },
              create: { name: speaker.name, designation: speaker.designation },
            };
          }),
        },
      },
    });
    return response;
  }
};

export const viewSingleEvent = async (id: string) => {
  const event = await prisma.event.findUnique({
    where: {
      id,
    },
    include: {
      event_types: true,
      author: {
        select: {
          name: true,
        },
      },
      speakers: true,
    },
  });
  if (!event) {
    throw {
      status: "404",
      message: `There is no event with the id ${id}`,
    };
  }
  return event;
};

export const removeEvent = async (event_id: string, user_id: string) => {
  if ((await isAdmin(user_id)) === true) {
    await prisma.event.delete({
      where: {
        id: event_id,
      },
    });
  }
  return "Event removed";
};
