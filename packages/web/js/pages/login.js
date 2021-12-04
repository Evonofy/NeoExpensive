import { useFetch } from '../hooks/useFetch.js';
import { useSelector } from '../hooks/useSelector.js';

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
  const { message, data, error } = await useFetch.post('/user/login', {
    email,
    password,
  });

  console.table({
    message,
    data,
    error,
  });
};
