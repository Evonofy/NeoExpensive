import { FC, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { createContext, useContext } from 'use-context-selector';
import { AxiosError } from 'axios';

import { StorageContext } from './StorageContext';
import { api } from '../services/api';
import { useSettingsStore, defaultLanguage, defaultTheme } from '../store/settings';

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
  const storage = useContext(StorageContext);

  const language = useSettingsStore(useCallback((state) => state.language, []));
  const theme = useSettingsStore(useCallback((state) => state.theme, []));
  const setTheme = useSettingsStore(useCallback((state) => state.setTheme, []));
  const setLanguage = useSettingsStore(useCallback((state) => state.setLanguage, []));

  const { push, asPath } = useRouter();

  const installTheme = useCallback(
    async ({ theme }: setThemeProps) => {
      setTheme(theme);

      storage.set('@neo:theme', theme);

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
    [asPath, push, setTheme, storage]
  );

  const installLanguage = useCallback(
    async ({ language }: setLanguageProps) => {
      setLanguage(language);

      storage.set('@neo:theme', theme);

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
    [asPath, push, setLanguage, storage, theme]
  );

  // load config from api
  useEffect(() => {
    async function fetchUserSettings() {
      try {
        const token = storage.get('@neo:access');

        if (token) {
          // @ts-ignore
          api.defaults.headers['authorization'] = `bearer ${token}`;

          const { data } = await api.get<{ theme: string; language: string }>('/users/profile/settings');

          const { language, theme } = data;

          installLanguage({ language });
          installTheme({ theme });
        }
      } catch (error) {
        const { response } = error as AxiosError;
        console.log(response?.data);
        const theme = storage.get('@neo:theme');
        const language = storage.get('@neo:language');

        setTheme(theme || defaultTheme);
        setLanguage(language || defaultLanguage);
      }
    }

    fetchUserSettings();
  }, [installLanguage, installTheme, setLanguage, setTheme, storage]);

  const resetDefault = useCallback(async () => {
    storage.set('@neo:theme', defaultTheme);
    storage.set('@neo:language', defaultLanguage);

    installLanguage({
      language: defaultLanguage,
    });
    installTheme({
      theme: defaultTheme,
    });
  }, [installLanguage, installTheme, storage]);

  return <SettingsContext.Provider value={{ theme, language, installTheme, installLanguage, resetDefault }}>{children}</SettingsContext.Provider>;
};
