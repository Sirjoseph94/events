import prisma from "../config/prismaClient";
import isAdmin from "../utils/isAdmin";

export const allRegistered = async (user_id: string) => {
  if ((await isAdmin(user_id)) === true) {
    const response = await prisma.event.findMany({
      select: {
        name: true,
        registrations: {
          select: {
            attendee: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });
    if (!response.length) {
      throw { statusCode: 404, message: "Nobody is attending any event yet" };
    }
    return { statusCode: 200, message: response };
  }
  throw { statusCode: 401, message: "User not authorized for this operation" };
};

export const registerEvent = async (event_id: string, user_id: string) => {
  const isRegistered = await prisma.registration.findFirst({
    where: {
      attendee_id: user_id,
      event_id,
    },
  });

  if (isRegistered) {
    throw {
      statusCode: 409,
      message: `You've already registered for the event`,
    };
  }
  const response = await prisma.registration.create({
    data: {
      attendee_id: user_id,
      event_id,
    },
  });
  return { statusCode: 201, message: response };
};

export const searchRegisteredUserByMail = async (
  user_email: string,
  user_id: string
) => {
  if ((await isAdmin(user_id)) === false) {
    throw {
      statusCode: 401,
      message: "You are not authorized to perform this operation",
    };
  }
  const response = await prisma.registration.findMany({
    where: {
      attendee: {
        email: user_email,
      },
    },
    select: {
      attendee: {
        select: {
          name: true,
          email: true,
        },
      },
      event: true,
    },
  });
  if (!response.length) {
    throw {
      statusCode: 404,
      message: `${user_email} has not registered for any Event`,
    };
  }
  return { statusCode: 200, message: response };
};
