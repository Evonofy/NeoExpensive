import { User } from '@user/entities';
import { MockUsersRepository } from '@user/repositories/drivers/mock';
import { MockQueueService } from '@user/services/queue/drivers/mock';
import { CreateUserUseCase } from './CreateUserUseCase';

import { CreateUserRequestDTO } from '.';

const user = new User(null);
const usersRepository = new MockUsersRepository();
const queueService = new MockQueueService();
const createUserUseCase = new CreateUserUseCase(
  usersRepository,
  queueService,
  user
);

const createUserDTO: CreateUserRequestDTO = {
  name: 'vitor',
  email: 'vitor@test.com',
  password: '123'
};

describe('Create User', () => {
  it('should create a user', async () => {
    const { user } = await createUserUseCase.execute(createUserDTO);

    expect(user.name).toBe(createUserDTO.name);
    expect(user.email).toBe(createUserDTO.email);
    expect(user.password).toBe(createUserDTO.password);
  });
});
