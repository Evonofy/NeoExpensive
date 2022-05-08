import { Request, Response } from 'express';

import { prisma } from '../../../infra/prisma';

export async function ListUserPermissions(request: Request<{ id: string }>, response: Response): Promise<Response> {
  try {
    const { id } = request.params;

    const user = await prisma.user.findUnique({
      where: {
        id,
      },

      include: {
        permissions: true,
      },
    });

    if (!user) {
      throw new Error('Could not find a user with that ID.');
    }

    return response.status(200).json(user.permissions);
  } catch (error) {
    return response.status(400).json({
      error: (error as Error).message,
    });
  }
}
