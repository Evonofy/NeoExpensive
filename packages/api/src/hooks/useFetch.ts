import useSWR from 'swr';

import { Mutator } from 'swr/dist/types';

import axios from 'axios';
import { api } from '@services';

import urls from './urls.json';
import { Paths } from '../@types';

export type URLKeys = Paths<typeof urls>;

type Data = any;

type Options = {
  custom?: boolean;
  method?: 'POST' | 'PATCH' | 'DELETE';
};

type Response<T> = {
  // put the data type inside the keys in urls.json
  data: T[];
  error: any;
  mutate: Mutator;
};

export function useFetch<T>(
  url: URLKeys,
  { custom, method }: Options = {}
): Response<T> {
  if (custom) {
    axios.get(url);
  }

  if (method) {
    axios({ method, url });
  }

  const { data, error, mutate } = useSWR<Data, Error>(url, async url => {
    const { data } = await api.get(url);
    return data;
  });

  return {
    data,
    error,
    mutate
  };
}
