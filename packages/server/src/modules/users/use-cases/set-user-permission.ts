import { Request, Response } from 'express';

import { prisma } from '../../../infra/prisma';
import { PermissionNotFound } from '../../permissions/domain/errors/PermissionNotFound';

export async function SetUserPermission(request: Request<{ id: string; permissionId: string }>, response: Response): Promise<Response> {
  const { id, permissionId } = request.params;

  try {
    const permission = await prisma.permission.findUnique({
      where: {
        id: permissionId,
      },
    });

    if (!permission) {
      throw new PermissionNotFound();
    }

    await prisma.user.update({
      where: {
        id,
      },

      data: {
        permissions: {
          connect: {
            id: permissionId,
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
