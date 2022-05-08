import { Request, Response } from 'express';

import { prisma } from '../../../infra/prisma';

export async function ListSpecificUserRole(request: Request<{ id: string; roleId: string }>, response: Response): Promise<Response> {
  try {
    const { id, roleId } = request.params;

    const user = await prisma.user.findUnique({
      where: {
        id,
      },

      select: {
        roles: {
          where: {
            id: roleId,
          },
        },
      },
    });

    if (!user) {
      throw new Error('Could not find a user with that ID.');
    }

    const [role] = user.roles;

    if (!role) {
      throw new Error('Could not find a role with that ID.');
    }

    return response.status(200).json(role);
  } catch (error) {
    return response.status(400).json({
      error: (error as Error).message,
    });
  }
}
