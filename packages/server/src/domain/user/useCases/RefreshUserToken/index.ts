import { RefreshUserTokenUseCase } from './RefreshUserTokenUseCase';
import { RefreshUserTokenController } from './RefreshUserTokenController';

import { PrismaRefreshTokenRepository } from '@user/repositories/drivers/prisma';
import { AccessTokenProvider } from '@user/providers';
import { prisma } from '@infra/prisma';

const refreshTokenRepository = new PrismaRefreshTokenRepository(prisma);
const accessTokenProvider = new AccessTokenProvider();
const refreshUserTokenUseCase = new RefreshUserTokenUseCase(
  refreshTokenRepository,
  accessTokenProvider
);
const refreshUserTokenController = new RefreshUserTokenController(
  refreshUserTokenUseCase
);

export { refreshUserTokenController };
