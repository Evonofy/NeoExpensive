import { AuthUserUseCase } from './AuthUserUseCase';
import { AuthUserController } from './AuthUserController';
import { User } from '@user/entities';
import { PrismaUsersRepository } from '@user/repositories/drivers/prisma';
import { prisma } from '@infra/prisma';

const user = new User(null);
const usersRepository = new PrismaUsersRepository(prisma);

const authUserUseCase = new AuthUserUseCase(usersRepository, user);

const authUserController = new AuthUserController(authUserUseCase);

export { authUserController };
