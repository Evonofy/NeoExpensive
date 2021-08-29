import { CreateUserRequestDTO } from './CreateUserDTO';
import { CreateUserUseCase } from './CreateUserUseCase';
import { CreateUserController } from './CreateUserController';

import { PrismaUsersRepository } from '@user/repositories/drivers/prisma';
import { BullQueueService } from '@user/services/queue/drivers/bull';
import { MailTrapMailService } from '@user/services/mail/drivers/mailtrap';
import { ActivateTokenProvider } from '@user/providers';
import { prisma } from '@infra/prisma';
import { User } from '@user/entities';

/** creates an user instance */
const user = new User(null);

/* creates an instance of the mail service */
const mailService = new MailTrapMailService();

/* creates an instance of the queue service */
const queueService = new BullQueueService(mailService);

/* creates an instance of the Activate token provider */
const accessTokenProvider = new ActivateTokenProvider();

/** creates an instance of the user repository */
const usersRepository = new PrismaUsersRepository(prisma);

/** gives the dependencies to the use case */
const createUserUseCase = new CreateUserUseCase(
  usersRepository,
  queueService,
  accessTokenProvider,
  user
);

/** supply the controller with the use case */
const createUserController = new CreateUserController(createUserUseCase);

export { createUserController, createUserUseCase, CreateUserRequestDTO };
