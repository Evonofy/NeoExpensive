import { AuthUserRequestDTO, AuthUserResponseDTO } from './AuthUserDTO';

import { IUsersRepository } from '@user/repositories';
import { User as UserORM } from '@infra/prisma';
import { User } from '@user/entities';

export class AuthUserUseCase {
  constructor(private usersRepository: IUsersRepository, private user: User) {}

  async userExists(login: string) {
    let user: UserORM;

    user = await this.usersRepository.findByLogin('email', login);

    if (!!user === false) {
      user = await this.usersRepository.findByLogin('username', login);
    }

    if (!user) {
      /* can't tell client whether it missed the login
      or the password because people can bruteforce it */
      throw new Error('Wrong credentials.');
    }

    return user;
  }

  async execute(data: AuthUserRequestDTO): Promise<AuthUserResponseDTO> {
    const { login, password } = data;

    /* login via email & username */
    const user = await this.userExists(login);

    const comparePassword = await this.user.comparePassword(
      password,
      user.password
    );

    if (!comparePassword) {
      /* can't tell client whether it missed the login
      or the password because people can bruteforce it */
      throw new Error('Wrong credentials.');
    }

    /* remove password from final response */
    delete user.password;

    return {
      message: 'User authenticated with success!',
      user
    };
  }
}
