import { FC, useCallback } from 'react';
import { createContext } from 'use-context-selector';

import { User, Error } from '../types';
import { useAuthStore } from '../store/auth';
import { loginInRequest, registerRequest } from '../services/auth';

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

type AuthContextProps = {
  user: User;
  login: (data: LoginProps) => Promise<LoginResponse>;
  register: (data: RegisterProps) => Promise<RegisterResponse>;
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

  const register = useCallback(
    async ({ name, email, password }: RegisterProps): Promise<RegisterResponse> => {
      const { user, errors } = await registerRequest({
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

      setUser(user);

      return {
        user,
      };
    },
    [setUser]
  );

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

  return <AuthContext.Provider value={{ user, login, logout, register }}>{children}</AuthContext.Provider>;
};
