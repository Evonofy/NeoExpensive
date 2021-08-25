import {
  RefreshTokenUserRequestDTO,
  RefreshTokenUserResponseDTO
} from './RefreshUserTokenDTO';

import { AccessTokenProvider, RefreshTokenProvider } from '@user/providers';
import { IRefreshTokenRepository } from '@user/repositories';

import dayjs from 'dayjs';

export class RefreshUserTokenUseCase {
  constructor(
    private refeshTokenRepository: IRefreshTokenRepository,
    private accessTokenProvider: AccessTokenProvider,
    private refreshTokenProvider: RefreshTokenProvider
  ) {}

  async execute({
    refresh_token
  }: RefreshTokenUserRequestDTO): Promise<RefreshTokenUserResponseDTO> {
    const refreshToken = await this.refeshTokenRepository.find(refresh_token);

    if (!refreshToken) {
      throw new Error('Invalid refresh token!');
    }

    const { accessToken } = await this.accessTokenProvider.execute({
      id: refreshToken.userId
    });

    const refreshTokenExpired = dayjs().isAfter(
      dayjs.unix(refreshToken.expiresIn)
    );

    if (refreshTokenExpired) {
      await this.refeshTokenRepository.clean(refreshToken.userId);

      const {
        refreshToken: newRefreshToken
      } = await this.refreshTokenProvider.execute(refreshToken.userId);

      return {
        message: 'Here, take your a new refresh token, you might need it ;)',
        accessToken,
        refreshToken: newRefreshToken
      };
    }

    return {
      message: 'here is your token.',
      accessToken
    };
  }
}
