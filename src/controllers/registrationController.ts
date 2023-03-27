import prisma from "../config/prismaClient";
import dateFormat from "../utils/formatDateTime";
import isAdmin from "../utils/isAdmin";
import sendMail from "../utils/mailer";

export const allRegistered = async (userId: string) => {
  if ((await isAdmin(userId)) === true) {
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
    return { statusCode: 200, message: response };
  }
  throw { statusCode: 401, message: "User not authorized for this operation" };
};

export const registerEvent = async (eventId: string, userId: string) => {
  const isRegistered = await prisma.registration.findFirst({
    where: {
      attendeeId: userId,
      eventId,
    },
  });

  if (isRegistered) {
    throw {
      statusCode: 409,
      message: `You've already registered for the event`,
    };
  }
  const event = await prisma.event.findUnique({ where: { id: eventId } });
  if(!event) throw {
    statusCode: 404,
    message: `Event with ID ${eventId} doesn't exist`,
  };
  if (event?.isPremium) {
    throw {
      statusCode: 401,
      message: `You cannot register for premium events`,
    };
  }
  const response = await prisma.registration.create({
    data: {
      attendeeId: userId,
      eventId,
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

  sendMail({
    email: response.attendee.email,
    subject: `${response.event.name}Registration Successful`,
    message: `Dear ${response.attendee.name},

    Here is your event details:

    Name: ${response.event.name}
    Description: ${response.event.description}
    Location: ${response.event.location}
    Date: ${dateFormat(new Date(response.event.startDate))} to ${dateFormat(
      new Date(response.event.endDate)
    )}
     `,
  });
  return { statusCode: 201, message: response };
};

export const searchRegisteredUserByMail = async (
  userEmail: string,
  userId: string
) => {
  if ((await isAdmin(userId)) === false) {
    throw {
      statusCode: 401,
      message: "You are not authorized to perform this operation",
    };
  }
  const response = await prisma.registration.findMany({
    where: {
      attendee: {
        email: userEmail,
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
      message: `${userEmail} has not registered for any Event`,
    };
  }
  return { statusCode: 200, message: response };
};
