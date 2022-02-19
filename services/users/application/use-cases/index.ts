import { InMemoryUsersRepository } from '../repositories/drivers/tests/in-memory-users-repository';
import { RegisterUser, RegisterUserProps } from './register-user';

const usersRepository = new InMemoryUsersRepository();

export const user = {
  register: (props: RegisterUserProps) => new RegisterUser(usersRepository).execute(props),
};
