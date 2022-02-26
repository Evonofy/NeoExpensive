import { FC, useCallback, useEffect } from 'react';
import { createContext } from 'use-context-selector';
import { AxiosError } from 'axios';

import { api } from '../services/api';
import { User, Error } from '../types';
import { useAuthStore } from '../store/auth';
import { recoverUserInformation } from '../services/auth';

type LoginProps = {
  email: string;
  password: string;
};

type RegisterProps = {
  name: string;
  email: string;
  password: string;
};

type LoginResponse = {
  user?: User;
  errors?: Error<'email' | 'password'>[];
};

type RegisterResponse = {
  user?: User;
  errors?: Error<'name' | 'email' | 'password'>[];
};

type ForgotPasswordProps = {
  email: string;
};

type ForgotPasswordResponse = {
  errors?: Error<'email'>[];
};

type AuthContextProps = {
  user: User | null;
  login: (data: LoginProps) => Promise<LoginResponse>;
  register: (data: RegisterProps) => Promise<RegisterResponse>;
  forgotPassword: (data: ForgotPasswordProps) => Promise<ForgotPasswordResponse>;
  logout: () => Promise<void>;
  disconnectAccount: () => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider: FC = ({ children }) => {
  const user = useAuthStore(useCallback((state) => state.user, []));
  const setUser = useAuthStore(useCallback((state) => state.setUser, []));
  const removeUser = useAuthStore(useCallback((state) => state.removeUser, []));

  useEffect(() => {
    const callback = () => {
      const accessTokenExists = localStorage.getItem('@neo:access');
      const refreshTokenExists = localStorage.getItem('@neo:refresh');

      if (!accessTokenExists || !refreshTokenExists) {
        removeUser();
      }
    };

    window.addEventListener('storage', callback);

    return () => {
      window.removeEventListener('storage', callback);
    };
  }, [removeUser]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('@neo:access');
      (api.defaults.headers as any)['authorization'] = `bearer ${token}`;

      if (token !== null) {
        recoverUserInformation().then(async ({ user, error }) => {
          if (error) {
            console.log('error');
            // // eslint-disable-next-line camelcase
            // const refresh_token = localStorage.getItem('@neo:refresh');
            // // refresh token
            // try {
            //   // eslint-disable-next-line camelcase
            //   const { data } = await api.post<{ refreshToken: string; accessToken: string }>('/users/refresh-token', {
            //     // eslint-disable-next-line camelcase
            //     refresh_token,
            //   });
            //   const { refreshToken, accessToken } = data;
            //   console.log('token refreshed');

            //   localStorage.setItem('@neo:access', accessToken);
            //   localStorage.setItem('@neo:refresh', refreshToken);

            //   (api.defaults.headers as any)['authorization'] = `bearer ${accessToken}`;

            //   recoverUserInformation();
            // } catch (error) {
            //   console.log(error as AxiosError);
            // }
          }

          user &&
            setUser({
              ...user,
            });
        });
      }
    }
  }, [setUser]);

  const logout = useCallback(async () => {
    localStorage.removeItem('@neo:access');
    localStorage.removeItem('@neo:refresh');

    removeUser();
  }, [removeUser]);

  const register = useCallback(
    async ({ name, email, password }: RegisterProps): Promise<RegisterResponse> => {
      const { registerRequest } = await import('../services/auth');

      const { user, accessToken, refreshToken, errors } = await registerRequest({
        name,
        email,
        password,
      });

      if (errors) {
        return {
          errors,
        };
      }

      if (!user) {
        return {
          errors: [
            {
              field: 'email',
              message: 'Unexpected Error',
            },
          ],
        };
      }

      if (typeof window !== 'undefined') {
        if (accessToken) {
          localStorage.setItem('@neo:access', accessToken);
        }

        if (refreshToken) {
          localStorage.setItem('@neo:refresh', refreshToken);
        }
      }

      (api.defaults.headers as any)['authorization'] = `bearer ${accessToken}`;

      setUser(user);

      return {
        user,
      };
    },
    [setUser]
  );

  const login = useCallback(
    async ({ email, password }: LoginProps): Promise<LoginResponse> => {
      const { loginInRequest } = await import('../services/auth');

      const { user, accessToken, refreshToken, errors } = await loginInRequest({
        email,
        password,
      });

      if (errors) {
        return {
          errors,
        };
      }

      if (!user) {
        return {
          errors: [
            {
              field: 'email',
              message: 'Unexpected Error',
            },
          ],
        };
      }

      if (accessToken) {
        localStorage.setItem('@neo:access', accessToken);
      }

      if (refreshToken) {
        localStorage.setItem('@neo:refresh', refreshToken);
      }

      (api.defaults.headers as any)['authorization'] = `bearer ${accessToken}`;

      setUser(user);

      return {
        user,
      };
    },
    [setUser]
  );

  const forgotPassword = useCallback(async ({ email }: ForgotPasswordProps): Promise<ForgotPasswordResponse> => {
    const { forgotPasswordRequest } = await import('../services/auth');

    const { accessToken, errors } = await forgotPasswordRequest({
      email,
    });

    if (errors) {
      return {
        errors,
      };
    }

    if (typeof window !== 'undefined') {
      if (accessToken) {
        localStorage.setItem('@neo:access', accessToken);
      }
    }

    return {
      errors: [],
    };
  }, []);

  const githubSignIn = useCallback(
    async (code: string) => {
      type GithubOAuthAPIResponse = {
        user: User;
        accessToken: string;
        refreshToken: string;
      };

      try {
        const { data } = await api.post<GithubOAuthAPIResponse>('/users/authenticate/github', {
          code,
        });

        const { accessToken, user, refreshToken } = data;

        if (accessToken) {
          localStorage.setItem('@neo:access', accessToken);
          api.defaults.headers.common.authorization = `bearer ${accessToken}`;
        }

        if (refreshToken) {
          localStorage.setItem('@neo:refresh', refreshToken);
        }

        if (user) {
          setUser(user);
        }
      } catch (error) {
        console.log((error as AxiosError).response);
      }
    },
    [setUser]
  );

  const disconnectAccount = useCallback(async () => {
    const { data } = await api.post<{ accessToken: string }>('/users/disconnect', {
      refresh_token: localStorage.getItem('@neo:refresh'),
    });

    const { accessToken } = data;

    localStorage.setItem('@neo:access', accessToken);

    (api.defaults.headers as any)['authorization'] = `bearer ${accessToken}`;
  }, []);

  useEffect(() => {
    const url = window.location.href;
    const hasGithubCode = url.includes('?code=');

    if (hasGithubCode) {
      const [urlWithoutCode, githubCode] = url.split('?code=');

      window.history.pushState({}, '', urlWithoutCode);
      if (githubCode) {
        githubSignIn(githubCode);
      }
    }
  });

  return <AuthContext.Provider value={{ user, login, logout, register, forgotPassword, disconnectAccount }}>{children}</AuthContext.Provider>;
};
