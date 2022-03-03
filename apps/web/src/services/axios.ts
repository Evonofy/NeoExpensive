import axios from 'axios';
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

  if (token) {
    // @ts-ignore
    api.defaults.headers['authorization'] = `bearer ${token}`;
  }

  return api;
}
