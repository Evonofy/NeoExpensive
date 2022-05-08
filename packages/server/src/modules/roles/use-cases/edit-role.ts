import { Request, Response } from 'express';

import { RoleNotFound } from '../domain/errors/RoleNotFound';
import { prisma } from '../../../infra/prisma';

export async function EditRoleController(request: Request<{ id: string }, {}, { field: 'name' | 'description'; value: string }>, response: Response): Promise<Response> {
  const { id } = request.params;
  const { field, value } = request.body;

  try {
    const validField = field === 'name' || field === 'description';
    if (!validField) {
      throw new Error('Invalid field value.');
    }

    const role = await prisma.role.findUnique({
      where: {
        id,
      },
    });

    if (!role) {
      throw new RoleNotFound();
    }

    const updatedRole = await prisma.role.update({
      where: {
        id,
      },

      data: {
        [field]: value,
      },
    });

    return response.status(200).json(updatedRole);
  } catch (error) {
    return response.status(400).json({
      error: (error as Error).message,
    });
  }
}
