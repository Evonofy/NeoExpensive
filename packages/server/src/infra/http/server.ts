import { Express, Router } from 'express';

import { ErrorMiddleware } from './middlewares/error';

interface ServerProps {
  port: string;
  app: Express;
  router: Router;
}

export const server = ({ port, app, router }: ServerProps) => {
  app.use(router);
  app.use(ErrorMiddleware);

  app.listen(port, () => console.log(`[server]: running on port ${port}`));
};
