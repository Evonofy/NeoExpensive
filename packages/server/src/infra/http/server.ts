import express, { Express, Router } from 'express';

interface ServerProps {
  port: string;
  app: Express;
  router: Router;
}

export const server = ({ port, app, router }: ServerProps) => {
  app.use(express.json());
  app.use(router);

  app.listen(port, () => console.log(`[server]: running on port ${port}`));
};
