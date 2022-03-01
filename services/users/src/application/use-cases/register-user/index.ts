import { User } from '../../../domain/entities/user';
import { UsersRepository } from '../../repositories/UsersRepository';

import bcrypt from 'bcrypt';

export type RegisterUserProps = {
  name: string;
  email: string;
  password: string;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
};

export class RegisterUser {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email, password, createdAt, updatedAt }: RegisterUserProps) {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new Error('User already exists.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = User.create({
      name,
      email,
      password: hashedPassword,
      createdAt,
      updatedAt,
    });

    await this.usersRepository.store({
      user,
    });

    return {
      user,
    };
  }
}
