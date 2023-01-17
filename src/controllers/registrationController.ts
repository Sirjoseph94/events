import prisma from "../config/prismaClient";
import isAdmin from "../utils/isAdmin";

export const allRegistered = async (user_id: string) => {
  if ((await isAdmin(user_id)) === true) {
    const response = await prisma.registration.findMany({
      select: {
        attendee: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
    return response;
  }
  throw { status: 401, reason: "User not authorized for this operation" };
};

export const registerEvent = async (event_id: string, user_id: string) => {
  const response = await prisma.registration.create({
    data: {
      attendee_id: user_id,
      event_id: event_id,
    },
  });
  return response;
};
