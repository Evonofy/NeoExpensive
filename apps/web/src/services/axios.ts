import axios from 'axios';

export function getAPIClient() {
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });

  api.interceptors.request.use((config) => {
    return config;
  });

  return api;
}
