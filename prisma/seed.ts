import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const seed = async () => {
  const admin = await prisma.user.create({
    data: {
      name: "Admin Jo",
      email: "admin@mail.com",
      password: "admin123",
      isAdmin: true,
    },
  });

  const user = await prisma.user.create({
    data: {
      name: "User Jo",
      email: "user@mail.com",
      password: "user123",
      isAdmin: false,
    },
  });
  console.log({ admin, user });
};

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
