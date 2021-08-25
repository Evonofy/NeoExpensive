import {
  RefreshTokenUserRequestDTO,
  RefreshTokenUserResponseDTO
} from './RefreshUserTokenDTO';

import { AccessTokenProvider } from '@user/providers';
import { IRefreshTokenRepository } from '@user/repositories';

export class RefreshUserTokenUseCase {
  constructor(
    private refeshTokenRepository: IRefreshTokenRepository,
    private accessTokenProvider: AccessTokenProvider
  ) {}

  async execute({
    refresh_token
  }: RefreshTokenUserRequestDTO): Promise<RefreshTokenUserResponseDTO> {
    const refreshToken = await this.refeshTokenRepository.find(refresh_token);
    console.log(refresh_token);
    if (!refreshToken) {
      throw new Error('Invalid refresh token!');
    }

    const { accessToken } = await this.accessTokenProvider.execute({
      id: refreshToken.userId
    });

    return {
      message: 'here is your token.',
      accessToken
    };
  }
}
