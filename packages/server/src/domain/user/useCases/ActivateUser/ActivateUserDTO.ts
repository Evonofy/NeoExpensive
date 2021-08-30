import { BaseResponse } from '@infra/http/interface/Response';
import { ParsedQs } from 'qs';
import { User } from '@user/entities';

export interface ActivateUserRequestDTO {
  header: string;
  query?: ParsedQs;
}

export interface ActivateUserResponseDTO extends BaseResponse {
  message: string;
  user: User;
  accessToken: string;
}
