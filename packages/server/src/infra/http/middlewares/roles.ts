import { Request, Response, NextFunction } from 'express';

import { prisma } from '../../prisma';

export function is(roles: string[]) {
  return async (request: Request, response: Response, next: NextFunction) => {
    const { id } = request.user;

    const user = await prisma.user.findUnique({
      where: {
        id,
      },

      select: {
        id: true,

        roles: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!user) {
      throw new Error('Could not find user.');
    }

    const roleExists = user.roles.find(({ name: role }) => roles.includes(role));

    if (!roleExists) {
      return response.status(401).send();
    }

    return next();
  };
}
