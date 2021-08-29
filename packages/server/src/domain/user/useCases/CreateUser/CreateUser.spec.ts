import { User } from '@user/entities';
import { MockUsersRepository } from '@user/repositories/drivers/mock';
import { MockQueueService } from '@user/services/queue/drivers/mock';
import { ActivateTokenProvider } from '@user/providers';
import { CreateUserUseCase } from './CreateUserUseCase';
import { MockMailService } from '@user/services/mail/drivers/mock';

import { CreateUserRequestDTO } from '.';
import { Payload } from '../ActivateUser/ActivateUserUseCase';

const user = new User(null);
const mailService = new MockMailService();
const usersRepository = new MockUsersRepository();
const queueService = new MockQueueService(mailService);
const activateTokenProvider = new ActivateTokenProvider();
const createUserUseCase = new CreateUserUseCase(
  usersRepository,
  queueService,
  activateTokenProvider,
  user
);

const createUserDTO: CreateUserRequestDTO = {
  name: 'vitor',
  email: 'vitor@test.com',
  password: '123'
};

describe('Create User', () => {
  it('should create a user', async () => {
    const { activate_token, message } = await createUserUseCase.execute(
      createUserDTO
    );

    const { payload } = activateTokenProvider.validate(
      activate_token
    ) as Payload;
    expect(payload.name).toBe(createUserDTO.name);
    expect(payload.email).toBe(createUserDTO.email);

    const comparePassword = await user.comparePassword(
      createUserDTO.password,
      payload.password
    );
    expect(comparePassword).toBe(true);

    expect(typeof activate_token).toBe('string');
    expect(message).toBe(
      'Just 1 step for full account activation. Activate your account with the token below.'
    );
  });
});
