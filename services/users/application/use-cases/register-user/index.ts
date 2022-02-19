import { User } from '../../../domain/entities/user';
import { UsersRepository } from '../../repositories/UsersRepository';

export type RegisterUserProps = {
  name: string;
  email: string;
};

export class RegisterUser {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email }: RegisterUserProps) {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new Error('User already exists.');
    }

    const user = User.create({
      name,
      email,
    });

    return {
      user,
    };
  }
}
