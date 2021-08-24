import { v4 as uuid } from 'uuid';
import dayjs from 'dayjs';

import { prisma } from '@infra/prisma';

export class GenerateRefreshToken {
  async execute(userId: string) {
    const expiresIn = dayjs().add(15, 'minute').unix();

    const generateRefreshToken = await prisma.refreshToken.create({
      data: {
        id: uuid(),
        userId,
        expiresIn
      }
    });

    return generateRefreshToken;
  }
}
