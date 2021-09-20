import {
  ActivateUserRequestDTO,
  ActivateUserResponseDTO
} from './ActivateUserDTO';

import { AccessTokenProvider, ActivateTokenProvider } from '@user/providers';
import { IUsersRepository } from '@user/repositories';
import { IQueueService } from '@user/services/queue';

import { User } from '@user/entities';
import { useToken } from '@user/hooks';

export class ActivateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private activateTokenProvider: ActivateTokenProvider,
    private accessTokenProvider: AccessTokenProvider,
    private queueService: IQueueService
  ) {}

  async execute(
    data: ActivateUserRequestDTO
  ): Promise<ActivateUserResponseDTO> {
    const { header, queryToken } = data;

    let token = '';

    /* decides if it uses the token from the url query or the authorization header */
    if (queryToken) {
      token = queryToken;
    } else {
      token = useToken(header);
    }

    /* checks if the token has the correct signature */
    const { user: payload } = this.activateTokenProvider.validate(token);
    const { id, ...userProps } = payload;

    const userAlreadyExists = await this.usersRepository.findById(id);

    /* Double check for existing users. */
    if (userAlreadyExists) {
      throw new Error('This user already exists.');
    }

    let user = new User(userProps, {
      id,
      isHashed: true
    });

    await this.usersRepository.save(user);

    delete user.password;

    const { accessToken } = await this.accessTokenProvider.execute({ id });

    await this.queueService.add('ActivationMail', {
      data: {
        name: user.name,
        email: user.email
      }
    });

    return {
      message: 'Your account was fully activated!',
      accessToken,
      user
    };
  }
}
