import { UserRequest, UserResponse } from './IUsersRepositoryDTO';

export interface IUsersRepository {
  save: (user: UserRequest) => Promise<void>;
  findById: (id: string) => Promise<UserResponse>;
  findByEmail: (email: string) => Promise<UserResponse>;
}
