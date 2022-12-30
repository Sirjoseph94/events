import prisma from "../config/prismaClient";
import { decryptPassword, encryptPassword } from "../utils/hashPassword";
import { generateAccessToken } from "../utils/generateToken";

export const signUpController = async (payload: Record<string, any>) => {
  const user = await prisma.user.findUnique({
    where: {
      email: payload.email
    }
  })
  if(user){
    throw {status: 400, message: `User with the email ${user.email} already exist, kindly sign in`}
  }
  const response = await prisma.user.create({
    data: {
      name: payload.name,
      email: payload.email,
      password: (await encryptPassword(payload.password)) as string,
      isAdmin: payload.isAdmin,
    },
  });

  return generateAccessToken(response.id);
};

export const signInController = async (payload: Record<string, any>) => {
  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });
  if (!user) {
    throw `We have no record of the email ${payload.email}, please sign up`;
  }
  const match = await decryptPassword(payload.password, user.password);
  if (!match) {
    throw "Password is not correct";
  }
  return generateAccessToken(user.id);
};
