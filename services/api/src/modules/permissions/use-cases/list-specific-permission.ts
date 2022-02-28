import { Request, Response } from 'express';

import { PermissionNotFound } from '../domain/errors/PermissionNotFound';
import { prisma } from '../../../infra/prisma';

export async function ListSpecificPermissionController(request: Request<{ id: string }>, response: Response): Promise<Response> {
  try {
    const { id } = request.params;

    const permission = await prisma.permission.findUnique({
      where: {
        id,
      },
    });

    if (!permission) {
      throw new PermissionNotFound();
    }

    return response.status(200).json(permission);
  } catch (error) {
    return response.status(400).json({
      error: (error as Error).message,
    });
  }
}
