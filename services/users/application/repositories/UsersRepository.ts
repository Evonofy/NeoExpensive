import { User } from '../../domain/entities/user';

export interface UsersRepository {
  findByEmail(id: string): Promise<User | null>;
  store({ user }: { user: User }): Promise<void>;
  clean(): Promise<void>;
}
