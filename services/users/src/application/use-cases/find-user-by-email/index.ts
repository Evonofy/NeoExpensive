import { UsersRepository } from '../../repositories/UsersRepository';
type FindUserByEmailProps = {
  email: string;
};

export class FindUserByEmail {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({ email }: FindUserByEmailProps) {
    /**
     * @todo
     * 1. send an email to the user with an access token
     */
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new Error('Could not find a user with that e-mail.');
    }

    return {
      user,
    };
  }
}
