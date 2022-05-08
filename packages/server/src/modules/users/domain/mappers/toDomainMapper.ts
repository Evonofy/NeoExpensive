import { User as UserDTO } from '@prisma/client';
import { User } from '@users';

export function toDomainMapper(user: UserDTO): User {
  // prettier-ignore
  const domainUser = User.create({
    ...user,
    password: user.password || "", 
  }, user.id);

  return domainUser;
}
