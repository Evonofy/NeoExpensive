import { User } from '@user/entities';

export interface IUsersRepository {
  save: (user: User) => Promise<void>;
}
