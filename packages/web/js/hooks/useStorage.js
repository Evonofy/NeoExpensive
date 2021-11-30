export const useStorage = (key, state) => {
  if (!state) {
    const storagedValue = localStorage.getItem(key);

    if (!storagedValue) {
      localStorage.setItem(key, state);
    }

    return storagedValue;
  }

  localStorage.setItem(key, state);
};
