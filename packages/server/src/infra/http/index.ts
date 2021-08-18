/* separates the app & express configuration in it's own file */
import { app } from './app';

/* separates the router in it's own file */
import { router } from './routes';

/* separates the server in it's own file */
import { server } from './server';

/* gives the server function the drivers it needs */
server({ app, router, port: process.env.PORT! });
