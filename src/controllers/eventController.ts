import prisma from "../config/prismaClient";
import { newEvent } from "../utils/validation/EventValidation";

export const allEvents = async () => {
  const events = await prisma.event.findMany({
    include: {
      event_types: true,
      author: {
        select:{
          name: true
        }
      },
      speakers: true
    },
  });
  if (!events || events.length < 1) {
    return "Its pretty quiet in here. No event";
  }
  return events;
};

export const createEvent = async (payload: newEvent["body"], id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  if (user?.isAdmin === false) {
    throw {
      status: 401,
      message: "You are not authorized to Create new event",
    };
  }
  const response = await prisma.event.create({
    data: {
      name: payload.name,
      description: payload.description,
      start_date: payload.start_date,
      end_date: payload.end_date,
      isPremium: payload.isPremium,
      author_id: id,
      event_types: {
        connectOrCreate: 
          payload.event_types.map(type => {
            return {
              where: { name: type },
              create: { name: type },
            };
          }),
    
      },
      speakers: {
        connectOrCreate: 
          payload.speakers.map(speaker => {
            return {
              where: { name: speaker.name },
              create: { name: speaker.name, designation: speaker.designation },
            };
          }),
    
      },
    },
  });
  return response;
};
