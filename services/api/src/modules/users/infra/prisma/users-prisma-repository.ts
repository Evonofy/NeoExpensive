import { UsersRepository, User } from '@neo/users';

import { prisma } from '../../../../infra/prisma';
import { toDomainMapper } from '../../domain/mappers/toDomainMapper';

export class usersPrismaRepository implements UsersRepository {
  public async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return null;
    }

    return toDomainMapper(user);
  }

  public async store({ user }: { user: User }): Promise<void> {
    await prisma.user.create({
      data: {
        id: user.id,
        ...user.props,
      },
    });
  }

  public async clean(): Promise<void> {
    prisma.user.deleteMany();
  }
}
