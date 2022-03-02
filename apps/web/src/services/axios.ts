import axios, { AxiosError } from 'axios';
import { parseCookies } from 'nookies';

type Context = any;

export function getAPIClient(ctx?: Context) {
  const { '@neo:access': token } = parseCookies(ctx);

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });

  api.interceptors.request.use((config) => {
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (err) => {
      const { response } = err as AxiosError;
      const error = response?.data.error as 'jwt expired';

      switch (error) {
        case 'jwt expired':
          console.log('refresh token');
          // refresh token
          break;
      }
    }
  );

  if (token) {
    // @ts-ignore
    api.defaults.headers['authorization'] = `bearer ${token}`;
  }

  return api;
}
