import { PrismaClient } from "@prisma/client";
import { neon } from "@neondatabase/serverless";

const connectionString = process.env.DATABASE_URL;

// Create a singleton PrismaClient instance
const prismaClientSingleton = () => {
  return new PrismaClient();
};

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
