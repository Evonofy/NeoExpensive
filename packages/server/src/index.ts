import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(__dirname, '..', '.env')
});

/* importing an instance of the express app */
import '@infra/http';
