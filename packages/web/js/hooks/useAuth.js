import { useFetch } from '../hooks/useFetch.js';
import { useCookie } from '../hooks/useCookie.js';

const clear = () => {
  /* remove all tokens with neoexpensive prefix */
  localStorage.removeItem('neoexpensive.token');
  localStorage.removeItem('neoexpensive.user');

  document.cookie = '';
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
