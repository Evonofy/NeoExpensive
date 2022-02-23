import axios from 'axios';
import { NextApiRequest, NextPageContext } from 'next';
import { parseCookies } from 'nookies';

type Context =
  | Pick<NextPageContext, 'req'>
  | {
      req: NextApiRequest;
    }
  | {
      req: any;
    }
  | null
  | undefined;

export function getAPIClient(ctx?: Context) {
  const { '@neo:access': token } = parseCookies(ctx);

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
