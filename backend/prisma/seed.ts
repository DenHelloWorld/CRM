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

  const tasks = await prisma.task.createMany({
    data: [
      {
        title: 'Task 1',
        description: 'Description for task 1',
        status: 'PENDING',
      },
      {
        title: 'Task 2',
        description: 'Description for task 2',
        status: 'IN_PROGRESS',
      },
    ],
  });
  console.log(`${tasks.count} tasks created.`);

  const createdUsers = await prisma.user.findMany();
  const createdTasks = await prisma.task.findMany();

  for (const user of createdUsers) {
    for (const task of createdTasks) {
      await prisma.userTask.create({
        data: {
          userId: user.id,
          taskId: task.id,
        },
      });
    }
  }

  console.log('User-task relations seeded successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
