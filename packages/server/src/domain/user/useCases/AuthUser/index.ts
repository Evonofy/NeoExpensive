import { AuthUserUseCase } from './AuthUserUseCase';
import { AuthUserController } from './AuthUserController';

import { User } from '@user/entities';
import { AccessTokenProvider, RefreshTokenProvider } from '@user/providers';
import {
  PrismaUsersRepository,
  PrismaRefreshTokenRepository
} from '@user/repositories/drivers/prisma';
import { prisma } from '@infra/prisma';

const user = new User(null);
const usersRepository = new PrismaUsersRepository(prisma);
const refreshTokenRepository = new PrismaRefreshTokenRepository(prisma);
const refreshTokenProvider = new RefreshTokenProvider();
const accessTokenProvider = new AccessTokenProvider();

const authUserUseCase = new AuthUserUseCase(
  usersRepository,
  refreshTokenRepository,
  refreshTokenProvider,
  accessTokenProvider,
  user
);

const authUserController = new AuthUserController(authUserUseCase);

export { authUserController };
