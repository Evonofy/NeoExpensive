import { Request, Response } from 'express';

import { prisma } from '../../../infra/prisma';

export async function ListSpecificRoleController(request: Request<{ id: string }>, response: Response): Promise<Response> {
  try {
    const { id } = request.params;

    const role = await prisma.role.findUnique({
      where: {
        id,
      },
    });

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
