import {faker} from "@faker-js/faker"
import { PrismaClient } from "@prisma/client";
import { encryptPassword } from "./hashPassword";
const prisma = new PrismaClient();

const seed = async () => {
 const admin = await prisma.user.upsert({
    create: {
      name: "Admin Jo",
      email: "admin@mail.com",
      password: await encryptPassword("admin123") as string,
      isAdmin: true,
    },
    update: {},
    where: {
      email: "admin@mail.com",
    },
  });

  Array.from({length: 10}).map(async (_, i)=>{
    await prisma.event.create({
      data: {
        name: faker.lorem.words(),
        location: faker.address.streetAddress(true),
        description: faker.lorem.paragraph(),
        isPremium: faker.datatype.boolean(),
        authorId: admin.id,
        startDate: faker.date.soon(),
        endDate: faker.date.future()
      },
    });
});
}
seed()
  .then(async () => {
    console.log("database seed successful")
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
