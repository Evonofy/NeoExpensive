import { User, FieldError } from '@src/types/auth';

import { api } from '@services/api';

export type ILoginUserRequest = {
  login: string;
  password: string;
};

type LoginUserResonse = {
  user?: User;
  accessToken?: string;
  refreshToken?: string;
  error?: FieldError<'login' | 'password'>;
};

type LoginUserAPIResponse = {
  user: User;
  accessToken: string;
  refreshToken: string;
};

export async function loginUserRequest({ login, password }: ILoginUserRequest): Promise<LoginUserResonse> {
  try {
    const { data } = await api.post<LoginUserAPIResponse>('/users', {
      login,
      password,
    });

    return {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      user: data.user,
    };
  } catch (error) {
    // handle errors
    return {
      error: {
        field: 'login',
        message: 'Unexpected Error.',
      },
    };
  }
}
