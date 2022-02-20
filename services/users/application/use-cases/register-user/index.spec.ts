import { RegisterUser } from '.';
import { InMemoryUsersRepository } from '../../repositories/drivers/tests/in-memory-users-repository';

const usersRepository = new InMemoryUsersRepository();

beforeEach(async () => {
  await usersRepository.clean();
});

const registerUserTestFactory = () => {
  const registerUser = new RegisterUser(usersRepository);

  return {
    registerUser,
  };
};

describe('Register User', () => {
  it('should be able to create a new user', async () => {
    const { registerUser } = registerUserTestFactory();

    const sut = await registerUser.execute({
      name: 'test',
      email: 'test@test.com',
      password: '123',
    });

    expect(sut.user.props.name).toBe('test');
    expect(sut.user.props.email).toBe('test@test.com');
  });

  it('should not be able to create user with same e-mail', async () => {
    const { registerUser } = registerUserTestFactory();

    await registerUser.execute({
      name: 'test',
      email: 'test@test.com',
      password: '123',
    });

    try {
      await registerUser.execute({
        name: 'test',
        email: 'test@test.com',
        password: '123',
      });
    } catch (err) {
      const error = err as Error;
      expect(error.message).toBe('User already exists.');
    }
  });

  it('should be able to automatically assign createdAt to new user', async () => {
    const { registerUser } = registerUserTestFactory();

    const createdAt = new Date();

    const sut = await registerUser.execute({
      name: 'test',
      email: 'test@test.com',
      password: '123',
      createdAt,
    });

    expect(sut.user.props.name).toBe('test');
    expect(sut.user.props.email).toBe('test@test.com');
    expect(sut.user.props.createdAt).toBe(createdAt);
  });

  it('should be able to automatically assign updatedAt to new user', async () => {
    const { registerUser } = registerUserTestFactory();

    const updatedAt = new Date();

    const sut = await registerUser.execute({
      name: 'test',
      email: 'test@test.com',
      password: '123',
      updatedAt,
    });

    expect(sut.user.props.name).toBe('test');
    expect(sut.user.props.email).toBe('test@test.com');
    expect(sut.user.props.updatedAt).toBe(updatedAt);
  });
});
