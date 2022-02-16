import { redirect } from '../functions/redirect.js';
import { useCookie } from '../hooks/useCookie.js';
import { useFetch } from '../hooks/useFetch.js';
import { useSelector } from '../hooks/useSelector.js';
import { useStorage } from '../hooks/useStorage.js';

const form = useSelector('.login--form');

const emailInput = useSelector('.login--form--input[type="email"]');
const passwordInput = useSelector('.login--form--input[type="password"]');

const useInputValue = (input) => {
  return input.value;
};

const isEmailValid = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

form.onsubmit = async (event) => {
  event.preventDefault();

  const email = useInputValue(emailInput);
  const password = useInputValue(passwordInput);

  const emailIsValid = isEmailValid(email);

  if (!emailIsValid) {
    /**
     * ! show error in input
     */
  }
  console.log(email);
  console.log(password);
  /* make fetch request */
  // const { message, data, error } = await useFetch.
  const { message, data, error } = await useFetch.post('/login', {
    login: email,
    password,
  });

  const { refreshToken, user } = data;

  /* get the refresh token route */
  const {
    data: { accessToken },
  } = await useFetch.post('/user/token/refresh', {
    refresh_token: refreshToken.id,
  });

  /*
    TODO: only save information if user opted for it
  */

  useStorage('neoexpensive.token', accessToken);
  useCookie('neoexpensive.token', accessToken, {
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  useStorage('neoexpensive.user', JSON.stringify(user));
  useCookie('neoexpensive.user', JSON.stringify(user), {
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  /* redirect to homepage when logged in */
  redirect('/');
};
