import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export let api: AxiosInstance;

export const configure = ({ baseURL }: AxiosRequestConfig = {}) => {
  api = axios.create({
    baseURL
  });

  return api;
};
