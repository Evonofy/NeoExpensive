import crypto from 'crypto';
import dayjs from 'dayjs';
import { prisma } from '../../../infra/prisma';

type GenerateRefreshTokenProps = {
  platform?: string;
};

export class generateRefreshToken {
  async execute(userId: string, options?: GenerateRefreshTokenProps) {
    const expiresIn = dayjs().add(3, 'day').unix();

    const refreshToken = await prisma.refreshToken.create({
      data: {
        id: crypto.randomUUID(),
        userId,
        expiresIn,
        platform: options?.platform || 'unkown',
      },
    });

    return {
      refreshToken,
    };
  }
}
