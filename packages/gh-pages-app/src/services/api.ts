import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.BACKEND_API_URL
});
