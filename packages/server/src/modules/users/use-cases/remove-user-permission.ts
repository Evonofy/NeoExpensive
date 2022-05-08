import { Request, Response } from 'express';

import { prisma } from '../../../infra/prisma';

export async function RemoveUserPermission(request: Request<{ id: string; permissionId: string }>, response: Response): Promise<Response> {
  const { id, permissionId } = request.params;
  try {
    await prisma.user.update({
      where: {
        id,
      },

      data: {
        permissions: {
          disconnect: {
            id: permissionId,
          },
        },
      },
    });

    return response.status(200).send();
  } catch (error) {
    return response.status(400).json({
      error: (error as Error).message,
    });
  }
}
