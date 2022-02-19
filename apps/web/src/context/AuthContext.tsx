import { FC, useCallback } from 'react';
import { createContext } from 'use-context-selector';

import { User, Error } from '../types';
import { useAuthStore } from '../store/auth';
import { loginInRequest } from '../services/auth';

type LoginProps = {
  email: string;
  password: string;
};

type LoginResponse = {
  user?: User;
  errors?: Error[];
};

type AuthContextProps = {
  user: User;
  login: (data: LoginProps) => Promise<LoginResponse>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider: FC = ({ children }) => {
  const user = useAuthStore(useCallback((state) => state.user, []));
  const setUser = useAuthStore(useCallback((state) => state.setUser, []));
  const removeUser = useAuthStore(useCallback((state) => state.removeUser, []));

  const logout = useCallback(async () => {
    removeUser();
  }, [removeUser]);

  const login = useCallback(
    async ({ email, password }: LoginProps): Promise<LoginResponse> => {
      const { user, errors } = await loginInRequest({
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

      setUser(user);
      return {
        user,
      };
    },
    [setUser]
  );

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};
