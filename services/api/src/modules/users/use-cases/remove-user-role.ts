import { Request, Response } from 'express';

import { prisma } from '../../../infra/prisma';

export async function RemoveUserRole(request: Request<{ id: string; roleId: string }>, response: Response): Promise<Response> {
  const { id, roleId } = request.params;
  try {
    await prisma.user.update({
      where: {
        id,
      },

      data: {
        roles: {
          disconnect: {
            id: roleId,
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
