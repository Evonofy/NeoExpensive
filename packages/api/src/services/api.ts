import { config } from 'dotenv';
import { resolve } from 'path';

import axios from 'axios';

const isTest = process.env.NODE_ENV === 'testing';

let path: string = '';

isTest
  ? (path = resolve(__dirname, '..', '..', '.env.test'))
  : (path = resolve(__dirname, '..', '..', '.env'));

config({ path });

const baseURL = process.env.API_URL;

export const api = axios.create({
  baseURL
});
