import React, { useCallback } from 'react';
import { createContext } from 'use-context-selector';

import { User, FieldError } from '@src/types/auth';
import { useAuthStore } from '@store/auth';

import { ILoginUserRequest, loginUserRequest } from '@services/auth/login-user';

type AuthContextProps = {
  user: User | null;

  login(data: ILoginUserRequest): Promise<{ errors?: FieldError<'login' | 'password'>[] }>;
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider: React.FC = ({ children }) => {
  const { user, setUser } = useAuthStore();

  const login = useCallback(
    async ({ login, password }: ILoginUserRequest) => {
      const { error, user, accessToken, refreshToken } = await loginUserRequest({
        login,
        password,
      });

      if (error) {
        return {
          errors: [error],
        };
      }

      if (accessToken) {
        localStorage.setItem('@neo:access', accessToken);
      }

      if (refreshToken) {
        localStorage.setItem('@neo:refresh', refreshToken);
      }

      if (user) {
        setUser(user);
      }

      return {};
    },
    [setUser]
  );

  return <AuthContext.Provider value={{ user, login }}>{children}</AuthContext.Provider>;
};
