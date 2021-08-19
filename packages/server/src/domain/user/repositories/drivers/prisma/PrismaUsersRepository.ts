import { PrismaClient } from '@infra/prisma';

import { UserRequest, UserResponse } from '../../IUsersRepositoryDTO';
import { IUsersRepository } from '@user/repositories';

export class PrismaUsersRepository implements IUsersRepository {
  constructor(private prismaClient: PrismaClient) {}

  async findByEmail(email: string): Promise<UserResponse> {
    const user = await this.prismaClient.user.findUnique({
      where: {
        email
      }
    });

    return user;
  }

  async save(user: UserRequest): Promise<void> {
    await this.prismaClient.user.create({
      data: {
        ...user
      }
    });
  }
}
