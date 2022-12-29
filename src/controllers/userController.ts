import { signInValidation, signupValidation } from "../utils/validations";
import prisma from "../config/prismaClient";
import { decryptPassword, encryptPassword } from "../utils/hashPassword";
import { generateAccessToken } from "../utils/token";

export const signUpController = async (payload: Record<string, unknown>) => {
  const isValid = signupValidation.safeParse(payload);
  if (!isValid.success) {
    throw isValid.error;
  }
  const record = isValid.data;
  await prisma.user.create({
    data: {
      name: record.name,
      email: record.email,
      password: (await encryptPassword(record.password)) as string,
      isAdmin: record.isAdmin,
    },
    select: {
      name: true,
      email: true,
      isAdmin: true,
    },
  });
};

export const signInController = async (payload: unknown) => {
  const isValid = signInValidation.safeParse(payload);
  if (!isValid.success) {
    throw isValid.error;
  }

  const { email, password } = isValid.data;
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    throw `We have no record of the email ${email}, please sign up`;
  }
  const match = await decryptPassword(password, user.password);
  if (!match) {
    throw "Password is not correct";
  }
  return generateAccessToken(user.id);
};
