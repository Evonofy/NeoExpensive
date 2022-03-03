import create from 'zustand';

import { User } from '@src/types/auth';

type useAuthStoreProps = {
  user: User | null;

  setUser(user: User): void;
};

export const useAuthStore = create<useAuthStoreProps>((set) => ({
  user: null,
  setUser(user) {
    set(() => ({
      user,
    }));
  },
}));
