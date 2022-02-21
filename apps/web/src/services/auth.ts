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
};

export async function loginInRequest({ email, password }: loginInRequestProps): Promise<loginInRequestResponse> {
  type APILoginResponse = {
    user: {
      _id: string;
      props: User;
    };
    error: 'Could not find a user with this e-mail.' | 'Invalid password.';
  };

  try {
    const { data } = await api.post<APILoginResponse>('/users/login', {
      email,
      password,
    });

    const { user } = data;

    return {
      user: userToContextMapper(user),
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
};

export async function registerRequest({ name, email, password }: registerRequestProps): Promise<registerRequestResponse> {
  type APIRegisterResponse = {
    user: {
      _id: string;
      props: User;
    };
    error: 'User already exists.';
  };

  try {
    const { data } = await api.post<APIRegisterResponse>('/users/register', {
      name,
      email,
      password,
    });

    const { user } = data;

    return {
      user: userToContextMapper(user),
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
