import { CreateUserRequestDTO } from './CreateUserDTO';
import { CreateUserUseCase } from './CreateUserUseCase';
import { CreateUserController } from './CreateUserController';

import { PrismaUsersRepository } from '@user/repositories/drivers/prisma';
import { prisma } from '@infra/prisma';

const usersRepository = new PrismaUsersRepository(prisma);

const createUserUseCase = new CreateUserUseCase(usersRepository);
const createUserController = new CreateUserController(createUserUseCase);

export { createUserController, createUserUseCase, CreateUserRequestDTO };
