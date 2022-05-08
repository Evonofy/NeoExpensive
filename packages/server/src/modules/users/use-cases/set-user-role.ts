import { Request, Response } from 'express';

import { prisma } from '../../../infra/prisma';
import { RoleNotFound } from '../../roles/domain/errors/RoleNotFound';

export async function SetUserRole(request: Request<{ id: string; roleId: string }>, response: Response): Promise<Response> {
  const { id, roleId } = request.params;

  try {
    const role = await prisma.role.findUnique({
      where: {
        id: roleId,
      },
    });

    if (!role) {
      throw new RoleNotFound();
    }

    await prisma.user.update({
      where: {
        id,
      },

      data: {
        roles: {
          connect: {
            id: roleId,
          },
        },
      },
    });

    return response.status(201).send();
  } catch (error) {
    return response.status(400).json({
      error: (error as Error).message,
    });
  }
}
