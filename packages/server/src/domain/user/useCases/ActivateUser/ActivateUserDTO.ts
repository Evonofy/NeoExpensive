import { BaseResponse } from '@infra/http/interface/Response';

import { User } from '@user/entities';

export interface ActivateUserRequestDTO {
  header: string;
  query?: string;
}

export interface ActivateUserResponseDTO extends BaseResponse {
  message: string;
  user: User;
  accessToken: string;
}
