import { CreateUserRequestDTO, CreateUserResponseDTO } from './CreateUserDTO';
import { IUsersRepository } from '@user/repositories';

import { User } from '@user/entities';

export class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository, private user: User) {}

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
      console.log('a');
      throw new Error('User already exists.');
    }
  }

  async execute(data: CreateUserRequestDTO): Promise<CreateUserResponseDTO> {
    const { email } = data;

    this.validateEmail(email);

    await this.userAlreadyExists(email);

    const user = new User(data);

    await this.usersRepository.save(user);

    return {
      user
    };
  }
}
