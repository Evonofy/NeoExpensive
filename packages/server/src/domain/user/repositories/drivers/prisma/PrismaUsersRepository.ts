import { PrismaClient } from '@infra/prisma';

import { User } from '@user/entities';
import { IUsersRepository } from '@user/repositories';

export class PrismaUsersRepository implements IUsersRepository {
  constructor(private prismaClient: PrismaClient) {}

  async save(user: User): Promise<void> {
    await this.prismaClient.user.create({
      data: {
        ...user
      }
    });
  }
}
