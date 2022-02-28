import { Request, Response } from 'express';
import crypto from 'crypto';

import { prisma } from '../../../infra/prisma';

export async function CreateRoleController(request: Request<{}, {}, { name: string; description: string }>, response: Response): Promise<Response> {
  const { name, description } = request.body;

  try {
    const roleAlreadyExists = await prisma.role.findFirst({
      where: {
        name,
      },
    });

    if (roleAlreadyExists) {
      throw new Error('A role with this name already exists.');
    }

    const role = await prisma.role.create({
      data: {
        id: crypto.randomUUID(),
        name,
        description,
      },
    });

    return response.status(201).json(role);
  } catch (error) {
    return response.status(400).json({
      error: (error as Error).message,
    });
  }
}
