import { RegisterUser } from '.';
import { InMemoryUsersRepository } from '../../repositories/drivers/tests/in-memory-users-repository';

describe('Register User', () => {
  it('should be able to create a new user', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUser = new RegisterUser(usersRepository);

    const sut = await registerUser.execute({
      name: 'test',
      email: 'test@test.com',
    });

    expect(sut.user.props.name).toBe('test');
    expect(sut.user.props.email).toBe('test@test.com');
  });
});
