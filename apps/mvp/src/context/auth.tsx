import React, { useCallback, useEffect } from 'react';
import { createContext } from 'use-context-selector';

import { User, FieldError } from '@src/types/auth';
import { useAuthStore } from '@store/auth';

import { IRegisterUserRequest, registerRequest } from '@services/auth/register-user';
import { ILoginUserRequest } from '@services/auth/login-user';

type AuthContextProps = {
  user: User | null;

  logout(): void;
  login(data: ILoginUserRequest): Promise<{ errors?: FieldError<'login' | 'password'>[] }>;
  register(data: IRegisterUserRequest): Promise<{ errors?: FieldError<'name' | 'email' | 'password'>[] }>;
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider: React.FC = ({ children }) => {
  const { user, setUser, removeUser } = useAuthStore();

  useEffect(() => {
    const logged = localStorage.getItem('@neo:logged');
    const users = JSON.parse(localStorage.getItem('@neo:user') || '[]') as User[];
    const loginUser = users.find(({ id }) => id === logged);

    if (!loginUser) {
      return;
    }

    setUser(loginUser);
  }, [setUser]);

  const login = useCallback(
    async ({ login, password }: ILoginUserRequest): Promise<{ errors?: FieldError<'login' | 'password'>[] }> => {
      const users = JSON.parse(localStorage.getItem('@neo:user') || '[]') as User[];
      const loginUser = users.find(({ email }) => email === login);
      localStorage.setItem('@neo:logged', loginUser?.id || '');

      if (!loginUser) {
        return {
          errors: [
            {
              field: 'login',
              message: 'Could not find a user with that e-mail',
            },
          ],
        };
      }

      setUser(loginUser);

      return {};
    },
    [setUser]
  );

  const register = useCallback(
    async ({ name, email, password, birthDate, cpf }: IRegisterUserRequest): Promise<{ errors?: FieldError<'name' | 'email'>[] }> => {
      const { user, error } = await registerRequest({
        name,
        email,
        password,
        birthDate,
        cpf,
      });

      if (error) {
        return {
          errors: [error],
        };
      }

      if (user) {
        const oldUsers = JSON.parse(localStorage.getItem('user') || '[]') as User[];
        setUser(user);
        localStorage.setItem('@neo:user', JSON.stringify([...oldUsers, user]));
        localStorage.setItem('@neo:logged', user?.id);
      }

      return {};
    },
    [setUser]
  );

  const logout = useCallback(() => {
    localStorage.removeItem('user');
    removeUser();
  }, [removeUser]);

  return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>;
};
