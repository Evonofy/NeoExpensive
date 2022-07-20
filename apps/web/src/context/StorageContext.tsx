import { FC, useCallback, useEffect, useMemo } from 'react';
import { createContext } from 'use-context-selector';
import { destroyCookie, parseCookies, setCookie } from 'nookies';

import { useStorageStore, Storage, defaultStorage } from '../store/storage';

type Options = {
  maxAge?: number;
};

type StorageContextProps = {
  storage: Storage;
  set<Type extends string>(key: string, value: Type, options?: Options): void;
  get<Type extends string>(key: string): Type | null;
  getAll(): Record<string, string> | {};
  remove: (key: string) => void;
  changeToCookies: () => void;
  changeToLocalStorage: () => void;
};

export const StorageContext = createContext({} as StorageContextProps);

export const StorageProvider: FC = ({ children }) => {
  const storageKey = useMemo(() => '@neo:storage', []);
  const storage = useStorageStore(useCallback((store) => store.storage, []));
  const setStorage = useStorageStore((store) => store.setStorage);

  useEffect(() => {
    const cookies = parseCookies();
    const option = cookies[storageKey] as Storage;

    if (!option) {
      switch (defaultStorage) {
        case 'cookies': {
          setCookie(undefined, storageKey, defaultStorage, {
            sameSite: 'strict',
            secure: true,
          });
          break;
        }
        case 'localStorage': {
          localStorage.setItem(storageKey, defaultStorage);
          break;
        }
      }
      setStorage(defaultStorage);
    }

    setStorage(option);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const set = useCallback(
    <Type extends string>(key: string, value: Type, options?: Options) => {
      switch (storage) {
        case 'cookies':
          setCookie(undefined, key, value, {
            sameSite: 'strict',
            secure: true,
            path: '/',
            ...options,
          });
          break;

        case 'localStorage':
          localStorage.setItem(key, value);
          break;

        default:
          setCookie(undefined, key, value, {
            sameSite: 'strict',
            secure: true,
            path: '/',
            ...options,
          });
          break;
      }
    },
    [storage]
  );

  const get = useCallback(
    <Type extends string>(key: string): Type | null => {
      switch (storage) {
        case 'cookies':
          const cookies = parseCookies();
          return (cookies[key] || null) as Type | null;
        case 'localStorage':
          return localStorage.getItem(key) as Type | null;
        default:
          return localStorage.getItem(key) as Type | null;
      }
    },
    [storage]
  );

  const remove = useCallback(
    (key: string) => {
      switch (storage) {
        case 'cookies':
          destroyCookie(undefined, key);
          break;
        case 'localStorage':
          localStorage.removeItem(key);
          break;
        default:
          localStorage.removeItem(key);
          break;
      }
    },
    [storage]
  );

  const getAll = useCallback(() => {
    switch (storage) {
      case 'cookies': {
        return parseCookies() || {};
      }
      case 'localStorage': {
        return localStorage || {};
      }
      default: {
        return localStorage || {};
      }
    }
  }, [storage]);

  const changeToCookies = useCallback(() => {
    setStorage('cookies');
    set<Storage>(storageKey, 'cookies');
    // move everything to cookies
    // store the old maxAge in localStorage too
    const localStorageArray = Object.entries(localStorage);

    localStorageArray.forEach(([key, value]) => {
      setCookie(undefined, key, value);
    });

    localStorageArray.forEach(([key]) => {
      localStorage.removeItem(key);
    });
  }, [set, setStorage, storageKey]);

  const changeToLocalStorage = useCallback(() => {
    setStorage('localStorage');
    set<Storage>(storageKey, 'localStorage');

    const cookies = parseCookies();
    const cookiesArray = Object.entries(cookies) as Array<string[]>;

    // move everything to localStorage
    cookiesArray.forEach(([key, value]) => {
      localStorage.setItem(key!, value!);
    });

    // delete the cookies
    cookiesArray.forEach(([key]) => {
      destroyCookie(undefined, key!);
    });
  }, [set, setStorage, storageKey]);

  return (
    <StorageContext.Provider value={{ storage, get, set, remove, getAll, changeToCookies, changeToLocalStorage }}>
      {children}
    </StorageContext.Provider>
  );
};
