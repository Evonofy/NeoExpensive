import { v4 as uuid } from 'uuid';
import { User, FieldError } from '@src/types/auth';

export type IRegisterUserRequest = {
  name: string;
  email: string;
  password: string;

  cpf: string;
  birthDate: string;
};

type RegisterUserResonse = {
  user?: User;
  error?: FieldError<'name' | 'email'>;
};

export async function registerRequest({ name, email, password, birthDate, cpf }: IRegisterUserRequest): Promise<RegisterUserResonse> {
  try {
    return {
      user: {
        id: uuid(),
        name,
        email,
        birthDate,
        cpf,
        password,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    };
  } catch (error) {
    console.log((error as Error).message);
    console.log((error as Error).name);
    // handle errors
    return {
      error: {
        field: 'name',
        message: 'Unexpected Error.',
      },
    };
  }
}
