import { createContext, FC, ReactNode, useEffect, useState } from 'react';

import { usePersistedState } from '@hooks';
import { Paths } from '@appTypes/utils';

import availableThemes from '../../public/themes.json';

type ThemeContextType = {
  themeList: string[];
  currentTheme: string;
  currentThemeIndex: number;
  defaultTheme: string;
  hasNext: boolean;
  localTheme: string;
  configureDefaultTheme: (customTheme: themeKeys) => void;
  setCustomThemeList: (customTheme: themeKeys[]) => void;
  cycle: () => void;
  setTheme: (theme: themeKeys) => void;
};

export const ThemeContext = createContext({} as ThemeContextType);
type themeKeys = Paths<typeof availableThemes>;
type ThemeProviderProps = {
  themes: themeKeys[];
  themeDefault: themeKeys;
  children: ReactNode;
};

export const Theme: FC<ThemeProviderProps> = ({
  themeDefault,
  themes,
  children
}): JSX.Element => {
  const [themeList, setThemeList] = useState<themeKeys[]>(themes);
  const [currentTheme, setCurrentTheme] = useState<themeKeys>('dark');
  const [currentThemeIndex, setCurrentThemeIndex] = useState<number>(0);
  const [defaultTheme, setDefaultTheme] = useState<themeKeys>(themeDefault);
  const [localTheme, setLocalTheme] = usePersistedState<string>('', 'theme');

  const hasNext = currentThemeIndex + 1 < themeList.length;
  useEffect(() => setTheme(defaultTheme), []);

  function setCustomThemeList(newThemeList: themeKeys[]) {
    setThemeList(newThemeList);
  }

  function configureDefaultTheme(customTheme: themeKeys) {
    setDefaultTheme(customTheme);
  }

  function setTheme(theme: themeKeys) {
    setCurrentTheme(theme);

    setLocalTheme(theme);
    document.body.setAttribute('data-theme', theme);
  }

  function cycle() {
    if (hasNext) {
      const next = currentThemeIndex + 1;
      setCurrentThemeIndex(next);
      setTheme(themeList[next]);
    } else {
      const next = 0;
      setCurrentThemeIndex(next);
      setTheme(themeList[next]);
    }
  }

  // useEffect(() => {
  //   window.addEventListener('storage', event => setTheme(event.newValue));
  // }, []);

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        currentThemeIndex,
        defaultTheme,
        hasNext,
        themeList,
        configureDefaultTheme,
        setCustomThemeList,
        cycle,
        setTheme,
        localTheme
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
