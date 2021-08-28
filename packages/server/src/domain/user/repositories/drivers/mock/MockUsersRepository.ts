import { IUsersRepository } from '../../';
import { UserRequest, UserResponse } from '../../IUsersRepositoryDTO';

import { User } from '@user/entities';

export class MockUsersRepository implements IUsersRepository {
  public users: User[] = [];

  async findByEmail(email: string): Promise<UserResponse> {
    const user = this.users.find(user => user.email === email);

    return user;
  }

  async findById(id: string): Promise<UserResponse> {
    const user = this.users.find(user => user.id === id);

    return user;
  }

  async findByLogin(
    type: 'email' | 'username',
    login: string
  ): Promise<UserResponse> {
    let user: UserResponse;

    user = this.users.find(user => user.email === login);

    if (!!user === false) {
      user = this.users.find(user => user.username === login);
    }

    return user;
  }

  async save(user: UserRequest): Promise<void> {
    this.users.push(user);
  }
}
