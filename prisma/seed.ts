import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const seed = async () => {
  const admin = await prisma.user.upsert({
    create: {
      name: "Admin Jo",
      email: "admin@mail.com",
      password: "admin123",
      isAdmin: true,
    },
    update: {},
    where: {
      email: "admin@mail.com",
    },
  });

  const user = await prisma.user.upsert({
    create: {
      name: "User Jo",
      email: "user@mail.com",
      password: "user123",
      isAdmin: false,
    },
    update: {},
    where: {
      email: "user@mail.com",
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
