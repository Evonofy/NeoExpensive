import { User } from '@user/entities';

import { MockUsersRepository } from '@user/repositories/drivers/mock';
import { MockQueueService } from '@user/services/queue/drivers/mock';
import { ActivateTokenProvider, AccessTokenProvider } from '@user/providers';
import { ActivateUserUseCase } from './ActivateUserUseCase';
import { ActivateUserRequestDTO } from './ActivateUserDTO';
import { MockMailService } from '@user/services/mail/drivers/mock';

const mailService = new MockMailService();
const usersRepository = new MockUsersRepository();
const activateTokenProvider = new ActivateTokenProvider();
const accessTokenProvider = new AccessTokenProvider();
const queueService = new MockQueueService(mailService);
const activateUserUseCase = new ActivateUserUseCase(
  usersRepository,
  activateTokenProvider,
  accessTokenProvider,
  queueService
);

const userMock = new User({
  name: 'test',
  email: 'test@test.com',
  password: '123'
});

const getUser = async () => {
  const activateUserDTO: ActivateUserRequestDTO = await activateTokenProvider.execute(
    userMock,
    userMock.id
  );

  return { activateUserDTO };
};

describe('Activate User', () => {
  it('should fail if there is no token', async () => {
    try {
      await activateUserUseCase.execute(null);
    } catch (error) {
      expect(error.message).toBe('Please supply a jwt token.');
    }
  });

  it('should fail token without Bearer', async () => {
    const { activateUserDTO } = await getUser();

    try {
      await activateUserUseCase.execute(activateUserDTO);
    } catch (error) {
      expect(error.message).toBe('Your token must have the Bearer prefix.');
    }
  });

  it('should activate a user account', async () => {
    const { activateUserDTO } = await getUser();

    const { message, accessToken, user } = await activateUserUseCase.execute(
      `Bearer ${activateUserDTO}`
    );

    expect(message).toBe('Your account was fully activated!');
    expect(typeof accessToken).toBe('string');

    expect(user.id).toBe(userMock.id);
    expect(user.name).toBe(userMock.name);
    expect(user.email).toBe(userMock.email);

    expect(user.created_at).toBe(userMock.created_at);
    expect(user.updated_at).not.toBe(userMock.updated_at);
  });

  it('should fail to activate user that already exists', async () => {
    const { activateUserDTO } = await getUser();

    try {
      await activateUserUseCase.execute(`Bearer ${activateUserDTO}`);
    } catch (error) {
      expect(error.message).toBe('This user already exists.');
    }
  });
});
