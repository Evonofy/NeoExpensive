import { ActivateUserUseCase } from './ActivateUserUseCase';
import { ActivateUserController } from './ActivateUserController';

import { ActivateTokenProvider, AccessTokenProvider } from '@user/providers';
import { PrismaUsersRepository } from '@user/repositories/drivers/prisma';
import { prisma } from '@infra/prisma';

const activateTokenProvider = new ActivateTokenProvider();
const accessTokenProvider = new AccessTokenProvider();

const usersRepository = new PrismaUsersRepository(prisma);

const activateUserUseCase = new ActivateUserUseCase(
  activateTokenProvider,
  accessTokenProvider,
  usersRepository
);

const activateUserController = new ActivateUserController(activateUserUseCase);

export { activateUserController };
