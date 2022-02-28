import { Request, Response } from 'express';

import { prisma } from '../../../infra/prisma';

export async function ListSpecificUserPermission(request: Request<{ id: string; roleId: string }>, response: Response): Promise<Response> {
  try {
    const { id, roleId } = request.params;

    const user = await prisma.user.findUnique({
      where: {
        id,
      },

      select: {
        permissions: {
          where: {
            id: roleId,
          },
        },
      },
    });

    if (!user) {
      throw new Error('Could not find a user with that ID.');
    }

    const [permission] = user.permissions;

    if (!permission) {
      throw new Error('Could not find a permission with that ID.');
    }

    return response.status(200).json(permission);
  } catch (error) {
    return response.status(400).json({
      error: (error as Error).message,
    });
  }
}
