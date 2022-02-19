import { User, Error } from '../types';
type loginInRequestProps = {
  email: string;
  password: string;
};

type loginInRequestResponse = {
  user?: User;
  errors?: Error[];
};

export async function loginInRequest({ email, password }: loginInRequestProps): Promise<loginInRequestResponse> {
  if (email !== 'vitor@vitor.com') {
    return {
      errors: [
        {
          field: 'email',
          message: "User doesn't exist.",
        },
      ],
    };
  }

  if (password !== '123') {
    return {
      errors: [
        {
          field: 'password',
          message: 'Invalid password.',
        },
      ],
    };
  }

  return {
    user: {
      name: 'vitor',
      email,
    },
  };
}
