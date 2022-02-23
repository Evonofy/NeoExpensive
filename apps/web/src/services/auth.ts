import { User, Error as _Error } from '../types';
import { api } from './api';
import { AxiosError } from 'axios';
import { userToContextMapper } from 'mappers/userToContextMapper';

type loginInRequestProps = {
  email: string;
  password: string;
};

type loginInRequestResponse = {
  user?: User;
  errors?: _Error<'email' | 'password'>[];
  accessToken?: string;
  refreshToken?: string;
};

export async function loginInRequest({ email, password }: loginInRequestProps): Promise<loginInRequestResponse> {
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
      email,
      password,
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
            field: 'email',
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
          field: 'email',
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
};

type registerRequestResponse = {
  user?: User;
  errors?: _Error<'name' | 'email' | 'password'>[];
  accessToken?: string;
  refreshToken?: string;
};

export async function registerRequest({ name, email, password }: registerRequestProps): Promise<registerRequestResponse> {
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
  token: string;
};

type recoverUserInformationResponse = {
  user?: User;
  error?: 'Expired refresh token.';
};

export async function recoverUserInformation({}: recoverUserInformationProps): Promise<recoverUserInformationResponse> {
  return {
    user: {
      id: '123',
      name: 'vitor',
      email: 'vitor@vitor.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  };
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
