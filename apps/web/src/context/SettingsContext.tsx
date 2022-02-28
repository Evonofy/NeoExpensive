import { FC, useCallback, useEffect } from 'react';
import { createContext } from 'use-context-selector';
import { parseCookies, setCookie, destroyCookie } from 'nookies';

import { api } from '../services/api';
import { useSettingsStore } from '../store/settings';

type Theme = string;

type setThemeProps = {
  theme: Theme;
};

type setLanguageProps = {
  language: Theme;
};

type SettingsContextProps = {
  theme: Theme;
  language: string;

  installTheme: (data: setThemeProps) => Promise<void>;
  installLanguage: (data: setLanguageProps) => void;
  resetDefault: () => Promise<void>;
};

export const SettingsContext = createContext({} as SettingsContextProps);

export const SettingsProvider: FC = ({ children }) => {
  const language = useSettingsStore(useCallback((state) => state.language, []));
  const theme = useSettingsStore(useCallback((state) => state.theme, []));
  const setTheme = useSettingsStore(useCallback((state) => state.setTheme, []));
  const setLanguage = useSettingsStore(useCallback((state) => state.setLanguage, []));

  useEffect(() => {
    const { '@neo:theme': theme } = parseCookies();

    if (theme) {
      setTheme(theme);
    }
  }, [setTheme]);

  const installTheme = useCallback(
    async ({ theme }: setThemeProps) => {
      setTheme(theme);

      setCookie(undefined, '@neo:theme', theme);

      await api.post('/users/profile/settings/theme', {
        theme,
      });
    },
    [setTheme]
  );

  const installLanguage = useCallback(
    ({ language }: setLanguageProps) => {
      setLanguage(language);
    },
    [setLanguage]
  );

  const resetDefault = useCallback(async () => {
    destroyCookie(undefined, '@neo:theme');
    setTheme('dark');
  }, [setTheme]);

  return <SettingsContext.Provider value={{ theme, language, installTheme, installLanguage, resetDefault }}>{children}</SettingsContext.Provider>;
};
