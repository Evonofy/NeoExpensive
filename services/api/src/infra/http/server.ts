import express from 'express';
import cors from 'cors';
import cluster from 'cluster';
import os from 'os';

import { port, isProduction } from '../lib/constants';
import { router } from './router';

export const server = () => {
  if (cluster.isMaster || cluster.isPrimary) {
    const numberOfWorkers = isProduction ? os.cpus().length * 2 : 1;

    console.log(`Creating ${numberOfWorkers} new workers.`);

    for (let i = 0; i < numberOfWorkers; i++) {
      cluster.fork();
    }

    cluster.on('online', (worker) => {
      console.log(`[${worker.process.pid}] worker online`);
    });

    cluster.on('exit', (worker) => {
      console.log(`[${worker.process.pid}] worker died`);
      cluster.fork();
    });
  } else {
    const app = express();

    app.use(express.json());
    app.use(
      cors({
        origin: '*',
        credentials: true,
      })
    );
    app.use(router);

    app.listen(port, () => console.log(`[🚀 server-${process.pid}]: server listening on port ${port}`));
  }
};
