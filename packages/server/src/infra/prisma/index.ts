import { PrismaClient, User, RefreshToken, WishList } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['warn']
});

export { prisma, PrismaClient, User, RefreshToken, WishList };
