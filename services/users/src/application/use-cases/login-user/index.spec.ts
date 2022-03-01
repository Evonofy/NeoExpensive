import { InMemoryUsersRepository } from './../../repositories/drivers/tests/in-memory-users-repository';
import { LoginUser } from './';
import { RegisterUser } from '../register-user';

const usersRepository = new InMemoryUsersRepository();

beforeEach(async () => {
  await usersRepository.clean();
});

const loginUserTestFactory = async () => {
  const registerUser = new RegisterUser(usersRepository);

  const loginUser = new LoginUser(usersRepository);

  const { user } = await registerUser.execute({
    name: 'test',
    email: 'test@test.com',
    password: '123',
  });

  return {
    user,
    loginUser,
  };
};

describe('Login User', () => {
  it('should login user with right password', async () => {
    const { user, loginUser } = await loginUserTestFactory();

    const sut = await loginUser.execute({
      email: 'test@test.com',
      password: '123',
    });

    expect(sut.user.id).toBe(user.id);
    expect(sut.user.props.password).toBe(user.props.password);
  });

  it('shold not be able to find non-existing user', async () => {
    const { loginUser } = await loginUserTestFactory();

    try {
      await loginUser.execute({
        email: 'this@doestnotexist.com',
        password: '123',
      });
    } catch (err) {
      const error = err as Error;
      expect(error.message).toBe('Could not find a user with this e-mail.');
    }
  });

  it('should not login user with wrong password', async () => {
    const { loginUser } = await loginUserTestFactory();

    try {
      await loginUser.execute({
        email: 'test@test.com',
        password: '125',
      });
    } catch (err) {
      const error = err as Error;
      expect(error.message).toBe('Invalid password.');
    }
  });
});
