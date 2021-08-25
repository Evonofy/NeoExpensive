import { PrismaClient } from '@infra/prisma';

import {
  RefreshTokenRequest,
  RefreshTokenResponse
} from '../../IRefreshTokenRepositoryDTO';
import { IRefreshTokenRepository } from '@user/repositories';

export class PrismaRefreshTokenRepository implements IRefreshTokenRepository {
  constructor(private prismaClient: PrismaClient) {}

  async find(id: RefreshTokenRequest): Promise<RefreshTokenResponse> {
    const refreshToken = await this.prismaClient.refreshToken.findUnique({
      where: {
        id
      }
    });

    return refreshToken;
  }

  async clean(): Promise<void> {
    await this.prismaClient.refreshToken.deleteMany();
  }
}
