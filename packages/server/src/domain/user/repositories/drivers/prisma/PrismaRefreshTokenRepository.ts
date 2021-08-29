import { PrismaClient } from '@infra/prisma';

import {
  RefreshTokenRequest,
  RefreshTokenResponse
} from '../../IRefreshTokenRepositoryDTO';
import { IRefreshTokenRepository } from '@user/repositories';

export class PrismaRefreshTokenRepository implements IRefreshTokenRepository {
  constructor(private prismaClient: PrismaClient) {}

  async create({
    ...rest
  }: RefreshTokenRequest): Promise<RefreshTokenResponse> {
    const refreshToken = await this.prismaClient.refreshToken.create({
      data: {
        ...rest
      }
    });

    return refreshToken;
  }

  async find(id: string): Promise<RefreshTokenResponse> {
    const refreshToken = await this.prismaClient.refreshToken.findUnique({
      where: {
        id
      }
    });

    return refreshToken;
  }

  async clean(userId: string): Promise<void> {
    await this.prismaClient.refreshToken.deleteMany({
      where: {
        userId
      }
    });
  }
}
