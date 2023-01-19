import prisma from "../config/prismaClient";
import dateFormat from "../utils/formatDateTime";
import isAdmin from "../utils/isAdmin";
import sendMail from "../utils/mailer";

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
      throw { status: 404, message: "Nobody is attending any event yet" };
    }
    return response;
  }
  throw { status: 401, reason: "User not authorized for this operation" };
};

export const registerEvent = async (event_id: string, user_id: string) => {
  const isRegistered = await prisma.registration.findFirst({
    where: {
      attendee_id: user_id,
      event_id,
    },
  });

  if (isRegistered) {
    throw { status: 409, message: `You've already registered for the event` };
  }
  const response = await prisma.registration.create({
    data: {
      attendee_id: user_id,
      event_id,
    },
    select: {
      attendee: true,
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
    Date: ${dateFormat(new Date(response.event.start_date))} to ${dateFormat(
      new Date(response.event.end_date)
    )}
     `,
  });
  return response;
};

export const searchRegisteredUserByMail = async (
  user_email: string,
  user_id: string
) => {
  if ((await isAdmin(user_id)) === false) {
    throw {
      status: 401,
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
      status: 404,
      message: `${user_email} has not registered for any Event`,
    };
  }
  return response;
};
