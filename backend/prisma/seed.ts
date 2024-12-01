import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('defaultpassword', 10);

  await prisma.user.createMany({
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
  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
