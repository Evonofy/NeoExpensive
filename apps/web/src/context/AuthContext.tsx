/* eslint-disable camelcase */
import { FC, useCallback, useEffect } from 'react';
import { createContext } from 'use-context-selector';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { parseCookies, destroyCookie, setCookie } from 'nookies';

import { api } from '../services/api';
import { User, Error } from '../types';
import { useAuthStore } from '../store/auth';

export const accessTokenExpireTime = 1000 * 60 * 5; // 5 min
export const refreshTokenExpireTime = 1000 * 60 * 60 * 24 * 3; // 3 days

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
  const { query } = useRouter();

  const user = useAuthStore(useCallback((state) => state.user, []));
  const setUser = useAuthStore(useCallback((state) => state.setUser, []));
  const removeUser = useAuthStore(useCallback((state) => state.removeUser, []));

  useEffect(() => {
    const callback = () => {
      const { '@neo:access': accessToken, '@neo:refresh': refreshToken } = parseCookies();

      if (!accessToken || !refreshToken) {
        removeUser();
      }
    };

    window.addEventListener('storage', callback);

    return () => {
      window.removeEventListener('storage', callback);
    };
  }, [removeUser]);

  const fetchUser = useCallback(async () => {
    try {
      const { data: profile } = await api.post<{ id: string }>('/users/profile');

      const { data: user } = await api.get<User>(`/users/${profile.id}`);

      setUser(user);
    } catch (error) {
      const { response } = error as AxiosError;

      if (response?.data.error === 'jwt expired') {
        const { '@neo:refresh': token } = parseCookies();

        const { data } = await api.post<{ accessToken: string; refreshToken?: string }>('/auth/refresh-token', {
          refresh_token: token,
        });

        const { accessToken, refreshToken } = data;

        setCookie(undefined, '@neo:access', accessToken, {
          maxAge: accessTokenExpireTime,
        });

        if (refreshToken) {
          setCookie(undefined, '@neo:refresh', refreshToken, {
            maxAge: refreshTokenExpireTime,
          });
        }

        (api.defaults.headers as any)['authorization'] = `bearer ${accessToken}`;
        const profile = await api.post('/users/profile');

        const { data: user } = await api.get<User>(`/users/${profile.data.id}`);

        setUser(user);
      }
    }
  }, [setUser]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const { '@neo:access': token } = parseCookies();

      if (token) {
        (api.defaults.headers as any)['authorization'] = `bearer ${token}`;

        fetchUser();
      }
    }
  }, [fetchUser]);

  const logout = useCallback(async () => {
    destroyCookie(undefined, '@neo:access');
    destroyCookie(undefined, '@neo:refresh');

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

      if (accessToken) {
        setCookie(undefined, '@neo:access', accessToken, {
          maxAge: accessTokenExpireTime,
        });
      }

      if (refreshToken) {
        setCookie(undefined, '@neo:refresh', refreshToken, {
          maxAge: refreshTokenExpireTime,
        });
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
        setCookie(undefined, '@neo:access', accessToken, {
          maxAge: accessTokenExpireTime,
        });
      }

      if (refreshToken) {
        setCookie(undefined, '@neo:refresh', refreshToken, {
          maxAge: refreshTokenExpireTime,
        });
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

    if (accessToken) {
      setCookie(undefined, '@neo:refresh', accessToken, {
        maxAge: accessTokenExpireTime,
      });
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
          platform: navigator.platform || navigator.userAgentData.platform,
        });

        const { accessToken, user, refreshToken } = data;

        setCookie(undefined, '@neo:access', accessToken, {
          maxAge: accessTokenExpireTime,
        });

        setCookie(undefined, '@neo:refresh', refreshToken, {
          maxAge: refreshTokenExpireTime,
        });

        (api.defaults.headers as any)['authorization'] = `bearer ${accessToken}`;

        if (user) {
          setUser(user);
        }
      } catch (error) {
        console.log('failed to login with neo');
      }
    },
    [setUser]
  );

  const neoSignIn = useCallback(
    async (code: string) => {
      try {
        type NeoOAuthAPIResponse = {
          user: User;
          accessToken: string;
          refreshToken: string;
        };

        const { data } = await api.post<NeoOAuthAPIResponse>('/users/authenticate/neo', {
          code,
          platform: navigator.platform || navigator.userAgentData.platform,
        });

        const { accessToken, user, refreshToken } = data;

        setCookie(undefined, '@neo:access', accessToken, {
          maxAge: accessTokenExpireTime,
        });

        setCookie(undefined, '@neo:refresh', refreshToken, {
          maxAge: refreshTokenExpireTime,
        });

        (api.defaults.headers as any)['authorization'] = `bearer ${accessToken}`;

        if (user) {
          setUser(user);
        }
      } catch (error) {
        console.log('failed to login with neo');
        console.log((error as AxiosError)?.response?.data);
      }
    },
    [setUser]
  );

  const disconnectAccount = useCallback(async () => {
    const { '@neo:refresh': token } = parseCookies();

    const { data } = await api.post<{ accessToken: string }>('/users/disconnect', {
      refresh_token: token,
    });

    const { accessToken } = data;

    setCookie(undefined, '@neo:access', accessToken, {
      maxAge: accessTokenExpireTime,
    });
    (api.defaults.headers as any)['authorization'] = `bearer ${accessToken}`;
  }, []);

  useEffect(() => {
    const url = window.location.href;
    const hasOAuthCode = url.includes('?code=');

    if (hasOAuthCode) {
      const [urlWithoutCode, OAuthCode] = url.split('?code=');
      const { code, provider } = query;

      window.history.pushState({}, '', urlWithoutCode);
      if (OAuthCode) {
        if (provider === 'github') {
          githubSignIn(code as string);
        } else if (provider === 'neo') {
          neoSignIn(code as string);
        }
      }
    }
  });

  return <AuthContext.Provider value={{ user, login, logout, register, forgotPassword, disconnectAccount }}>{children}</AuthContext.Provider>;
};
