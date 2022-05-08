import { Request, Response } from 'express';

import { prisma } from '../../../infra/prisma';

export async function DeleteRoleController(request: Request<{ id: string }>, response: Response): Promise<Response> {
  const { id } = request.params;

  try {
    await prisma.role.delete({
      where: {
        id,
      },
    });

    return response.status(200).send();
  } catch (error) {
    return response.status(400).json({
      error: (error as Error).message,
    });
  }
}
