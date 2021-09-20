import { UserRequest, UserResponse } from '../../IUsersRepositoryDTO';
import { IUsersRepository } from '../../IUsersRepository';

import { PrismaClient } from '@infra/prisma';

export class PrismaUsersRepository implements IUsersRepository {
  constructor(private client: PrismaClient) {}

  findByEmail = async (email: string): Promise<UserResponse> => {
    return await this.client.user.findUnique({
      where: {
        email
      }
    });
  };

  findById = async (id: string): Promise<UserResponse> => {
    return await this.client.user.findUnique({
      where: {
        id
      }
    });
  };

  findByLogin = async (
    type: 'email' | 'username',
    login: string
  ): Promise<UserResponse> => {
    return await this.client.user.findUnique({
      where: {
        [type]: login
      }
    });
  };

  save = async (user: UserRequest): Promise<void> => {
    await this.client.user.create({
      data: {
        ...user
      }
    });
  };
}
