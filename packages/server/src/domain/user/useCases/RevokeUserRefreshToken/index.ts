import { RevokeUserRefreshTokenUseCase } from './RevokeUserRefreshTokenUseCase';
import { RevokeRefreshUserTokenController } from './RevokeUserRefreshTokenController';

import { PrismaRefreshTokenRepository } from '@user/repositories/drivers/prisma';
import { prisma } from '@infra/prisma';

const refreshTokenRepository = new PrismaRefreshTokenRepository(prisma);
const revokeUserRefreshTokenUseCase = new RevokeUserRefreshTokenUseCase(
  refreshTokenRepository
);

const revokeRefreshUserTokenController = new RevokeRefreshUserTokenController(
  revokeUserRefreshTokenUseCase
);

export { revokeRefreshUserTokenController };
