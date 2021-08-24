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

  validateEmail(email: string) {
    /* checks if the current e-mail is valid */
    if (!this.user.isValidEmail(email)) {
      throw new Error('This e-mail is not valid.');
    }
  }

  async userAlreadyExists(email: string) {
    /* checks if the user already exists */
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new Error('User already exists.');
    }
  }

  async execute(data: CreateUserRequestDTO): Promise<CreateUserResponseDTO> {
    let { name, email, password } = data;

    /* verifies if the e-mail is valid */
    this.validateEmail(email);

    /* checks if the user already exists */
    await this.userAlreadyExists(email);

    /* create user entity */
    const user = new User({
      name,
      email,
      password
    });

    /* create token entity */
    const token = await this.activateTokenProvider.execute(user, user.id);

    /* send an e-mail to the user */
    this.queueService.add('RegistrationMail', {
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
