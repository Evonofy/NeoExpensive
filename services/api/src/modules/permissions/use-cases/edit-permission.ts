import { Request, Response } from 'express';

import { PermissionNotFound } from '../domain/errors/PermissionNotFound';
import { prisma } from '../../../infra/prisma';

export async function EditPermissionController(request: Request<{ id: string }, {}, { field: 'name' | 'description'; value: string }>, response: Response): Promise<Response> {
  const { id } = request.params;
  const { field, value } = request.body;

  try {
    const validField = field === 'name' || field === 'description';

    if (!validField) {
      throw new Error('Invalid field value.');
    }

    const permission = await prisma.permission.findUnique({
      where: {
        id,
      },
    });

    if (!permission) {
      throw new PermissionNotFound();
    }

    const updatedPermission = await prisma.permission.update({
      where: {
        id,
      },

      data: {
        [field]: value,
      },
    });

    return response.status(200).json(updatedPermission);
  } catch (error) {
    return response.status(400).json({
      error: (error as Error).message,
    });
  }
}
