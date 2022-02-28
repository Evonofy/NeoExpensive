import { FC, useCallback } from 'react';
import { createContext } from 'use-context-selector';

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

  installTheme: (data: setThemeProps) => void;
  installLanguage: (data: setLanguageProps) => void;
};

export const SettingsContext = createContext({} as SettingsContextProps);

export const SettingsProvider: FC = ({ children }) => {
  const language = useSettingsStore(useCallback((state) => state.language, []));
  const theme = useSettingsStore(useCallback((state) => state.theme, []));
  const setTheme = useSettingsStore(useCallback((state) => state.setTheme, []));
  const setLanguage = useSettingsStore(useCallback((state) => state.setLanguage, []));

  const installTheme = useCallback(
    ({ theme }: setThemeProps) => {
      setTheme(theme);
    },
    [setTheme]
  );

  const installLanguage = useCallback(
    ({ language }: setLanguageProps) => {
      setLanguage(language);
    },
    [setLanguage]
  );

  return <SettingsContext.Provider value={{ theme, language, installTheme, installLanguage }}>{children}</SettingsContext.Provider>;
};
