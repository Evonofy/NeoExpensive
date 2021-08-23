import { Token } from '@user/entities';

export interface CreateUserRequestDTO {
  name: string;
  email: string;
  password: string;
}

export interface CreateUserResponseDTO {
  message: string;
  token: Token;
}
