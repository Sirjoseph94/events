import prisma from "../config/prismaClient";

const isAdmin = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return user?.isAdmin;
};

export default isAdmin;
