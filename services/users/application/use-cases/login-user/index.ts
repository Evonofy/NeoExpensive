import { UsersRepository } from '../../repositories/UsersRepository';

import { compare } from 'bcrypt';

export type LoginUserProps = {
  email: string;
  password: string;
};

export class LoginUser {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ email, password }: LoginUserProps) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new Error('Could not find a user with this e-mail.');
    }

    const comaparePasswords = await compare(password, user.props.password);

    if (!comaparePasswords) {
      throw new Error('Invalid password.');
    }

    return {
      user,
    };
  }
}
