/* separates the app & express configuration in it's own file */
import { app } from './app/app';

/* separates the router in it's own file */
import { router } from './app/routes';

/* separates the server in it's own file */
import { server } from './app/server';

/* gives the server function the drivers it needs */
server({ app, router, port: process.env.PORT! });
