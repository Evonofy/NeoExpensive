import { BaseResponse } from '@infra/http/interface/Response';
import { User } from '@user/entities';

export interface ActivateUserRequestDTO {
  header: string;
  queryToken?: string;
}

export interface ActivateUserResponseDTO extends BaseResponse {
  message: string;
  user: User;
  accessToken: string;
}
