import create from 'zustand';
import { User } from '../types';

type useAuthStoreProps = {
  user: User | null;
  setUser: (user: User) => void;
  removeUser: () => void;
};

export const useAuthStore = create<useAuthStoreProps>((set) => ({
  user: null,
  removeUser: () => {
    set(() => ({
      user: null,
    }));
  },
  setUser: (user) => {
    set(() => ({
      user,
    }));
  },
}));
