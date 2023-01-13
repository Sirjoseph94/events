import prisma from "../config/prismaClient";

const isAdmin = async (id: string) => {
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
  return true;
};

export default isAdmin;
