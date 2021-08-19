import { CreateUserRequestDTO, CreateUserResponseDTO } from './CreateUserDTO';
import { IUsersRepository } from '@user/repositories';

import { User } from '@user/entities';

export class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    name,
    email,
    password
  }: CreateUserRequestDTO): Promise<CreateUserResponseDTO> {
    const user = new User({
      name,
      email,
      password
    });

    // await this.usersRepository.save(user);

    return {
      user
    };
  }
}
