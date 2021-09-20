import { CreateUserRequestDTO, CreateUserResponseDTO } from './CreateUserDTO';

import { IUsersRepository } from '@user/repositories';
import { IQueueService } from '@user/services/queue';
import { ActivateTokenProvider } from '@user/providers';

import { User } from '@user/entities';

export class CreateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private queueService: IQueueService,
    private activateTokenProvider: ActivateTokenProvider,
    private user: User
  ) {}

  async execute(data: CreateUserRequestDTO): Promise<CreateUserResponseDTO> {
    let { name, email, password } = data;

    /* verifies if the e-mail is valid */
    const isValidEmail = this.user.isValidEmail(email);

    if (!isValidEmail) {
      throw new Error('This e-mail is not valid.');
    }

    /* checks if the user already exists */
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new Error('User already exists.');
    }

    /* create user entity */
    const user = new User({
      name,
      email,
      password
    });

    /* create token entity */
    const token = await this.activateTokenProvider.execute({ user }, user.id);

    /* send an e-mail to the user */
    await this.queueService.add('RegistrationMail', {
      data: {
        name,
        email,
        token
      }
    });

    return {
      message:
        'Just 1 step for full account activation. Activate your account with the token below.',
      activate_token: token
    };
  }
}
