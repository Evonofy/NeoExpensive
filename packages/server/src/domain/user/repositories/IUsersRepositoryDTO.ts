import { User } from '@user/entities';

import { User as UserORM } from '@infra/prisma';

export type UserRequest = User;

export type UserResponse = UserORM;
