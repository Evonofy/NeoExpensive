import express from 'express';
import cors from 'cors';

import { port } from '../lib/constants';
import { router } from './router';

export const server = () => {
  const app = express();

  app.use(express.json());
  app.use(
    cors({
      origin: process.env.CLIENT_URL,
      credentials: true,
    })
  );
  app.use(router);

  app.listen(port, () => console.log(`[🚀 server]: server listening on port ${port}`));
};
