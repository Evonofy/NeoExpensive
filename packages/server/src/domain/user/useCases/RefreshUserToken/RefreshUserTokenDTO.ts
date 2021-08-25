import { BaseResponse } from '@infra/http/interface/Response';

import { RefreshToken as RefreshTokenORM } from '@infra/prisma';

export type RefreshTokenUserRequestDTO = {
  refresh_token: string;
};

export interface RefreshTokenUserResponseDTO extends BaseResponse {
  accessToken: string;
  refreshToken?: RefreshTokenORM;
}
