import { v4 as uuid } from 'uuid';
import dayjs from 'dayjs';

import { prisma } from '@infra/prisma';

export class RefreshTokenProvider {
  async execute(userId: string) {
    const expiresIn = dayjs().add(15, 'minute').unix();

    const refreshToken = await prisma.refreshToken.create({
      data: {
        id: uuid(),
        userId,
        expiresIn
      }
    });

    return { refreshToken };
  }
}
