import create from 'zustand';
import { Theme } from '../types';

type useSettingsStoreProps = {
  theme: Theme;
  language: string;
  setTheme: (theme: Theme) => void;
  setLanguage: (language: string) => void;
};

export const useSettingsStore = create<useSettingsStoreProps>((set) => ({
  theme: 'dark',
  language: 'pt-BR',
  setTheme: (theme) => {
    set(() => ({
      theme,
    }));
  },
  setLanguage: (theme) => {
    set(() => ({
      theme,
    }));
  },
}));
