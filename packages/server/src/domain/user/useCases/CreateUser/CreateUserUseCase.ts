import { CreateUserRequestDTO, CreateUserResponseDTO } from './CreateUserDTO';

import { IUsersRepository } from '@user/repositories';
import { IQueueService } from '@user/services/queue';

import { User, Token } from '@user/entities';

export class CreateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private queueService: IQueueService,
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

    /* chekcs if the user already exists */
    await this.userAlreadyExists(email);

    /* create user entity */
    const user = new User({
      name,
      email,
      password
    });

    /* create token entity */
    const token = new Token({
      type: 'access',
      payload: { user },
      expiresIn: '15m'
    });

    /* send an e-mail to the user */
    this.queueService.add('RegistrationMail', {
      data: {
        name,
        email,
        token
      }
    });

    return {
      message: 'Activate your account.',
      token
    };
  }
}
