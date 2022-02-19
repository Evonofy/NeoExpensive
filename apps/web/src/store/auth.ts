import create from 'zustand';
import { User } from '../types';

type useAuthStoreProps = {
  user: User;
  setUser: (user: User) => void;
  removeUser: () => void;
};

export const useAuthStore = create<useAuthStoreProps>((set) => ({
  user: {
    name: '',
    email: '',
    password: '',
  },
  removeUser: () => {
    set(() => ({}));
  },
  setUser: (user) => {
    set(() => ({
      user,
    }));
  },
}));
