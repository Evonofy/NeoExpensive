export interface CreateUserRequestDTO {
  name: string;
  email: string;
  password: string;
}

export interface CreateUserResponseDTO {
  message: string;
  activate_token: string;
}
