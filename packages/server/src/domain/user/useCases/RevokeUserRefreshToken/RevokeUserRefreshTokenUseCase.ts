import {
  RevokeUserRefreshTokenRequestDTO,
  RevokeUserRefreshTokenResponseDTO
} from './RevokeUserRefreshTokenDTO';

import { IRefreshTokenRepository } from '@user/repositories';

export class RevokeUserRefreshTokenUseCase {
  constructor(private refreshTokenRepository: IRefreshTokenRepository) {}

  async execute({
    userId
  }: RevokeUserRefreshTokenRequestDTO): Promise<RevokeUserRefreshTokenResponseDTO> {
    await this.refreshTokenRepository.clean(userId);

    return {
      message: 'Revoked user refresh token successfully!'
    };
  }
}
