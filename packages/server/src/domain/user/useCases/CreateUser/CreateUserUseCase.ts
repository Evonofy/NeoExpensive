import { CreateUserRequestDTO, CreateUserResponseDTO } from './CreateUserDTO';
import { IUsersRepository } from '@user/repositories';

import { IMailService } from '@user/services';

import { User } from '@user/entities';

export class CreateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private mailService: IMailService,
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
    const { email } = data;

    this.validateEmail(email);

    await this.userAlreadyExists(email);

    const user = new User(data);

    await this.usersRepository.save(user);

    const { name } = user;

    await this.mailService.sendMail({
      to: {
        name,
        email
      },
      subject: 'Platform is available!',
      body: 'Welcome to the platform',
      isNoReply: false
    });

    return {
      user
    };
  }
}
