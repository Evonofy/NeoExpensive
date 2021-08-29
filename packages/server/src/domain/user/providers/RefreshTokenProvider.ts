import { v4 as uuid } from 'uuid';
import dayjs from 'dayjs';

import { IRefreshTokenRepository } from '@user/repositories';

export class RefreshTokenProvider {
  constructor(private refreshTokenRepository: IRefreshTokenRepository) {}

  async execute(userId: string) {
    const expiresIn = dayjs().add(7, 'days').unix();

    const refreshToken = await this.refreshTokenRepository.create({
      id: uuid(),
      userId,
      expiresIn
    });

    return { refreshToken };
  }
}
