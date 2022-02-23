import crypto from 'crypto';
import dayjs from 'dayjs';
import { prisma } from '../../../infra/prisma';

export class generateRefreshToken {
  async execute(userId: string) {
    await prisma.refreshToken.deleteMany({
      where: {
        userId,
      },
    });

    const expiresIn = dayjs().add(3, 'day').unix();

    const refreshToken = await prisma.refreshToken.create({
      data: {
        id: crypto.randomUUID(),
        userId,
        expiresIn,
      },
    });

    return {
      refreshToken,
    };
  }
}
