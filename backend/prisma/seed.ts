import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('@1Defaultpassword', 10);

  const users = await prisma.user.createMany({
    data: [
      {
        email: 'example1@mail.com',
        name: 'User One',
        password: hashedPassword,
      },
      {
        email: 'example2@mail.com',
        name: 'User Two',
        password: hashedPassword,
      },
    ],
  });
  console.log(`${users.count} users created.`);

  const createdUsers = await prisma.user.findMany({
    where: {
      email: {
        in: ['example1@mail.com', 'example2@mail.com'],
      },
    },
  });

  for (const user of createdUsers) {
    await prisma.task.createMany({
      data: [
        {
          title: 'First Task for ' + user.name,
          description: 'Description for the first task',
          status: 'PENDING',
          userId: user.id,
        },
        {
          title: 'Second Task for ' + user.name,
          description: 'Description for the second task',
          status: 'IN_PROGRESS',
          userId: user.id,
        },
      ],
    });
  }

  console.log('Tasks seeded successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
