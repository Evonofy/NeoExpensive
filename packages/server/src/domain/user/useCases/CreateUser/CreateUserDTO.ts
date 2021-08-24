import { BaseResponse } from '@infra/http/interface/Response';

export interface CreateUserRequestDTO {
  name: string;
  email: string;
  password: string;
}

export interface CreateUserResponseDTO extends BaseResponse {
  activate_token: string;
}
