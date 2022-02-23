import axios from 'axios';

export function getAPIClient() {
  const token = typeof window !== 'undefined' ? localStorage.getItem('@neo:access') : undefined;

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });

  api.interceptors.request.use((config) => {
    return config;
  });

  if (token) {
    (api.defaults.headers as any)['authorization'] = `bearer ${token}`;
  }

  return api;
}
