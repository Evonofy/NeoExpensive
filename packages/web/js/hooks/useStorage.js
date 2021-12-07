export const useStorage = (key, state) => {
  if (!state) {
    return localStorage.getItem(key);
  }

  const storagedValue = localStorage.getItem(key);

  if (!storagedValue) {
    localStorage.setItem(key, state);
  }

  localStorage.setItem(key, state);
};
