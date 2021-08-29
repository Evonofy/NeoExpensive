import { ActivateUserUseCase } from './ActivateUserUseCase';
import { ActivateUserController } from './ActivateUserController';

import { ActivateTokenProvider, AccessTokenProvider } from '@user/providers';
import { PrismaUsersRepository } from '@user/repositories/drivers/prisma';
import { BullQueueService } from '@user/services/queue/drivers/bull';
import { MailTrapMailService } from '@user/services/mail/drivers/mailtrap';
import { prisma } from '@infra/prisma';

const activateTokenProvider = new ActivateTokenProvider();
const accessTokenProvider = new AccessTokenProvider();

const usersRepository = new PrismaUsersRepository(prisma);

const mailService = new MailTrapMailService();
const queueService = new BullQueueService(mailService);

const activateUserUseCase = new ActivateUserUseCase(
  usersRepository,
  activateTokenProvider,
  accessTokenProvider,
  queueService
);

const activateUserController = new ActivateUserController(activateUserUseCase);

export { activateUserController };
