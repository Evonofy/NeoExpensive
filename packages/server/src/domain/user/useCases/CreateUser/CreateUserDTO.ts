export interface CreateUserRequestDTO {
  name: string;
  email: string;
  password: string;
}

export interface CreateUserResponseDTO {
  user: CreateUserRequestDTO;
}
