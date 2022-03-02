import { FC, useCallback, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { createContext } from 'use-context-selector';
import { setCookie, destroyCookie, parseCookies } from 'nookies';

import { api } from '../services/api';
import { useSettingsStore } from '../store/settings';
import { AxiosError } from 'axios';

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

  const defaultValues = useMemo(
    () => ({
      theme: 'dark',
      language: 'pt-BR',
    }),
    []
  );

  const { push, asPath } = useRouter();

  const installTheme = useCallback(
    async ({ theme }: setThemeProps) => {
      setTheme(theme);

      setCookie(undefined, '@neo:theme', theme);

      try {
        await api.post('/users/profile/settings/theme', {
          theme,
        });
      } catch (error) {
        const { response } = error as AxiosError;
        if (response?.data.error === 'Please supply an access token.') {
          push(`/login?redirect_to=${asPath}`);
        }
      }
    },
    [asPath, push, setTheme]
  );

  const installLanguage = useCallback(
    async ({ language }: setLanguageProps) => {
      setLanguage(language);

      setCookie(undefined, '@neo:theme', language);

      try {
        await api.post('/users/profile/settings/language', {
          language,
        });
      } catch (error) {
        const { response } = error as AxiosError;
        if (response?.data.error === 'Please supply an access token.') {
          push(`/login?redirect_to=${asPath}`);
        }
      }
    },
    [asPath, push, setLanguage]
  );

  // load config from api
  useEffect(() => {
    async function fetchUserSettings() {
      try {
        const { data } = await api.get<{ theme: string; language: string }>('/users/profile/settings');

        const { language, theme } = data;

        installLanguage({ language });
        installTheme({ theme });
      } catch (error) {
        const { response } = error as AxiosError;
        console.log(response?.data);
        const { '@neo:theme': theme, '@neo:language': language } = parseCookies();

        const { language: defaultLanguage, theme: defaultTheme } = defaultValues;

        setTheme(theme || defaultTheme);
        setLanguage(language || defaultLanguage);
      }
    }

    fetchUserSettings();
  }, [defaultValues, installLanguage, installTheme, setLanguage, setTheme]);

  const resetDefault = useCallback(async () => {
    destroyCookie(undefined, '@neo:theme');
    destroyCookie(undefined, '@neo:language');

    const { language: defaultLanguage, theme: defaultTheme } = defaultValues;
    installLanguage({
      language: defaultLanguage,
    });
    installTheme({
      theme: defaultTheme,
    });
  }, [defaultValues, installLanguage, installTheme]);

  return <SettingsContext.Provider value={{ theme, language, installTheme, installLanguage, resetDefault }}>{children}</SettingsContext.Provider>;
};
