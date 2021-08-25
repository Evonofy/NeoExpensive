import { AuthUserRequestDTO, AuthUserResponseDTO } from './AuthUserDTO';

import { IUsersRepository, IRefreshTokenRepository } from '@user/repositories';
import { RefreshTokenProvider, AccessTokenProvider } from '@user/providers';
import { User as UserORM } from '@infra/prisma';
import { User } from '@user/entities';
import { Payload } from '../ActivateUser/ActivateUserUseCase';

export class AuthUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private refreshTokenRepository: IRefreshTokenRepository,
    private refreshTokenProvider: RefreshTokenProvider,
    private accessTokenProvider: AccessTokenProvider,
    private user: User
  ) {}

  async userExists(login: string) {
    let user: UserORM;

    user = await this.usersRepository.findByLogin('email', login);

    if (!!user === false) {
      user = await this.usersRepository.findByLogin('username', login);
    }

    return user;
  }

  async loginToken(data: string) {
    if (!!data === false) {
      throw new Error('Please supply a jwt token.');
    }

    const authHeader = data.split(' ')[1];

    if (!authHeader) {
      throw new Error('Your token must have the Bearer prefix.');
    }

    const { id } = this.accessTokenProvider.validate(authHeader) as Payload;
    const tokenUser = await this.usersRepository.findById(id);

    return tokenUser;
  }

  async signInLogin(login: string, password: string) {
    /* login via email & username */
    const loginUser = await this.userExists(login);

    const comparePassword = await this.user.comparePassword(
      password,
      loginUser.password
    );

    if (!comparePassword) {
      /* can't tell client whether it missed the login
      or the password because people can bruteforce it */
      throw new Error('Wrong credentials.');
    }

    return loginUser;
  }

  async execute(data: AuthUserRequestDTO): Promise<AuthUserResponseDTO> {
    const { login, password, token } = data;

    let user: UserORM;

    /* accept login via access_token */
    if (!!token === true) {
      user = await this.loginToken(token);
    } else {
      user = await this.signInLogin(login, password);
    }

    /* delete all refresh tokens */
    await this.refreshTokenRepository.clean();

    if (!user) {
      throw new Error('Wrong credentials.');
    }

    const { refreshToken } = await this.refreshTokenProvider.execute(user.id);
    const { accessToken } = await this.accessTokenProvider.execute({
      id: user.id
    });

    /* remove password from final response */
    delete user.password;

    return {
      message: 'User authenticated with success!',
      user,
      accessToken,
      refreshToken
    };
  }
}
