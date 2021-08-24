import { User as UserORM } from '@infra/prisma';
import { BaseResponse } from '@infra/http/interface/Response';

export interface AuthUserRequestDTO {
  login: string;
  password: string;
}

export interface AuthUserResponseDTO extends BaseResponse {
  user: UserORM;
}
