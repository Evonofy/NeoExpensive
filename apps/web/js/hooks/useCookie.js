import { useStorage } from './useStorage.js';

export const useCookie = (key, value, { maxAge } = {}) => {
  const isQueryOnly = key && !value && !value;

  if (isQueryOnly) {
    let token = '';

    const cookie = document.cookie[key];
    token = cookie;

    if (!cookie) {
      const storage = localStorage.getItem(key);
      token = storage;
    }

    return token;
  }

  let currentDate = new Date();

  currentDate.setTime(currentDate.getTime() + maxAge * 1000);

  document.cookie = `${key}=${value}; path=/; expires=${currentDate.toUTCString()}; max-age=${maxAge}`;
};
