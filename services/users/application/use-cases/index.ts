import { RegisterUser } from './register-user';
import { LoginUser } from './login-user';
import { FindUserByEmail } from './find-user-by-email';

export const user = {
  register: RegisterUser,
  login: LoginUser,
  findByEmail: FindUserByEmail,
};
