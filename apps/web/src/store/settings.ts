import create from 'zustand';
import { Theme } from '../types';

type useSettingsStoreProps = {
  theme: Theme;
  language: string;
  setTheme: (theme: Theme) => void;
  setLanguage: (language: string) => void;
};

export const defaultTheme: Theme = 'dark';
export const defaultLanguage = 'pt-BR';

export const useSettingsStore = create<useSettingsStoreProps>((set) => ({
  theme: defaultTheme,
  language: defaultLanguage,
  setTheme: (theme) => {
    set(() => ({
      theme,
    }));
  },
  setLanguage: (language) => {
    set(() => ({
      language,
    }));
  },
}));
