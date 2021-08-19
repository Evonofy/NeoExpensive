import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['warn']
});

export { prisma, PrismaClient, User };
