import { BaseResponse } from '@infra/http/interface/Response';

export type RefreshTokenUserRequestDTO = {
  refresh_token: string;
};

export interface RefreshTokenUserResponseDTO extends BaseResponse {
  accessToken: string;
}
