import { User } from '../../domain/entities/user';

export interface UsersRepository {
  findByEmail(id: string): Promise<User | null>;
}
