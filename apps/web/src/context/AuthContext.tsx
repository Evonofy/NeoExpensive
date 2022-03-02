/* eslint-disable camelcase */
import { FC, useCallback, useEffect } from 'react';
import { createContext, useContext } from 'use-context-selector';
import { AxiosError } from 'axios';

import { StorageContext } from './StorageContext';
import { api } from '../services/api';
import { User, Error } from '../types';
import { useAuthStore } from '../store/auth';

export const accessTokenExpireTime = 1000 * 60 * 5; // 5 min
export const refreshTokenExpireTime = 1000 * 60 * 60 * 24 * 3; // 3 days

type LoginProps = {
  login: string;
  password: string;
};

type RegisterProps = {
  name: string;
  email: string;
  password: string;
  username: string;
};

type LoginResponse = {
  user?: User;
  errors?: Error<'login' | 'password'>[];
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
  const storage = useContext(StorageContext);

  const user = useAuthStore(useCallback((state) => state.user, []));
  const setUser = useAuthStore(useCallback((state) => state.setUser, []));
  const removeUser = useAuthStore(useCallback((state) => state.removeUser, []));

  useEffect(() => {
    const callback = () => {
      const accessToken = storage.get<string>('@neo:access');
      const refreshToken = storage.get<string>('@neo:refresh');

      if (!accessToken || !refreshToken) {
        removeUser();
      }
    };

    window.addEventListener('storage', callback);

    return () => {
      window.removeEventListener('storage', callback);
    };
  }, [removeUser, storage]);

  const fetchUser = useCallback(async () => {
    try {
      const { data: profile } = await api.post<{ id: string }>('/users/profile');

      const { data: user } = await api.get<User>(`/users/${profile.id}`);

      setUser(user);
    } catch (error) {
      const { response } = error as AxiosError;

      if (response?.data.error === 'jwt expired') {
        const token = storage.get<string>('@neo:refresh');

        const { data } = await api.post<{ accessToken: string; refreshToken?: string }>('/auth/refresh-token', {
          refresh_token: token,
        });

        const { accessToken, refreshToken } = data;

        storage.set('@neo:access', accessToken, {
          maxAge: accessTokenExpireTime,
        });

        if (refreshToken) {
          storage.set('@neo:refresh', refreshToken, {
            maxAge: refreshTokenExpireTime,
          });
        }
        console.log('refreshed token');

        (api.defaults.headers as any)['authorization'] = `bearer ${accessToken}`;
        const profile = await api.post('/users/profile');

        const { data: user } = await api.get<User>(`/users/${profile.data.id}`);

        setUser(user);
      }
    }
  }, [setUser, storage]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = storage.get('@neo:access');

      if (token) {
        (api.defaults.headers as any)['authorization'] = `bearer ${token}`;

        fetchUser();
      }
    }
  }, [fetchUser, storage]);

  const logout = useCallback(async () => {
    const token = storage.get('@neo:refresh');

    try {
      const { data: refreshToken } = await api.get<{ id: string }>(`/auth/refresh-token/${token}`);

      // call the api to delete refresh token
      if (refreshToken) {
        await api.delete('/auth/refresh-token', {
          data: {
            id: refreshToken.id,
          },
        });
      }
    } catch (error) {
      console.log((error as AxiosError)?.response?.data);
    }

    storage.remove('@neo:access');
    storage.remove('@neo:refresh');
    storage.remove('@neo:authorization');

    removeUser();
  }, [removeUser, storage]);

  const register = useCallback(
    async ({ name, email, password, username }: RegisterProps): Promise<RegisterResponse> => {
      const { registerRequest } = await import('../services/auth');

      const { user, accessToken, refreshToken, errors } = await registerRequest({
        name,
        email,
        password,
        platform: navigator.platform || navigator.userAgentData.platform,
        language: navigator.language,
        username,
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
        storage.set('@neo:access', accessToken, {
          maxAge: accessTokenExpireTime,
        });
      }

      if (refreshToken) {
        storage.set('@neo:refresh', refreshToken, {
          maxAge: refreshTokenExpireTime,
        });
      }

      (api.defaults.headers as any)['authorization'] = `bearer ${accessToken}`;

      setUser(user);

      return {
        user,
      };
    },
    [setUser, storage]
  );

  const login = useCallback(
    async ({ login, password }: LoginProps): Promise<LoginResponse> => {
      const { loginInRequest } = await import('../services/auth');

      const { user, accessToken, refreshToken, errors } = await loginInRequest({
        login,
        password,
        platform: navigator.platform || navigator.userAgentData.platform,
        language: navigator.language,
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
              field: 'login',
              message: 'Unexpected Error',
            },
          ],
        };
      }

      if (accessToken) {
        storage.set('@neo:access', accessToken, {
          maxAge: accessTokenExpireTime,
        });
      }

      if (refreshToken) {
        storage.set('@neo:refresh', refreshToken, {
          maxAge: refreshTokenExpireTime,
        });
      }

      (api.defaults.headers as any)['authorization'] = `bearer ${accessToken}`;

      setUser(user);

      return {
        user,
      };
    },
    [setUser, storage]
  );

  const forgotPassword = useCallback(
    async ({ email }: ForgotPasswordProps): Promise<ForgotPasswordResponse> => {
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
        storage.set('@neo:access', accessToken, {
          maxAge: accessTokenExpireTime,
        });
      }

      return {
        errors: [],
      };
    },
    [storage]
  );

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
          language: navigator.language,
        });

        const { accessToken, user, refreshToken } = data;

        storage.set('@neo:access', accessToken, {
          maxAge: accessTokenExpireTime,
        });

        storage.set('@neo:refresh', refreshToken, {
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
    [setUser, storage]
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
          language: navigator.language,
        });

        const { accessToken, user, refreshToken } = data;

        storage.set('@neo:access', accessToken, {
          maxAge: accessTokenExpireTime,
        });

        storage.set('@neo:refresh', refreshToken, {
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
    [setUser, storage]
  );

  const disconnectAccount = useCallback(async () => {
    const token = storage.get('@neo:refresh');

    const { data } = await api.post<{ accessToken: string }>('/users/disconnect', {
      refresh_token: token,
    });

    const { accessToken } = data;

    storage.set('@neo:access', accessToken, {
      maxAge: accessTokenExpireTime,
    });
    (api.defaults.headers as any)['authorization'] = `bearer ${accessToken}`;
  }, [storage]);

  useEffect(() => {
    const url = window.location.href;
    const hasOAuthCode = url.includes('?code=');

    if (hasOAuthCode) {
      const [urlWithoutCode, OAuthCode] = url.split('?code=');

      const [code, provider] = OAuthCode?.split('&provider=') as string[];

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
