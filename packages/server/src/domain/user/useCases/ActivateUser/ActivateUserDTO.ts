import { User } from '@user/entities';

export type ActivateUserRequestDTO = string;

export interface ActivateUserResponseDTO {
  message: string;
  user: User;
  access_token: string;
}
