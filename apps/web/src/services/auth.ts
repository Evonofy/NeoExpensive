import { User, Error as _Error } from '../types';
import { api } from './api';
import { AxiosError } from 'axios';
import { userToContextMapper } from 'mappers/userToContextMapper';

type loginInRequestProps = {
  login: string;
  password: string;
  platform: string;
  language: string;
};

type loginInRequestResponse = {
  user?: User;
  errors?: _Error<'login' | 'password'>[];
  accessToken?: string;
  refreshToken?: string;
};

export async function loginInRequest({ login, password, language, platform }: loginInRequestProps): Promise<loginInRequestResponse> {
  type APILoginResponse = {
    user: {
      _id: string;
      props: User;
    };
    accessToken: string;
    refreshToken: string;
    error: 'Could not find a user with this e-mail.' | 'Invalid password.';
  };

  try {
    const { data } = await api.post<APILoginResponse>('/users/login', {
      login,
      password,
      language,
      platform,
    });

    const { user, accessToken, refreshToken } = data;

    return {
      user: userToContextMapper(user),
      accessToken,
      refreshToken,
    };
  } catch (err) {
    const { response } = err as AxiosError<APILoginResponse>;

    const { error } = response?.data!;
    if (error === 'Could not find a user with this e-mail.') {
      return {
        errors: [
          {
            field: 'login',
            message: error,
          },
        ],
      };
    } else if (error === 'Invalid password.') {
      return {
        errors: [
          {
            field: 'password',
            message: error,
          },
        ],
      };
    }

    return {
      errors: [
        {
          field: 'login',
          message: 'Unexpected error.',
        },
      ],
    };
  }
}

type registerRequestProps = {
  name: string;
  email: string;
  password: string;
  language: string;
  platform: string;
  username: string;
};

type registerRequestResponse = {
  user?: User;
  errors?: _Error<'name' | 'email' | 'password'>[];
  accessToken?: string;
  refreshToken?: string;
};

export async function registerRequest({ name, email, password, language, platform, username }: registerRequestProps): Promise<registerRequestResponse> {
  type APIRegisterResponse = {
    user: {
      _id: string;
      props: User;
    };
    accessToken: string;
    refreshToken: string;
    error: 'User already exists.';
  };

  try {
    const { data } = await api.post<APIRegisterResponse>('/users/register', {
      name,
      email,
      password,
      language,
      platform,
      username,
    });

    const { user, accessToken, refreshToken } = data;

    return {
      user: userToContextMapper(user),
      accessToken,
      refreshToken,
    };
  } catch (err) {
    const { response } = err as AxiosError<APIRegisterResponse>;

    return {
      errors: [
        {
          field: 'email',
          message: response?.data.error!,
        },
      ],
    };
  }
}

type recoverUserInformationProps = {
  id: string;
};

type recoverUserInformationResponse = {
  user?: User;
  error?: 'Expired refresh token.';
};

export async function recoverUserInformation({ id }: recoverUserInformationProps): Promise<recoverUserInformationResponse> {
  try {
    const { data } = await api.get<{ user: User }>(`/users/${id}`);
    const { user } = data;

    return {
      user,
    };
  } catch (error) {
    return {
      error: 'Expired refresh token.',
    };
  }
}

type forgotPasswordInformationProps = {
  email: string;
};

type forgotPasswordInformationResponse = {
  accessToken?: string;
  errors?: _Error<'email'>[];
};

export async function forgotPasswordRequest({ email }: forgotPasswordInformationProps): Promise<forgotPasswordInformationResponse> {
  try {
    type APIForgotPasswordResponse = {
      accessToken: string;
    };

    const { data } = await api.post<APIForgotPasswordResponse>('/users/forgot-password', {
      email,
    });

    const { accessToken } = data;

    return {
      accessToken,
    };
  } catch (error) {
    return {
      errors: [
        {
          field: 'email',
          message: 'Unexpected error.',
        },
      ],
    };
  }
}

type setNewPasswordProps = {
  accessToken: string;
  password: string;
};

type setNewPasswordResponse = {
  errors?: _Error<'password'>[];
};

export async function setNewPasswordRequest({ accessToken, password }: setNewPasswordProps): Promise<setNewPasswordResponse> {
  try {
    await api.post('/users/set-new-password', {
      accessToken,
      password,
    });

    return {};
  } catch (error) {
    return {
      errors: [
        {
          field: 'password',
          message: 'Unexpected error.',
        },
      ],
    };
  }
}
