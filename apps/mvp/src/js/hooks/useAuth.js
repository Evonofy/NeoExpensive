import { useFetch } from './useFetch.js';
import { useCookie } from './useCookie.js';

const clear = () => {
  /* remove all tokens with NeoExpertise prefix */
  localStorage.removeItem('NeoExpertise.token');
  localStorage.removeItem('NeoExpertise.user');

  document.cookie = `NeoExpertise.token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
  document.cookie = `NeoExpertise.user=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
};

export const useAuth = () => {
  const token = useCookie('NeoExpertise.token');
  const user = useCookie('NeoExpertise.user');

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
