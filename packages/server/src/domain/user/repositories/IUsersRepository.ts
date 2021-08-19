import { UserRequest, UserResponse } from './IUsersRepositoryDTO';

export interface IUsersRepository {
  save: (user: UserRequest) => Promise<void>;
  findByEmail: (email: string) => Promise<UserResponse>;
}
