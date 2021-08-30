import { BaseResponse } from '@infra/http/interface/Response';

export type RevokeUserRefreshTokenRequestDTO = {
  userId: string;
};

export interface RevokeUserRefreshTokenResponseDTO extends BaseResponse {}
