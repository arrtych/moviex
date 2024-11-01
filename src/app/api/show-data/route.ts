import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  const users = await prisma.user.findMany({
    // Returns all user fields
    // select: {},
  });
  return Response.json({ users });
}
