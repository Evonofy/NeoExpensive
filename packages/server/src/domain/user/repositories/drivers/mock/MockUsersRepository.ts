import { IUsersRepository } from '../../';
import { UserRequest, UserResponse } from '../../IUsersRepositoryDTO';

import { User } from '@user/entities';

export class MockUsersRepository implements IUsersRepository {
  private users: User[] = [];

  async findByEmail(email: string): Promise<UserResponse> {
    const user = this.users.find(user => user.email === email);

    return user;
  }

  async save(user: UserRequest): Promise<void> {
    this.users.push(user);
  }
}
