import create from 'zustand';

import { User } from '@src/types';

type useAuthStoreProps = {
  user: User | null;
};

export const useAuthStore = create<useAuthStoreProps>((set) => ({
  user: null,
}));
