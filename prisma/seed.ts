import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const users = [
    {
      name: "Alice",
      bio: "Software Engineer",
      email: "alice@example.com",
    },
    {
      name: "Bob",
      bio: "Data Scientist",
      email: "bob@example.com",
    },
    {
      name: "Charlie",
      bio: "Product Manager",
      email: "charlie@example.com",
    },
  ];

  for (const user of users) {
    await prisma.user.create({
      data: user,
    });
  }

  console.log("Seeded initial users successfully.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
