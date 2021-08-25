import {
  User as UserORM,
  RefreshToken as RefreshTokenORM
} from '@infra/prisma';
import { BaseResponse } from '@infra/http/interface/Response';

export interface AuthUserRequestDTO {
  login: string;
  token?: string;
  password: string;
}

export interface AuthUserResponseDTO extends BaseResponse {
  user: UserORM;
  accessToken: string;
  refreshToken: RefreshTokenORM;
}
