import React, { useCallback } from 'react';
import { createContext } from 'use-context-selector';

import { User } from '@src/types';
import { useAuthStore } from '@store/auth';

type AuthContextProps = {
  user: User | null;
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider: React.FC = ({ children }) => {
  const user = useAuthStore(useCallback((store) => store.user, []));

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};
