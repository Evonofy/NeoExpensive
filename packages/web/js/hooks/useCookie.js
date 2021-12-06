export const useCookie = (key, value, { maxAge }) => {
  let currentDate = new Date();

  currentDate.setTime(currentDate.getTime() + maxAge * 1000);

  document.cookie = `${key}=${value}; path=/; expires=${currentDate.toUTCString()}; max-age=${maxAge}`;
};
