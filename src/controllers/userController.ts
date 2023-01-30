import prisma from "../config/prismaClient";
import { decryptPassword, encryptPassword } from "../utils/hashPassword";
import { generateAccessToken } from "../utils/generateToken";

export const signUpController = async (payload: Record<string, any>) => {
  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });
  if (user) {
    throw {
      statusCode: 400,
      message: `User with the email ${user.email} already exist, kindly sign in`,
    };
  }
  const response = await prisma.user.create({
    data: {
      name: payload.name,
      email: payload.email,
      password: (await encryptPassword(payload.password)) as string,
      isAdmin: payload.isAdmin,
    },
  });

  return {statusCode:200, message:{token: generateAccessToken(response.id)}};
};

export const signInController = async (payload: Record<string, any>) => {
  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });
  if (!user) {
    throw {
      statusCode: 404,
      message: `We have no record of the email ${payload.email}, please sign up`,
    };
  }
  const match = await decryptPassword(payload.password, user.password);
  if (!match) {
    throw { statusCode: 403, message: "Password is not correct" };
  }
  return {
    statusCode: 200,
    message: { token: generateAccessToken(user.id) },
  };
};
