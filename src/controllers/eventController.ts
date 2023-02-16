import prisma from "../config/prismaClient";
import isAdmin from "../utils/isAdmin";
import { newEvent, updateEvent } from "../utils/validation/EventValidation";

export const allEvents = async () => {
  const events = await prisma.event.findMany({
    include: {
      eventTypes: true,
      author: {
        select: {
          name: true,
        },
      },
      speakers: true,
    },
  });
  return { statusCode: 200, message: events };
};

export const createEvent = async (payload: newEvent, id: string) => {
  if ((await isAdmin(id)) === true) {
    const response = await prisma.event.create({
      data: {
        name: payload.name,
        description: payload.description,
        location: payload.location,
        startDate: payload.startDate,
        endDate: payload.endDate,
        isPremium: payload.isPremium,
        authorId: id,
        eventTypes: {
          connectOrCreate: payload.eventTypes.map(type => {
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
    return { statusCode: 201, message: response };
  }
  throw {
    statusCode: 403,
    message: "You are not authorized for this operation",
  };
};

export const viewSingleEvent = async (id: string) => {
  const event = await prisma.event.findUnique({
    where: {
      id,
    },
    include: {
      eventTypes: true,
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
      statusCode: "404",
      message: `There is no event with the id ${id}`,
    };
  }
  return { statusCode: 200, message: event };
};

export const updateEventByID = async (
  id: string,
  userId: string,
  payload: updateEvent
) => {
  if ((await isAdmin(userId)) === true) {
    const data = await prisma.event.findUnique({
      where: { id },
      include: {
        eventTypes: true,
        speakers: true,
      },
    });
    if (!data) {
      throw { statusCode: 404, message: "Event does not exist" };
    }

    const response = await prisma.event.update({
      where: { id },
      data: {
        name: payload?.name || data.name,
        description: payload?.description || data.description,
        location: payload?.location || data.location,
        startDate: payload?.startDate || data.startDate,
        endDate: payload?.endDate || data.endDate,
        isPremium: payload?.isPremium || data.isPremium,
        eventTypes: {
          set: [],
          connectOrCreate: (payload?.eventTypes || data.eventTypes).map(
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
    return { statusCode: 200, message: response };
  }
  return {
    statusCode: 401,
    message: "You're not authorized to perform this operation",
  };
};

export const removeEvent = async (eventId: string, userId: string) => {
  if ((await isAdmin(userId)) === true) {
    await prisma.event.delete({
      where: {
        id: eventId,
      },
    });
    return { statusCode: 204, message: "Event removed" };
  }
  return {
    statusCode: 401,
    message: "You are not authorized to perform this operation",
  };
};
