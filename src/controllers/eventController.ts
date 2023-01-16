import prisma from "../config/prismaClient";
import isAdmin from "../utils/isAdmin";
import { newEvent, updateEvent } from "../utils/validation/EventValidation";

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

export const createEvent = async (payload: newEvent, id: string) => {
  if ((await isAdmin(id)) === true) {
    const response = await prisma.event.create({
      data: {
        name: payload.name,
        description: payload.description,
        location: payload.location,
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

export const updateEventByID = async (
  id: string,
  user_id: string,
  payload: updateEvent
) => {
  if ((await isAdmin(user_id)) === true) {
    const data = await prisma.event.findUnique({
      where: { id },
      include: {
        event_types: true,
        speakers: true,
      },
    });
    if (!data) {
      throw { status: 404, reason: "Event does not exist" };
    }

    const response = await prisma.event.update({
      where: { id },
      data: {
        name: payload?.name || data.name,
        description: payload?.description || data.description,
        location: payload?.location || data.location,
        start_date: payload?.start_date || data.start_date,
        end_date: payload?.end_date || data.end_date,
        isPremium: payload?.isPremium || data.isPremium,
        event_types: {
          set: [],
          connectOrCreate: (payload?.event_types || data.event_types).map(
            type => {
              return {
                where: { name: type },
                create: { name: type },
              };
            }
          ) as any,
        },
        speakers: {
          set: [],
          connectOrCreate: (payload?.speakers || data.speakers).map(speaker => {
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
