import prisma from "../config/prismaClient";
import isAdmin from "../utils/isAdmin";
import { speakerType } from "../utils/validation/SpeakerValidation";

export const createSpeaker = async (data: speakerType, user_id: string) => {
  if (await isAdmin(user_id)) {
    try {
      const exist = await prisma.speaker.findFirst({
        where: {
          name: data.name,
          designation: data.designation,
        },
      });
      if (exist) {
        throw { statusCode: 400, message: "Speaker already exist" };
      }
      const res = await prisma.speaker.create({
        data: {
          name: data.name,
          designation: data.designation,
        },
      });
      return {
        statusCode: 201,
        message: `${res.name} is created as a Speaker`,
      };
    } catch (error) {
      throw { statusCode: 500, message: `Internal Server Error: ${error}` };
    }
  }
  throw {
    statusCode: 401,
    message: "You are not authorized to perform this operation",
  };
};
