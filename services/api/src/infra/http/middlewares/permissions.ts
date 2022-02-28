import { Request, Response, NextFunction } from 'express';

import { prisma } from '../../prisma';

export function can(permissions: string[]) {
  return async (request: Request, response: Response, next: NextFunction) => {
    const { id } = request.user;

    const user = await prisma.user.findUnique({
      where: {
        id,
      },

      select: {
        id: true,

        permissions: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!user) {
      throw new Error('Could not find user.');
    }

    const permissionExists = user.permissions.find(({ name: permission }) => permissions.includes(permission));

    if (!permissionExists) {
      return response.status(401).json({
        error: `Your account doesn't one of the following permissions: ${permissions.join(', ')}`,
      });
    }

    return next();
  };
}
