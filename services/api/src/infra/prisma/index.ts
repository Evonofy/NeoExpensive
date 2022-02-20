import { PrismaClient } from '@prisma/client';

import { isProduction } from '../lib/constants';

export const prisma = new PrismaClient({
  log: isProduction ? ['warn', 'error'] : ['query'],
  errorFormat: 'pretty',
});
