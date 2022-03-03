import { FC, useReducer, useEffect, useCallback } from 'react';
import { createContext } from 'use-context-selector';

import { dark, light } from '@styles/stitches.config';

const availableThemes = {
  dark,
  light,
};

type AllThemes = keyof typeof availableThemes;

type ThemeContextProps = {
  theme: typeof dark;
  cycle: () => void;
};

export const ThemeContext = createContext({} as ThemeContextProps);

type Action =
  | {
      type: 'cycle';
    }
  | {
      type: 'save';
      theme: AllThemes;
    };

type State = {
  theme: AllThemes;
  html: HTMLElement;
};

const themeReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'save': {
      state.html.classList.remove(availableThemes[state.theme]);
      state.html.classList.add(availableThemes[action.theme]);

      return {
        ...state,
        theme: action.theme,
      };
    }

    default: {
      return state;
    }
  }
};

export const ThemeProvider: FC = ({ children }) => {
  // use Recoil inside here with useReducer
  const isDeviceOnDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const [{ theme }, dispatch] = useReducer(themeReducer, {
    theme: isDeviceOnDarkMode ? 'dark' : 'light',
    html: document.documentElement,
  } as State);

  useEffect(() => {
    // check for a stored theme in local storage
    // if there is not a stored theme, put the default one in there
    // if there is, set it to the state
    if (typeof window !== undefined) {
      const storedTheme = localStorage.getItem('theme') as AllThemes;
      if (!storedTheme) {
        localStorage.setItem('theme', theme);
        dispatch({
          type: 'save',
          theme,
        });
      } else {
        dispatch({
          type: 'save',
          theme: storedTheme,
        });
      }
    }
  }, [theme]);

  const cycle = useCallback(() => {
    console.log('called');
    const keys = Object.keys(availableThemes) as AllThemes[];
    let index = keys.indexOf(theme);
    const max = keys.length - 1;
    if (index === max) {
      index = 0;
    } else {
      index += 1;
    }

    const newTheme = keys[index];
    dispatch({
      type: 'save',
      theme: newTheme,
    });
    localStorage.setItem('theme', newTheme);
  }, [theme]);

  return <ThemeContext.Provider value={{ theme: availableThemes[theme], cycle }}>{children}</ThemeContext.Provider>;
};
