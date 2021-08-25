import {
  ActivateUserRequestDTO,
  ActivateUserResponseDTO
} from './ActivateUserDTO';

import { AccessTokenProvider, ActivateTokenProvider } from '@user/providers';
import { IUsersRepository } from '@user/repositories';
import { User } from '@user/entities';
import { JwtPayload } from 'jsonwebtoken';

export interface Payload extends JwtPayload {
  payload: {
    name: string;
    email: string;
    password: string;
    id: string;
    created_at: Date;
    updated_at: Date;
  };
}

export class ActivateUserUseCase {
  constructor(
    private activateTokenProvider: ActivateTokenProvider,
    private accessTokenProvider: AccessTokenProvider,
    private usersRepository: IUsersRepository
  ) {}

  getAuthHeader(data: string) {
    if (!!data === false) {
      throw new Error('Please supply a jwt token.');
    }

    const authHeader = data.split(' ')[1];

    if (!authHeader) {
      throw new Error('Your token must have the Bearer prefix.');
    }

    return authHeader;
  }

  async execute(
    data: ActivateUserRequestDTO
  ): Promise<ActivateUserResponseDTO> {
    const token = this.getAuthHeader(data);

    /* checks if the token has the correct signature */
    const { payload } = this.activateTokenProvider.validate(token) as Payload;
    let { id, created_at, ...rest } = payload;

    delete payload.updated_at;

    const userAlreadyExists = await this.usersRepository.findById(id);

    /* Double check for existing users. */
    if (userAlreadyExists) {
      throw new Error('This user already exists.');
    }

    let user = new User(rest, {
      id,
      created_at,
      isHashed: true
    });

    await this.usersRepository.save(user);
    delete user.password;

    const { accessToken } = await this.accessTokenProvider.execute({ id });

    return {
      message: 'Your account was fully activated!',
      accessToken,
      user
    };
  }
}
