import { useFetch } from './useFetch.js';
import { useCookie } from './useCookie.js';

const clear = () => {
  /* remove all tokens with neoexpensive prefix */
  localStorage.removeItem('neoexpensive.token');
  localStorage.removeItem('neoexpensive.user');

  document.cookie = `neoexpensive.token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
  document.cookie = `neoexpensive.user=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
};

export const useAuth = () => {
  const token = useCookie('neoexpensive.token');
  const user = useCookie('neoexpensive.user');

  if (!token || !user) {
    return null;
  }

  return {
    user: JSON.parse(user),
    token,
    clear,
  };
  // const {} = await useFetch.get("/login", {
  //   headers: {
  //     authorization: `Bearer ${token}`
  //   }
  // });
};
