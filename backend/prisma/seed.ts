import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Добавьте тестовые данные
  await prisma.user.createMany({
    data: [
      { email: 'example1@mail.com', name: 'User One' },
      { email: 'example2@mail.com', name: 'User Two' },
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
