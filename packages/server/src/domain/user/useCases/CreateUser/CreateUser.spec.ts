import { User, Token } from '@user/entities';

import { createUserUseCase, CreateUserRequestDTO } from '.';

const createUserDTO: CreateUserRequestDTO = {
  name: 'vitor',
  email: 'vitor@test.com',
  password: '123'
};

describe('Create User', () => {
  it('should create a token entity', () => {
    const date = new Date();

    const { expiresIn, userId } = new Token({
      expiresIn: date,
      userId: '123'
    });

    expect(expiresIn).toStrictEqual(date);
    expect(userId).toBe('123');
  });

  it('should create a user entity', () => {
    const user = new User(createUserDTO);

    expect(user.name).toBe(createUserDTO.name);
    expect(user.email).toBe(createUserDTO.email);
    expect(user.password).toBe(createUserDTO.password);
  });

  it('should create a user', async () => {
    const { user } = await createUserUseCase.execute(createUserDTO);

    expect(user.name).toBe(createUserDTO.name);
    expect(user.email).toBe(createUserDTO.email);
    expect(user.password).toBe(createUserDTO.password);
  });
});
